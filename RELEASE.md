# Release

## [1.5.0]

### Added

- When the FileList is created, images (.png, .jpg, .svg, .gif, .ico) are now also added to SOPM FileList.
- Sort file list by ascending order before generating. Also add *.pl files.
- Yml and YAML files are now also added to SOPM FileList.

### Changed

- Fixed linting errors.
- Tidied Code.
- Run only or newest.

### Dependencies

- Bump schneegans/dynamic-badges-action from 1.6.0 to 1.7.0 (#8)
- Bump actions/checkout from 2 to 4 (#9)
- Bump actions/setup-node from 1 to 4 (#10)
- Bump mocha from 10.8.2 to 11.0.1 (#11)
- Bump ESLint from 8.57.1 to 9.17.0 (#16)
- Bump glob from 8.1.0 to 11.0.0 (#12)
- Bump TypeScript from 4.9.5 to 5.7.2 (#15)
- Bump @types/node from 16.18.123 to 22.10.3 (#17)
- Bump xpath from 0.0.32 to 0.0.34 (#19)
- Bump node-fetch from 2.7.0 to 3.3.2 (#18)
- Bump @types/node from 16.18.123 to 22.10.3 (#17)

### Fixed

- Updated Snippets.
- Fixed wrong snippet filename -> Change to _old.
- Fixed wrong snippet filename -> Change back.
- UnitTests should still have permission 660 even if they are located under scripts/.
- Ensure trailing slash is added to recursive workspace.
- Removed obsolete trailing space from generated @ObjectDependencies array.
