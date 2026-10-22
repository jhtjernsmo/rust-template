# Commands: calling Rust from the UI

A **command** is a Rust function the UI can call. The example below is wired end to end. Type a name and press the button:

```demo
greet
```

## The four steps

**1. Write the logic in `app-core`** (`crates/app-core/src/greeting.rs`):

```rust
pub fn greet(name: &str) -> Result<String> {
    let name = name.trim();
    if name.is_empty() {
        return Err(Error::Invalid("Type a name first.".into()));
    }
    Ok(format!("Hello, {name}! This text came from Rust."))
}
```

**2. Expose it as a command** (`src-tauri/src/commands.rs`):

```rust
#[tauri::command]
pub fn greet(name: String) -> CmdResult<String> {
    app_core::greet(&name).map_err(msg)
}
```

**3. Register it** in `src-tauri/src/lib.rs`:

```rust
.invoke_handler(tauri::generate_handler![
    commands::greet,
    // ...
])
```

**4. Call it from TypeScript** through `ui/src/api.ts`:

```ts
export const greet = (name: string) => call<string>('greet', { name })
```

```tsx
const text = await api.greet('Ada')
```

## Rules of thumb

- **Arguments** are matched by name. Rust's `snake_case` becomes `camelCase` in JavaScript: `fn save(file_path: String)` is called with `{ filePath }`.
- **Return types** must implement `serde::Serialize`; arguments must implement `Deserialize`. Add `#[serde(rename_all = "camelCase")]` to structs so fields look natural in TypeScript.
- **Errors**: return `Result<T, String>` (or a serializable error type). The promise rejects with that value, and `api.ts` turns it into a normal `Error`.
- **Validate input in Rust.** The UI is not a security boundary; check lengths, paths and ranges in `app-core`.
- **Slow work**: make the command `async` so it runs off the main thread, or use `tauri::async_runtime::spawn_blocking` for CPU-heavy code. The window stays responsive.
- **Shared state**: put it in `AppState` (see `lib.rs`) and take `state: State<AppState>` as an argument.

## Events: Rust talking first

Commands are request/response. When Rust needs to push something (progress, a file changed), emit an event:

```rust
use tauri::Emitter;
app.emit("progress", 42)?;
```

```ts
import { listen } from '@tauri-apps/api/event'
const stop = await listen<number>('progress', (e) => setProgress(e.payload))
```
