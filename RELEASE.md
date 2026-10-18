# [2.1.0]

## Added

- Perl snippets for `Kernel::System::Util::ApplicationUserGet` and `Kernel::System::Util::XSSSanitizeValue`.

## Changed

- Regenerated POD snippets from Znuny `dev`: `Calendar::GetTextColor`, `Package` (`PackageBuild`, `PackageInstall`, `PackageUpgrade`, `RepositoryAdd`), `Ticket::TicketSearch`, `Util::Base64DeepEncode`, and `WebUploadCache::FormIDRemove`.
- Snippet generator seeds object name and object manager from the package before POD parse, so modules that omit `new()` in POD (for example `Kernel::System::MSGraph`) still yield function snippets.
- Snippet workflow uses Debian 12, tracks the Znuny `dev` branch only, and opens a pull request after generation.
- TypeScript stays on 6.0.x (`~6.0.3`). Dependabot ignores TypeScript major updates until `typescript-eslint` accepts TypeScript 7.
- Marketplace badges in the readme use [vsmarketplacebadges.dev](https://vsmarketplacebadges.dev). Shields.io retired the Visual Studio Marketplace badges.

## Dependencies

- Bump @eslint/js from 9.39.4 to 10.0.1 (#41)
- Bump @types/node from 22.19.17 through 25.9.4 to 26.0.1 (#42, #45)
- Bump @vscode/test-electron from 2.5.2 to 3.0.0 (#46)
- Bump @vscode/test-web from 0.0.62 to 0.0.81 (#40, #47)
- Bump esbuild from 0.25.12 to 0.28.0 (#38)
- Bump eslint-plugin-n from 17.24.0 to 18.0.1 (#43)
- Bump mocha from 11.8.0 to 12.0.2 (#55)
- Bump TypeScript from 5.9.3 to 6.0.3 and pin `~6.0.3` (#39)
- Bump actions/checkout from 4 to 6 to 7 (#37, #44)
- Bump schneegans/dynamic-badges-action from 1.8.0 to 1.9.0 (#48)
- Bump peter-evans/create-pull-request from 7 to 8 (#52)
