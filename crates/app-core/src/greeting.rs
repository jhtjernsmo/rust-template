use crate::{Error, Result};

/// Longest name we accept. Input from the UI is untrusted, so check it here.
const MAX_NAME_LEN: usize = 60;

/// The example command shown in the wiki: takes a name, returns a greeting.
pub fn greet(name: &str) -> Result<String> {
    let name = name.trim();
    if name.is_empty() {
        return Err(Error::Invalid("Type a name first.".into()));
    }
    if name.chars().count() > MAX_NAME_LEN {
        return Err(Error::Invalid(format!(
            "Keep the name under {MAX_NAME_LEN} characters."
        )));
    }
    Ok(format!("Hello, {name}! This text came from Rust."))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greets_a_trimmed_name() {
        assert_eq!(
            greet("  Ada ").unwrap(),
            "Hello, Ada! This text came from Rust."
        );
    }

    #[test]
    fn rejects_empty_and_too_long_names() {
        assert!(greet("   ").is_err());
        assert!(greet(&"x".repeat(MAX_NAME_LEN + 1)).is_err());
    }
}
