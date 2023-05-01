<img align="right" width="150" height="150" src="doc/images/icon.png">

# Znuny

**Znuny** is an extension that helps you to make Znuny development easier, faster and more error-free.

| Repository | GitHub | Visual Studio Marketplace |
| ------ | ------ | ------ |
| ![GitHub release (latest by date)](https://img.shields.io/github/v/release/dennykorsukewitz/VSCode-Znuny) | ![GitHub open issues](https://img.shields.io/github/issues/dennykorsukewitz/VSCode-Znuny) ![GitHub closed issues](https://img.shields.io/github/issues-closed/dennykorsukewitz/VSCode-Znuny?color=#44CC44) | ![Visual Studio Marketplace last-updated](https://img.shields.io/visual-studio-marketplace/last-updated/dennykorsukewitz.dk4znuny-visualstudiocode) ![Visual Studio Marketplace Version ](https://img.shields.io/visual-studio-marketplace/v/dennykorsukewitz.dk4znuny-visualstudiocode) |
| ![GitHub license](https://img.shields.io/github/license/dennykorsukewitz/VSCode-Znuny) | ![GitHub pull requests](https://img.shields.io/github/issues-pr/dennykorsukewitz/VSCode-Znuny?label=PR) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/dennykorsukewitz/VSCode-Znuny?color=g&label=PR) | ![Visual Studio Marketplace Rating release-date](https://img.shields.io/visual-studio-marketplace/release-date/dennykorsukewitz.dk4znuny-visualstudiocode) |
| ![GitHub language count](https://img.shields.io/github/languages/count/dennykorsukewitz/VSCode-Znuny?style=flat&label=language)  | ![GitHub contributors](https://img.shields.io/github/contributors/dennykorsukewitz/VSCode-Znuny) | ![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/dennykorsukewitz.dk4znuny-visualstudiocode) ![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/dennykorsukewitz.dk4znuny-visualstudiocode) |
| ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dennykorsukewitz/VSCode-Znuny)  | ![GitHub downloads](https://img.shields.io/github/downloads/dennykorsukewitz/VSCode-Znuny/total?style=flat) | ![VSC marketplace download](https://img.shields.io/visual-studio-marketplace/d/dennykorsukewitz.dk4znuny-visualstudiocode) ![VSC marketplace install](https://img.shields.io/visual-studio-marketplace/i/dennykorsukewitz.dk4znuny-visualstudiocode) |

| Versions | Status |
| ------ | ------ |
| ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/VSCode-Znuny/Znuny%206.0) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/VSCode-Znuny/Znuny%206.4) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/VSCode-Znuny/Znuny%206.5) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/DK4/dev) | [![GitHub commits since tagged version](https://img.shields.io/github/commits-since/dennykorsukewitz/VSCode-Znuny/1.0.4/dev)](https://github.com/dennykorsukewitz/VSCode-Znuny/compare/1.0.4...dev) ![GitHub Workflow Lint](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/lint.yml/badge.svg?branch=dev&style=flat&label=Lint) [![Snippet](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/snippet.yml/badge.svg)](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/snippet.yml) ![GitHub Workflow Pages](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/pages.yml/badge.svg?branch=dev&style=flat&label=GitHub%20Pages) |

## Features

- Snippets
- StatusBar

### Snippets ![Snippets Total Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2Fe19742578a7aaf26231a0af31d219d1abe3abb11%2FVSCode-Znuny%3Asnippets-total.json)

Znuny code snippets for fast, consistent and error free coding.

![Snippets](doc/images/snippets.gif)

#### Static ![Snippets Static Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2Fe19742578a7aaf26231a0af31d219d1abe3abb11%2FVSCode-Znuny%3Asnippets-static.json)

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

#### Generated ![Snippets Generated Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2Fe19742578a7aaf26231a0af31d219d1abe3abb11%2FVSCode-Znuny%3Asnippets-generated.json)

Snippets created generically using the existing Perl POD.

```md
snippets
│
└───Functions
│   └───ConfigObject
│   │       $ConfigObject->Get()
│   │       $ConfigObject->Set()
│   │
│   └───TicketObject
│           $TicketObject->TicketGet()
│           $TicketObject->TicketSearch()
│           ...
│
└───Modules
│       AgentTicketZoom
│       CustomerTicketOverview
│       ...

└───ObjectManager
        ConfigObject
            my $ConfigObject = $Kernel::OM->Get('Kernel::Config');
        TicketObject
            my $TicketObject = $Kernel::OM->Get('Kernel::System::Ticket');
        ...
```

### StatusBar

The status bar gets an additional **Znuny** item and the entire status bar is displayed in the Znuny color ![#ff9b00](https://placehold.co/15x15/ff9b00/ff9b00.png) \
if the active file is a "Znuny file".

- If the active file belongs to a **Znuny framework** ("Znuny file") in the workspace, the **product name** and **version** are displayed from the RELEASE file.
- If the active file belongs to a **Znuny package** ("Znuny file") in the workspace, the **vendor** and the largest **framework version** are displayed from the SOPM file.

The status bar is updated with every active file change.

![StatusBar](doc/images/statusbar.gif)

## Installation

To install this extension, you have **three** options:

### 1. Search Extension in Marketplace

Search and install online extension via VSC extensions menu.

`Code` -> `Preferences` -> `Extensions` simply search for `Znuny` to install.

### 2. Install via vsix file

Download latest [vsix file](https://github.com/dennykorsukewitz/VSCode-Znuny/releases) and install via extensions menu.

`Code` -> `Preferences` -> `Extensions` -> `Views and More Action` -> `Install from VSIX`.

### 3. Source code

Download archive with the latest [release](https://github.com/dennykorsukewitz/VSCode-Znuny/releases) and unpack it to VisualStudioCode extensions folder
`$HOME/.vscode/extensions/`.

## Download

For download see [VSCode-Znuny](https://github.com/dennykorsukewitz/VSCode-Znuny/releases)

---

Enjoy!

Your [Denny Korsukéwitz](https://github.com/dennykorsukewitz) 🚀
