# Storing data

## Where files go

Each user has a data folder for your app, picked by Tauri from the **identifier** in `tauri.conf.json`:

| OS | Folder |
| --- | --- |
| Linux | `~/.local/share/<identifier>` |
| Windows | `%APPDATA%\<identifier>` |
| macOS | `~/Library/Application Support/<identifier>` |

Get it in Rust with `app.path().app_data_dir()`. Yours is:

```demo
app-info
```

## The example: a JSON settings file

`crates/app-core/src/settings.rs` stores a small `Settings` struct as JSON. It writes to a temporary file and renames it, so a crash never leaves a half-written file. This wiki uses it to remember the last open page.

Add a field by adding it to the struct. `#[serde(default)]` means old files without the field still load:

```rust
pub struct Settings {
    pub name: String,
    pub last_page: String,
    pub theme: String, // new: old files get the default
}
```

## Growing up: SQLite

When you have lists of things (notes, tasks, contacts), use SQLite. Add [`rusqlite`](https://docs.rs/rusqlite) to `app-core`:

```toml
rusqlite = { version = "0.40", features = ["bundled"] }
```

`bundled` compiles SQLite into your app, so users need nothing installed. A minimal store:

```rust
pub struct Store { conn: rusqlite::Connection }

impl Store {
    pub fn open(path: &Path) -> rusqlite::Result<Self> {
        let conn = rusqlite::Connection::open(path)?;
        conn.pragma_update(None, "journal_mode", "WAL")?;
        conn.execute_batch("CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL
        )")?;
        Ok(Self { conn })
    }
}
```

Keep the `Store` in `AppState` behind a `Mutex`. For schema changes, track a version with `PRAGMA user_version` and run each migration once.

## Secrets

Never put API keys or passwords in a settings file. Use the OS keychain with the [`keyring`](https://docs.rs/keyring) crate, and keep keys for your own servers out of the app entirely.
