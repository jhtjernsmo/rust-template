//! Everything the app *does* lives here, without any Tauri types.
//! The Tauri crate (`src-tauri`) only turns these functions into commands
//! the UI can call. Keeping the split makes the logic easy to unit test and
//! lets you add a CLI or a server later without touching the UI.

mod greeting;
mod settings;

pub use greeting::greet;
pub use settings::{Settings, SettingsStore};

/// Errors the app can return to the UI. Each variant becomes a readable
/// message on the frontend, so keep them short and user-facing.
#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("{0}")]
    Invalid(String),
    #[error("could not read or write {path}: {source}")]
    Io {
        path: String,
        #[source]
        source: std::io::Error,
    },
    #[error("settings file is damaged: {0}")]
    Corrupt(#[from] serde_json::Error),
}

pub type Result<T> = std::result::Result<T, Error>;
