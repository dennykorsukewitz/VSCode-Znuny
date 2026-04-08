# Znuny

<img align="right" width="150" height="150" src="doc/images/Icon.png" alt="Znuny Extension Icon">

**Znuny** is a Visual Studio Code extension that helps you make Znuny development easier, faster, and less error-prone.
It combines a large snippet library—static categories for everyday tasks plus POD-generated Kernel API snippets—with a theme-aware customizer for agent and customer skins, commands to insert SOPM file lists and `@ObjectDependencies` blocks from the code you are editing, and a Znuny-focused status bar when you work on framework files.

| Repository | GitHub | Visual Studio Marketplace |
| ------ | ------ | ------ |
| ![GitHub release (latest by date)](https://img.shields.io/github/v/release/dennykorsukewitz/VSCode-Znuny) | ![GitHub open issues](https://img.shields.io/github/issues/dennykorsukewitz/VSCode-Znuny) ![GitHub closed issues](https://img.shields.io/github/issues-closed/dennykorsukewitz/VSCode-Znuny?color=#44CC44) | ![Visual Studio Marketplace last-updated](https://img.shields.io/visual-studio-marketplace/last-updated/dennykorsukewitz.znuny) ![Visual Studio Marketplace Version ](https://img.shields.io/visual-studio-marketplace/v/dennykorsukewitz.znuny) |
| ![GitHub license](https://img.shields.io/github/license/dennykorsukewitz/VSCode-Znuny) | ![GitHub pull requests](https://img.shields.io/github/issues-pr/dennykorsukewitz/VSCode-Znuny?label=PR) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/dennykorsukewitz/VSCode-Znuny?color=g&label=PR) | ![Visual Studio Marketplace Rating release-date](https://img.shields.io/visual-studio-marketplace/release-date/dennykorsukewitz.znuny) |
| ![GitHub language count](https://img.shields.io/github/languages/count/dennykorsukewitz/VSCode-Znuny?style=flat&label=language) | ![GitHub contributors](https://img.shields.io/github/contributors/dennykorsukewitz/VSCode-Znuny) | ![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/dennykorsukewitz.znuny) ![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/dennykorsukewitz.znuny) |
| ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dennykorsukewitz/VSCode-Znuny) | ![GitHub downloads](https://img.shields.io/github/downloads/dennykorsukewitz/VSCode-Znuny/total?style=flat) | ![VSC marketplace download](https://img.shields.io/visual-studio-marketplace/d/dennykorsukewitz.znuny) ![VSC marketplace install](https://img.shields.io/visual-studio-marketplace/i/dennykorsukewitz.znuny) |

| Versions | Status |
| ------ | ------ |
| ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/dennykorsukewitz/Znuny%206.0) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/dennykorsukewitz/Znuny%206.4) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/dennykorsukewitz/Znuny%206.5) <br> ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/dennykorsukewitz/Znuny%207.0) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/dennykorsukewitz/Znuny%207.1) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/dennykorsukewitz/Znuny%207.2) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/dennykorsukewitz/Znuny%207.3) ![GitHub label version](https://img.shields.io/github/labels/dennykorsukewitz/DK4/dev) | [![GitHub commits since tagged version](https://img.shields.io/github/commits-since/dennykorsukewitz/VSCode-Znuny/2.0.0/dev)](https://github.com/dennykorsukewitz/VSCode-Znuny/compare/2.0.0...dev) ![GitHub Workflow Lint](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/lint.yml/badge.svg?branch=dev&style=flat&label=Lint) [![Snippet](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/snippet.yml/badge.svg)](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/snippet.yml) ![GitHub Workflow Pages](https://github.com/dennykorsukewitz/VSCode-Znuny/actions/workflows/pages.yml/badge.svg?branch=dev&style=flat&label=GitHub%20Pages) |

## Features

- [Customizer](#customizer)
- [Insert Filelist](#insert-filelist)
- [Insert @ObjectDependencies](#insert-objectdependencies)
- [Snippets](#snippets)
- [StatusBar](#statusbar)
- [Companion extensions](#companion-extensions) (optional Marketplace installs)

---

### Snippets

![Snippets Total Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2FVSCode-Znuny%3Asnippets-total.json)

Znuny code snippets for fast, consistent and error free coding.

![Snippets](doc/images/Snippets.gif)

#### Static

![Snippets Static Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2FVSCode-Znuny%3Asnippets-static.json)

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
- Scaffolding
- Selenium
- SOPM
- VariableCheck

#### Generated

![Snippets Generated Counter](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fdennykorsukewitz%2Fe2729bfd9b81d9c032ded617a3f924e7%2Fraw%2FVSCode-Znuny%3Asnippets-generated.json)

Snippets created generically using the existing Perl POD.

```perl
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
│
└───ObjectManager
        ConfigObject
            my $ConfigObject = $Kernel::OM->Get('Kernel::Config');
        TicketObject
            my $TicketObject = $Kernel::OM->Get('Kernel::System::Ticket');
        ...
```

---

### Customizer

This function fetches Znuny files from GitHub and adds origin to header.

```perl
# $origin: Znuny - 7775216b80452a6ce2267812a25bf23ae786ae57 - Kernel/System/Ticket.pm
```

**Shortcut:** ```strg + alt + z, c```<br>
**Command:**  ```Znuny: Fetch Znuny files from GitHub.```

Opens a project, branch and file selection list to chose a framework or addon file from. The file will get fetched live from the selected GitHub branch and added to the (selected) folder. The origin tag will be added automatically to the file header for you. The file will also be automatically added to the 'Custom/' directory in case it's a file with one of the file extensions '.pm', '.dtl' or '.tt'.
If the copyright is set in the settings, it will be added as well.

The GitHub API is limited to 60 requests per hour for non authorized requests.
If you need more requests, please create an issue on the use of credentials.

The following steps are performed one after the other.

**1. Znuny - Customizer (1/5):** Fetching GitHub repositories.

```markdown
    This function allows you to search for GitHub owners or GitHub repositories.
    The search results (owner/repository) are then displayed.
```

**2. Znuny - Customizer (2/5):** Fetching branches.

```markdown
    After selecting the repository, all possible branches are displayed.
```

**3. Znuny - Customizer (3/5):** Fetching files.

```markdown
    After that, select the desired file.
```

**4. Znuny - Customizer (4/5):** Fetching destination folder.

```markdown
    Finally, the destination folder must be selected.
```

**5. Znuny - Customizer (5/5):** Added file.

```markdown
    `Hocus Pocus` - The file was created at the desired location.
```

#### Settings

`Preferences -> Settings -> Extensions -> Znuny`

| Name | Description | Default Value |
| - | - | - |
| znuny.customizer.copyright | Znuny Customizer Copyright. This Copyright will be added to the Customizer file under the Znuny Copyright. | |
| znuny.customizer.repositories | List of possible GitHub repositories. | `Znuny\|FAQ\|...` |

![Customizer](doc/images/Customizer.gif)

---

### Insert filelist

Inserts the SOPM Filelist content containing all files of a selectable project.<br>
The following file types will be added: `pm | tt | t | xml | js | html.tmpl`

The function can be executed only in the `.sopm` file.

**Shortcut:** ```strg + alt + z, f```<br>
**Command:**  ```Znuny: Insert Filelist to SOPM.```

#### Settings

`Preferences -> Settings -> Extensions -> Znuny`

| Name | Description | Default Value |
| - | - | - |
| znuny.insertFilelist.mode | Controls how the SOPM file list is inserted.<br><br>**File** => Adds only every single file without `<Filelist>`.<br>**Filelist** => Adds the complete filelist with `<Filelist>`. | File |

![Insert filelist](doc/images/InsertFileList.gif)

---

### Insert @ObjectDependencies

This function inserts the `@ObjectDependencies` array by parsing the file content. Only regular used OM (ObjectManager) calls are supported.

**Shortcut:** ```strg + alt + z, d```<br>
**Command:**  ```Znuny: Insert @ObjectDependencies.```

![Insert @ObjectDependencies](doc/images/InsertObjectDependencies.gif)

---

### StatusBar

The status bar gets an additional **Znuny** item and the entire status bar is displayed in the Znuny color ![#ff9b00](https://placehold.co/15x15/ff9b00/ff9b00.png) \
if the active file is a "Znuny file".

- If the active file belongs to a **Znuny framework** ("Znuny file") in the workspace, the **product name** and **version** are displayed from the RELEASE file.
- If the active file belongs to a **Znuny package** ("Znuny file") in the workspace, the **vendor** and the largest **framework version** are displayed from the SOPM file.

The status bar is updated with every active file change.

**Shortcut:** ```strg + alt + z, v```<br>
**Command:**  ```Znuny: Show Znuny Version.```

#### Settings

`Preferences -> Settings -> Extensions -> Znuny`

| Name | Description | Default Value |
| - | - | - |
| znuny.statusBar.enabled | Defines when the StatusBar should be updated. <br><br> **On**: Always active.<br> **On Command**: Activated only by a command.<br> **On ChangeActiveTextEditor**: Activated only by change of active TextEditor.<br> **Off**: Not active. | On |
| znuny.statusBar.statusBar.background | Znuny Status Bar background color. | #ff9b00 |
| znuny.statusBar.statusBar.foreground | Znuny Status Bar foreground color. | #000000 |
| znuny.statusBar.statusBar.foregroundZnuny | Znuny Status Bar foreground color for Znuny Version Item. | #ffffff |
| znuny.statusBar.statusBarItem.hoverBackground | Znuny Status Bar hoverBackground color. | #ffc062 |

![StatusBar](doc/images/StatusBar.gif)

---

### Companion extensions

These tools are maintained as separate extensions (same publisher). They can be installed directly from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode) (search by name or extension ID).

| Workflow                                            | Extension                                                                                  | Marketplace ID                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------- |
| Quote selection with a marker block                 | [Quote With Marker](https://github.com/dennykorsukewitz/VSCode-QuoteWithMarker)            | `dennykorsukewitz.QuoteWithMarker`      |
| Add / remove workspace folders (multi-root helpers) | [Add Folder To Workspace](https://github.com/dennykorsukewitz/VSCode-AddFolderToWorkspace) | `dennykorsukewitz.addfoldertoworkspace` |

---

## Installation

To install this extension, you have **three** options:

### 1. Search Extension in Marketplace

Search and install online extension via VSC extensions menu.

`Code` -> `Preferences` -> `Extensions` simply search for `Znuny` to install.

### 2. Install via vsix file

Download latest [vsix file](https://github.com/dennykorsukewitz/VSCode-Znuny/releases) and install via extensions menu.

`Code` -> `Preferences` -> `Extensions` -> `Views and More Action` -> `Install from VSIX`.

### 3. Source code

Download archive with the latest [release](https://github.com/dennykorsukewitz/VSCode-Znuny/releases) and unpack it to Visual Studio Code extensions folder
`$HOME/.vscode/extensions/`.

---

## Download

For download see [VSCode-Znuny](https://github.com/dennykorsukewitz/VSCode-Znuny/releases)

---

Enjoy!

Your [Denny Korsukéwitz](https://github.com/dennykorsukewitz) 🚀
