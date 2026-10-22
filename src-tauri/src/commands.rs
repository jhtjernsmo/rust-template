//! Commands the UI calls with `invoke("name", { args })` (see ui/src/api.ts).
//! Keep them thin: check input, call into `app-core`, turn errors into strings.

use app_core::Settings;
use serde::Serialize;
use tauri::{AppHandle, State};

use crate::AppState;

/// Errors cross to the UI as plain strings, which `api.ts` shows to the user.
type CmdResult<T> = Result<T, String>;

fn msg(e: impl std::fmt::Display) -> String {
    e.to_string()
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AppInfo {
    name: String,
    version: String,
    data_dir: String,
}

/// Name and version come from tauri.conf.json, so the UI never hardcodes them.
#[tauri::command]
pub fn app_info(app: AppHandle) -> AppInfo {
    use tauri::Manager;
    let info = app.package_info();
    AppInfo {
        name: info.name.clone(),
        version: info.version.to_string(),
        data_dir: app
            .path()
            .app_data_dir()
            .map(|p| p.display().to_string())
            .unwrap_or_default(),
    }
}

#[tauri::command]
pub fn greet(name: String) -> CmdResult<String> {
    app_core::greet(&name).map_err(msg)
}

#[tauri::command]
pub fn get_settings(state: State<AppState>) -> CmdResult<Settings> {
    state.settings.lock().map_err(msg)?.load().map_err(msg)
}

#[tauri::command]
pub fn save_settings(state: State<AppState>, settings: Settings) -> CmdResult<()> {
    state
        .settings
        .lock()
        .map_err(msg)?
        .save(&settings)
        .map_err(msg)
}
