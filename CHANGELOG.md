# Changelog

All notable changes to the "Znuny (DK4Znuny-VisualStudioCode)" extension will be documented in this file.

## [1.0.3]

- ⭐ StatusBar
  - The status bar gets an additional **Znuny** item and the entire status bar is displayed in the Znuny color ![#ff9b00](https://placehold.co/15x15/ff9b00/ff9b00.png) if the active file is a "Znuny file".
    - If the active file belongs to a **Znuny framework** ("Znuny file") in the workspace, the **product name** and **version** are displayed from the RELEASE file.
    - If the active file belongs to a **Znuny package** ("Znuny file") in the workspace, the **vendor** and the largest **framework version** are displayed from the SOPM file.
- Snippets
  - Fixed - Broken snippet - Functions/TicketObject/znuny.TicketObject.TicketSearch.code-snippets [#2](https://github.com/dennykorsukewitz/DK4Znuny-VisualStudioCode/issues/2)
  - Added missing DiffObject snippet for 6.0
  - Tidied Snippets

## [1.0.2]

- Snippets
  - Escaped '\$' to use scalarref (scalar reference)
  - Escaped '\@' to use arrayref (array reference)
  - Escaped '\%' to use hashref (hash reference)
  - Escaped '\&' to use coderef (code reference)
  - Escaped '\*' to use globref (glob reference)
  - Applied new escaped strings to snippets

## [1.0.1]

- Snippets
  - Fixed syntax typos
  - Tidied snippet filenames for better readability
  - Added DynamicFields
    - ⭐ WebserviceText
    - ⭐ WebserviceMultiselect
    - ⭐ WebserviceDropdown
  - Added SeleniumObject
    - ⭐ VerifiedClick
    - ⭐ VerifiedSubmit

## [1.0.0]

- Initial release of Znuny Snippets extension
  - CodePolicy
  - ConfigXML
  - Customizing
  - Debugging
  - DynamicFields
  - Functions
  - GitLab
  - Language
  - Licensing
  - Modules
  - Needed
  - ObjectManager
  - Perl
  - POD
  - Selenium
  - VariableCheck
