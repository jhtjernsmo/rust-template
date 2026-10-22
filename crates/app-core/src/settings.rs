//! A tiny JSON settings file in the app's data folder. It shows the pattern
//! for storing data; swap it for SQLite (see the wiki page "Storing data")
//! once you have more than a handful of values.

use std::fs;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};

use crate::{Error, Result};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(default, rename_all = "camelCase")]
pub struct Settings {
    /// Shown in the wiki's "Try it" box, remembered between launches.
    pub name: String,
    /// The wiki page that was open last time.
    pub last_page: String,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            name: String::new(),
            last_page: "welcome".into(),
        }
    }
}

pub struct SettingsStore {
    path: PathBuf,
}

impl SettingsStore {
    pub fn new(dir: &Path) -> Self {
        Self {
            path: dir.join("settings.json"),
        }
    }

    /// Missing file means first launch: return the defaults.
    pub fn load(&self) -> Result<Settings> {
        match fs::read_to_string(&self.path) {
            Ok(text) => Ok(serde_json::from_str(&text)?),
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(Settings::default()),
            Err(e) => Err(self.io(e)),
        }
    }

    /// Writes to a temp file first so a crash never leaves half a file behind.
    pub fn save(&self, settings: &Settings) -> Result<()> {
        if let Some(dir) = self.path.parent() {
            fs::create_dir_all(dir).map_err(|e| self.io(e))?;
        }
        let tmp = self.path.with_extension("json.tmp");
        fs::write(&tmp, serde_json::to_vec_pretty(settings)?).map_err(|e| self.io(e))?;
        fs::rename(&tmp, &self.path).map_err(|e| self.io(e))
    }

    fn io(&self, source: std::io::Error) -> Error {
        Error::Io {
            path: self.path.display().to_string(),
            source,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn first_launch_returns_defaults() {
        let dir = tempfile::tempdir().unwrap();
        assert_eq!(
            SettingsStore::new(dir.path()).load().unwrap(),
            Settings::default()
        );
    }

    #[test]
    fn saved_settings_come_back() {
        let dir = tempfile::tempdir().unwrap();
        let store = SettingsStore::new(&dir.path().join("nested"));
        let settings = Settings {
            name: "Ada".into(),
            last_page: "commands".into(),
        };
        store.save(&settings).unwrap();
        assert_eq!(store.load().unwrap(), settings);
    }

    #[test]
    fn a_damaged_file_is_an_error_not_a_reset() {
        let dir = tempfile::tempdir().unwrap();
        fs::write(dir.path().join("settings.json"), "{ not json").unwrap();
        assert!(matches!(
            SettingsStore::new(dir.path()).load(),
            Err(Error::Corrupt(_))
        ));
    }
}
