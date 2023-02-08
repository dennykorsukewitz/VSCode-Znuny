# Znuny (DK4Znuny-VisualStudioCode)

Znuny (DK4Znuny-VisualStudioCode) is an extension that helps you to make Znuny development less painful.

| Repository | GitHub | Visual Studio Marketplace |
| ------ | ------ | ------ |
| ![GitHub release (latest by date)](https://img.shields.io/github/v/release/dennykorsukewitz/DK4Znuny-VisualStudioCode) | ![GitHub open issues](https://img.shields.io/github/issues/dennykorsukewitz/DK4Znuny-VisualStudioCode) | ![Visual Studio Marketplace Version ](https://img.shields.io/visual-studio-marketplace/v/dennykorsukewitz.dk4znuny-visualstudiocode) ![Visual Studio Marketplace last-updated](https://img.shields.io/visual-studio-marketplace/last-updated/dennykorsukewitz.dk4znuny-visualstudiocode)  |
| ![GitHub license](https://img.shields.io/github/license/dennykorsukewitz/DK4Znuny-VisualStudioCode) | ![GitHub closed issues](https://img.shields.io/github/issues-closed/dennykorsukewitz/DK4Znuny-VisualStudioCode?color=#44CC44) | ![Visual Studio Marketplace Rating release-date](https://img.shields.io/visual-studio-marketplace/release-date/dennykorsukewitz.dk4znuny-visualstudiocode) |
| ![GitHub language count](https://img.shields.io/github/languages/count/dennykorsukewitz/DK4Znuny-VisualStudioCode?style=flat&label=language)  | ![GitHub contributors](https://img.shields.io/github/contributors/dennykorsukewitz/DK4Znuny-VisualStudioCode) | ![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/dennykorsukewitz.dk4znuny-visualstudiocode) ![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/dennykorsukewitz.dk4znuny-visualstudiocode) |
| ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dennykorsukewitz/DK4Znuny-VisualStudioCode)  | ![GitHub downloads](https://img.shields.io/github/downloads/dennykorsukewitz/DK4Znuny-VisualStudioCode/total?style=flat) | ![VSC marketplace download](https://img.shields.io/visual-studio-marketplace/d/dennykorsukewitz.dk4znuny-visualstudiocode) ![VSC marketplace install](https://img.shields.io/visual-studio-marketplace/i/dennykorsukewitz.dk4znuny-visualstudiocode) |

| Versions | Status |
| ------ | ------ |
| ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/DK4/dev) | [![GitHub commits since tagged version](https://img.shields.io/github/commits-since/dennykorsukewitz/DK4Znuny-VisualStudioCode/1.0.2/dev)](https://github.com/dennykorsukewitz/DK4Znuny-VisualStudioCode/compare/1.0.2...dev) ![GitHub Workflow Lint](https://github.com/dennykorsukewitz/DK4Znuny-VisualStudioCode/actions/workflows/lint.yml/badge.svg?branch=dev&style=flat&label=Lint) ![GitHub Workflow Pages](https://github.com/dennykorsukewitz/DK4Znuny-VisualStudioCode/actions/workflows/pages.yml/badge.svg?branch=dev&style=flat&label=GitHub%20Pages) |

## Features

### Snippets ![Snippets Total Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2F5d77e9225ca53b6853ce4a5eda187b3edffc2426%2FDK4Znuny-VisualStudioCode%3Asnippets-total.json)

Znuny code snippets for fast, consistent and error free coding.

![snippets](doc/images/snippets.gif)

#### Static ![Snippets Static Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2F5d77e9225ca53b6853ce4a5eda187b3edffc2426%2FDK4Znuny-VisualStudioCode%3Asnippets-static.json)

Statically created snippets.

- CodePolicy
- ConfigXML
- Customizing
- Debugging
- DynamicFields
- GitLab
- Language
- Licensing
- Needed
- Perl
- POD
- Selenium
- VariableCheck

#### Generated ![Snippets Generated Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2F5d77e9225ca53b6853ce4a5eda187b3edffc2426%2FDK4Znuny-VisualStudioCode%3Asnippets-generated.json)

Snippets created generically using the existing perl POD.

- **Functions**/*
  - **ConfigObject**/*
    - ``$ConfigObject->Get()``
    - ``$ConfigObject->Set()``
  - **TicketObject**/*
    - ``$TicketObject->TicketGet()``
    - ``$TicketObject->TicketSearch()``
    - ...
  - ...
- **Modules**/*
  - AgentTicketZoom
  - CustomerTicketOverview
  - ...
- **ObjectManager**/*
  - ConfigObject ``my $ConfigObject = $Kernel::OM->Get('Kernel::Config');``
  - TicketObject ``my $TicketObject = $Kernel::OM->Get('Kernel::System::Ticket');``
  - ...

## Installation

To install this extension, you have three options:

1. Install via VSC extensions menu, `Code` -> `Preferences` -> `Extensions` simply search for `Znuny` to install.
2. Download latest [vsix file](https://github.com/dennykorsukewitz/DK4Znuny-VisualStudioCode/releases) and install via extensions menu, `Code` -> `Preferences` -> `Extensions` -> `Views and More Action` -> `Install from VSIX`.
3. Download archive with the latest [release](https://github.com/dennykorsukewitz/DK4Znuny-VisualStudioCode/releases) and unpack it to VisualStudioCode extensions folder `$HOME/.vscode/extensions/`.

## Download

For download see [DK4Znuny-VisualStudioCode](https://github.com/dennykorsukewitz/DK4Znuny-VisualStudioCode/releases)

---

Enjoy!

Your [Denny Korsukéwitz](https://github.com/dennykorsukewitz) 🚀
