# Changelog

All notable changes to the design tokens will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial token structure

## [1.0.0] - 2026-01-11

### Added
- Initial release of design tokens
- Color tokens (Background, Text, Border, Icon)
- Typography tokens (Title, Heading, Body, Code)
- Support for multiple themes (Dark mode)
- Export formats: CSS, SCSS, LESS, JSON, JS, iOS, Android, Flutter

### Token Categories
- **Colors**: Background, Text, Border, Icon with variants (Default, Neutral, Brand, Positive, Warning, Danger, Disabled)
- **Typography**: Title Hero, Title Page, Subtitle, Heading, Subheading, Body, Code
- **Spacing**: (To be added)
- **Borders**: (To be added)
- **Shadows**: (To be added)

---

## How to Update This File

When updating tokens, add an entry following this template:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New tokens or features

### Changed
- Modified existing tokens

### Deprecated
- Tokens that will be removed in future versions

### Removed
- Tokens that were removed

### Fixed
- Bug fixes or corrections
```

### Version Guidelines

- **MAJOR** (X.0.0): Breaking changes, restructuring
- **MINOR** (0.X.0): New tokens, backwards compatible
- **PATCH** (0.0.X): Bug fixes, small adjustments
