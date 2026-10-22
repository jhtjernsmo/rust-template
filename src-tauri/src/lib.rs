//! Tauri shell: opens the window and exposes `app-core` to the UI as commands.

mod commands;
mod window_fit;

use std::sync::Mutex;

use app_core::SettingsStore;
use tauri::Manager;

/// State shared by all commands. Add your own fields here (a database
/// connection, an HTTP client, ...) and read them with `State<AppState>`.
pub struct AppState {
    pub settings: Mutex<SettingsStore>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // Per-user data folder, e.g. ~/.local/share/<identifier> on Linux.
            let dir = app.path().app_data_dir()?;
            app.manage(AppState {
                settings: Mutex::new(SettingsStore::new(&dir)),
            });
            window_fit::fit_main_window(app);
            Ok(())
        })
        // Every command the UI may call must be listed here.
        .invoke_handler(tauri::generate_handler![
            commands::app_info,
            commands::greet,
            commands::get_settings,
            commands::save_settings,
        ])
        .run(tauri::generate_context!())
        .expect("error while running the app");
}
