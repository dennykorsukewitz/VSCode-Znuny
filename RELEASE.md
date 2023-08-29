# [1.2.0]

## GenerateFilelist

Fixed spacing in FileList GenerateFilelist. Thanks to Emin Yazi (@eyazi). [PR#4](https://github.com/dennykorsukewitz/VSCode-Znuny/pull/4)

## Customizer

Added new Setting `znuny.customizer.informationMessages` - Information messages will be displayed.

## AddFolderToWorkspace

This Function provides a searchable list of folders (Workspaces) that can be added **simultaneous** to the current VSC Workspace. All configured folders will be displayed.

**Shortcut:** ```strg + alt + k, p```<br>
**Command:**  ```AddFolderToWorkspace: Add Folder to Workspace.```

## RemoveFolderFromWorkspace

This Function provides a searchable list of folders (Workspaces) that can be removed **simultaneous** from the current VSC Workspace. All current open folders are displayed.

**Shortcut:** ```strg + alt + k, shift + p```<br>
**Command:**  ```AddFolderToWorkspace: Remove Folder from Workspace.```

## QuoteWithMarker

### Leading zeros

Added leading zeros to month and day to always get the same date format.

### blockComment

Some languages do not have line comments, such as CSS.
But, they have the possibility to comment out a code block (blockComment).
Now the QuoteWithMarker can be used in these languages as well.
