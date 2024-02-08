// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const helper = require('./utils/helper.js');
const { default: fetch } = require('node-fetch');
require('buffer');

// Create global variable `myStatusBarItem`.
let myStatusBarItem;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "Znuny" is now active!');

    // This function add the selected folder to workspace (VSC Workspace).
    // Also known as ZnunyAddToProject function.
    initAddFolderToWorkspace(context);

    // This function removes the selected folder from workspace (VSC Workspace).
    initRemoveFolderFromWorkspace(context);

    // This function fetches Znuny files from GitHub and adds origin to header.
    initCustomizer(context);

    // Inserts the SOPM Filelist content containing all files of a selectable project.
    initGenerateFilelist(context);

    // This function inserts the @ObjectDependencies array by parsing the file content. Only regular used OM (ObjectManager) calls are supported.
    initObjectDependencies(context);

    // This function quotes the selected area and adds a custom marker to it.
    initQuoteWithMarker(context);

    // The status bar gets an additional **Znuny** item and the entire status bar is displayed in the Znuny color if the active file is a "Znuny file".
    initStatusBarItem(context);
}

function initAddFolderToWorkspace(context) {

    const addFolderToWorkspaceId = 'znuny.addFolderToWorkspace';
    context.subscriptions.push(vscode.commands.registerCommand(addFolderToWorkspaceId, async () => {

        let workspaceDirectories = [],
            newWorkspaceFound     = 0,
            manualWorkspace       = '',
            manualDirectoryString = '-- Add manually a directory --';

        let config = vscode.workspace.getConfiguration('znuny').get('addFolderToWorkspace');

        // Check if workspaces are defined.
        if (!config.workspaces.length && !config.recursiveWorkspaces.length) {
            vscode.commands.executeCommand('workbench.action.openSettings', 'addFolderToWorkspace');
            vscode.window.showWarningMessage(`Znuny - AddFolderToWorkspace: Workspaces - Undefined`, { detail: 'Define at least one workspace (fullpath).\n\nExample: "/Users/workspace/"', modal: true });
            return;
        }

        // Add all stored workspaces / directories.
        workspaceDirectories = config.workspaces || [];

        // Get all first level directories from given directories.
        config.recursiveWorkspaces.forEach(myWorkspace => {
            let workspaceDirectory = fs.readdirSync(myWorkspace, { withFileTypes: true })
                .filter(dir => dir.isDirectory())
                .map(dir => myWorkspace + dir.name);

            workspaceDirectories = workspaceDirectories.concat(workspaceDirectory);
        })

        // Check if directories are defined.
        if (!workspaceDirectories.length) {
            vscode.commands.executeCommand('workbench.action.openSettings', 'addFolderToWorkspace');
            vscode.window.showWarningMessage(`Znuny - AddFolderToWorkspace: Workspaces - Undefined`, { detail: 'Define at least one workspace (fullpath).\n\nExample: "/Users/workspace/"', modal: true });
            return;
        }

        if (workspaceDirectories.length && !workspaceDirectories.includes(manualDirectoryString)) {
            workspaceDirectories.unshift(manualDirectoryString);
        }

        // Open QuickPick and add selected Folder (Directory to VSC Workspace).
        let workspaces = await vscode.window.showQuickPick(workspaceDirectories, {
            title: 'Znuny - AddFolderToWorkspace',
            placeHolder: 'Znuny - AddFolderToWorkspace: Select a folder...',
            canPickMany: true,
        })

        if (!workspaces) return;

        if (workspaces.length && workspaces.includes(manualDirectoryString)) {

            workspaces.shift(manualDirectoryString);
            newWorkspaceFound = 1;

            manualWorkspace = await vscode.window.showInputBox({
                title: 'Znuny - AddFolderToWorkspace',
                placeHolder: 'Znuny - AddFolderToWorkspace: Add manually a directory...',
            });

            if (manualWorkspace){
                workspaces.push(manualWorkspace);
            }
        }
        if (!workspaces) return;

        let workspaceURIs = [];
        for await (const workspace of workspaces) {

            // Get URI of selected directory.
            let URI = vscode.Uri.file(workspace),
                URIexists = 0;

            if (!URI) return;

            if (vscode.workspace.workspaceFolders){
                vscode.workspace.workspaceFolders.sort().forEach(function (workspaceFolder) {

                    if (URI.path == workspaceFolder.uri.path){
                        URIexists = 1;
                    }
                })
            }

            if (!URIexists){
                workspaceURIs.push({ uri: URI });
            }
        }

        if (!workspaceURIs.length) return;

        if (newWorkspaceFound) {
            let addNewWorkspaceToConfig = await vscode.window.showQuickPick(['yes','no'], {
                title: 'Znuny - AddFolderToWorkspace (New Workspace)',
                placeHolder: 'Znuny - AddFolderToWorkspace: Should I save the new workspace in the settings?',
                canPickMany: false,
            });

            if (addNewWorkspaceToConfig == 'yes'){

                if (!manualWorkspace.endsWith("/")){
                    manualWorkspace += '/';
                }

                let configWorkspaces = config.workspaces;
                configWorkspaces.push(manualWorkspace);

                await vscode.workspace.getConfiguration().update('znuny.addFolderToWorkspace.workspaces', configWorkspaces, true);
            }
        }

        // Add selected Folder to Workspace.
        await updateWorkspaceAndWait(0, null, workspaceURIs);

    }))
}

function initRemoveFolderFromWorkspace(context) {

    const removeFolderFromWorkspaceId = 'znuny.removeFolderFromWorkspace';
    context.subscriptions.push(vscode.commands.registerCommand(removeFolderFromWorkspaceId, async () => {

        // Check all current workspace folders.
        let workspaceFolders = [];
        vscode.workspace.workspaceFolders.sort().forEach(function (workspaceFolder) {
            workspaceFolders.push(workspaceFolder.name)
        })

        if (!workspaceFolders.length) return;

        // Create showQuickPick 'Znuny - RemoveFolderFromWorkspace' selection.
        let workspaces = await vscode.window.showQuickPick(workspaceFolders, {
            title: 'Znuny - RemoveFolderFromWorkspace',
            placeHolder: 'Znuny - RemoveFolderFromWorkspace: Select workspaces to be removed...',
            canPickMany: true,
        });

        if (!workspaces) return;

        let removeIndexes = [];

        // Sort and reverse selected 'remove' Folder from Workspace.
        vscode.workspace.workspaceFolders.sort().forEach(function (workspaceFolder) {
            // workspaceFolders.push(workspaceFolder.name)
            let removeWorkspace = workspaces.includes(workspaceFolder.name);

            if (removeWorkspace){
                removeIndexes.push(workspaceFolder.index)
            }
        })

        // Remove selected Folder from Workspace.
        for await (const removeIndex of removeIndexes.reverse()) {
            await updateWorkspaceAndWait(removeIndex, 1, []);
        }
    }))
}


function initCustomizer(context) {

    const customizerId = 'znuny.customizer';
    context.subscriptions.push(vscode.commands.registerCommand(customizerId, async () => {

        // Return if no workspaceFolder is available
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showWarningMessage(`Znuny: No Workspace Folder is available. Please open a folder before.`)
            vscode.commands.executeCommand('workbench.action.addRootFolder');
            return;
        }
        let config = vscode.workspace.getConfiguration('znuny').get('customizer');

        // Create Repository Selection.
        if (config.informationMessages != 'false' ) {
            vscode.window.showInformationMessage(`Znuny - Customizer (1/5): Fetching GitHub repositories.`);
        }

        const repository = await vscode.window.showQuickPick(config.repositories, {
            title: 'Znuny - Customizer (1/5)',
            placeHolder: 'Znuny - Customizer: Select GitHub Repositories...',
            canPickMany: false,
        });
        if (!repository) return;

        // Create Branch Selection.
        let url = `https://api.github.com/repos/znuny/${repository}/branches`;
        if (config.informationMessages != 'false' ) {
            let message = `Znuny - Customizer (2/5): Fetching branches.`;
            if (config.informationMessages == 'verbose' ) {
                message = `Znuny - Customizer (2/5): Fetching branches from "${url}".`;
            }
            vscode.window.showInformationMessage(message);
        }

        let response = await fetch(url);
        let json = await response.json();
        let branches = [];

        if (json.message) {
            vscode.window.showErrorMessage(`Znuny - Customizer: ${json.message}.`);
            return;
        }

        Object.keys(json).forEach(function (key) {
            branches.push(json[key].name);
        });

        const branch = await vscode.window.showQuickPick(branches.reverse(), {
            title: 'Znuny - Customizer (2/5)',
            placeHolder: 'Znuny - Customizer: Select Branch...',
            canPickMany: false,
        });
        if (!branch) return;

        // Get all possible files.
        url = `https://api.github.com/repos/znuny/${repository}/git/trees/${branch}?recursive=1`

        if (config.informationMessages != 'false' ) {
            let message = `Znuny - Customizer (3/5): Fetching files.`;
            if (config.informationMessages == 'verbose' ) {
                message = `Znuny - Customizer (3/5): Fetching files from "${url}".`;
            }
            vscode.window.showInformationMessage(message)
        }

        response = await fetch(url);
        json = await response.json();
        let files = [];

        if (json.message) {
            vscode.window.showErrorMessage(`Znuny - Customizer: ${json.message}.`);
            return;
        }

        json.tree.forEach(function (file) {
            if (file.type == 'tree') return false;
            files.push(file.path);
        });

        let file = await vscode.window.showQuickPick(files, {
            title: 'Znuny - Customizer (3/5)',
            placeHolder: 'Znuny - Customizer: Select File...',
            canPickMany: false,
        });
        if (!file) return;
        if (!vscode.workspace.workspaceFolders.length) return;

        // Get all workspace folders.
        let workspaceFolders = [];
        vscode.workspace.workspaceFolders.forEach(workspaceFolder => {
            workspaceFolders.push(workspaceFolder.uri.path)
        })

        if (config.informationMessages != 'false' ) {
            vscode.window.showInformationMessage(`Znuny - Customizer (4/5): Fetching destination folder.`);
        }

        let workspaceFolder = await vscode.window.showQuickPick(workspaceFolders, {
            title: 'Znuny - Customizer (4/5)',
            placeHolder: 'Znuny - Customizer: Select destination folder...',
            canPickMany: false,
        });
        if (!workspaceFolder) {
            vscode.window.showErrorMessage(`Znuny - Customizer: No Workspace Folder exists.`);
            return;
        }

        // Get file data.
        url = `https://api.github.com/repos/znuny/${repository}/contents/${file}?ref=${branch}`;

        // Log.
        if (config.informationMessages == 'verbose' ) {
            vscode.window.showInformationMessage(`Znuny - Customizer: Fetching file data for file: "${file}" from branch: "${branch}" from url: "${url}".`);
        }

        response = await fetch(url);
        json = await response.json();
        if (json.message) {
            vscode.window.showErrorMessage(`Znuny - Customizer: ${json.message}.`);
            return;
        }

        let content = Buffer.from(json['content'], 'base64').toString('utf-8');
        if (!content) {
            vscode.window.showErrorMessage(`Znuny - Customizer: No file content exists.`);
            return;
        }

        // Log.
        if (config.informationMessages == 'verbose' ) {
            vscode.window.showInformationMessage(`Znuny - Customizer: Decoded file: "${file}" from branch: "${branch}".`);
        }

        // Get commits
        url = `https://api.github.com/repos/znuny/${repository}/commits?path=${file};sha=${branch}`;

        // Log.
        if (config.informationMessages == 'verbose' ) {
            vscode.window.showInformationMessage(`Znuny - Customizer: Fetching commits for file: "${file}" from branch: "${branch}" from url: "${url}".`);
        }

        response = await fetch(url);
        let commits = await response.json();

        // Add customer header.
        let commentPrefix = '#';
        let commentPrefixRegex = `${commentPrefix}`;

        if (file.endsWith('.js')) {
            commentPrefix = '//';
            commentPrefixRegex = `${commentPrefix}`;
        }

        // Prepare origin block.
        let originBlock = `${commentPrefix} --\n`
        originBlock += `${commentPrefix} $origin: ${repository} - ${commits[0].sha} - ${file}`

        // Prepare customization header with origin and copyright (if exists).
        let copyrightBlock = '';
        if (config.copyright) {
            copyrightBlock = `${commentPrefix} ${config.copyright}\n`;
        }

        let customizationBlock = `${copyrightBlock}${originBlock}\n`;
        let searchRegex = `(^${commentPrefixRegex}\\s+Copyright\\s[^\n]+\\sZnuny\\sGmbH[^\n]+\n)`

        var regEx = new RegExp(searchRegex, "gm");
        content = content.replace(regEx, `$1${customizationBlock}`);

        if (file.endsWith('.pm') || file.endsWith('.dtl') || file.endsWith('.tt')) {
            file = `Custom/${file}`;
        }

        const wsEdit = new vscode.WorkspaceEdit();
        const filePath = vscode.Uri.file(workspaceFolder + '/' + file);

        if (!filePath) {
            vscode.window.showErrorMessage(`Znuny - Customizer: No filePath exists.`)
            return;
        }

        wsEdit.createFile(filePath, { ignoreIfExists: true });
        wsEdit.insert(filePath, new vscode.Position(0, 0), content);

        // Apply all changes.
        vscode.workspace.applyEdit(wsEdit);
        if (config.informationMessages != 'false' ) {
            vscode.window.showInformationMessage(`Znuny - Customizer (5/5): Added file ${filePath.path} `);
        }
    }))
}

function initGenerateFilelist(context) {

    const generateFilelistId = 'znuny.generateFilelist';
    context.subscriptions.push(vscode.commands.registerCommand(generateFilelistId, async () => {

        let activeEditor = vscode.window.activeTextEditor;

        if (!activeEditor) return; // No open text editor.
        if (!activeEditor.document.fileName.endsWith('.sopm')) return; // No SOPM file.

        let config = vscode.workspace.getConfiguration('znuny').get('generateFilelist');

        let fileName = activeEditor.document.fileName;
        var workspace = fileName.substr(0, fileName.lastIndexOf("/") + 1);
        let filesList = await helper.getFileList(workspace);

        let fileListTemplate = '';
        if (config.mode == 'Filelist') {
            fileListTemplate = '    <Filelist>\n';
        }

        // Sort object list and add to template.
        filesList.sort().forEach(function (file, i) {

            let permission = '660';
            if (file.startsWith('bin/') || file.endsWith('.sh')) {
                permission = '770';
            }

            // Add file to FileList
            fileListTemplate += `        <File Permission="${permission}" Location="${file}" />`;

            // Add a new line as long as there is a next file.
            if (filesList.length - 1 != i) {
                fileListTemplate += `\n`;
            }
        })

        if (config.mode == 'Filelist') {
            fileListTemplate += '\n    </Filelist>';
        }

        // Add FileList to current position (selection.active)
        activeEditor.edit(editBuilder => {
            editBuilder.insert(activeEditor.selection.active, fileListTemplate);
        });
    }))
}

function initObjectDependencies(context) {

    const objectDependenciesId = 'znuny.objectDependencies';
    context.subscriptions.push(vscode.commands.registerCommand(objectDependenciesId, () => {

        let activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) return; // No open text editor.

        let text = activeEditor.document.getText();
        if (!text) return; // No text.

        let languageId = activeEditor.document.languageId;
        if (languageId != 'perl') return; // No perl language (syntax).

        // Search for current package name.
        let packageNamePattern = /package (.*);/g;
        let packageNameMatches = [...text.matchAll(packageNamePattern)];
        let packageName = packageNameMatches[0][1];

        // Loop over all "$Kernel::OM->Get('...')"s via a RegExp and extract the used object
        let objectDependencies = [];

        // Search for all ObjectDependencies
        let objectDependenciesPattern = /\$Kernel::OM\->(?:Get|Create)\(\s*(?:\'|\")([^\'\"]+)(?:\'|\")/g;
        let objectDependenciesMatches = [...text.matchAll(objectDependenciesPattern)];

        let objectDependenciesTemplate = "our @ObjectDependencies = (\n";
        objectDependenciesMatches.forEach(match => {
            let object = match[1];
            let exists = objectDependencies.includes(object);

            if (!object || object == packageName || exists) return false;

            objectDependencies.push(match[1]);
        })

        // Sort object list and add to template.
        objectDependencies.sort().forEach(object => {
            objectDependenciesTemplate += `    '${object}', \n`;
        })

        objectDependenciesTemplate += ");";

        // Add ObjectDependencies to current position (selection.active)
        activeEditor.edit(editBuilder => {
            editBuilder.insert(activeEditor.selection.active, objectDependenciesTemplate);
        });
    }))
}

function initQuoteWithMarker(context) {
    const quoteWithMarkerId = 'znuny.quoteWithMarker';
    context.subscriptions.push(vscode.commands.registerCommand(quoteWithMarkerId, () => {

        let activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) return; // No open text editor.

        // Get current selection
        let selection = activeEditor.selection;

        // Select current line if nothing is selected
        if (selection.isEmpty == true) {
            activeEditor.selection = new vscode.Selection(selection.active.line, 0, selection.active.line, 99);
            selection = activeEditor.selection;
        }

        let text = activeEditor.document.getText(selection) || '';
        let config = vscode.workspace.getConfiguration('znuny').get('quoteWithMarker');

        let quoteCharStart = '',
            quoteCharEnd = '',
            quoteCharStartOrigin = '',
            quoteCharBlockStart = '',
            isBlockComment = 0,
            codeMarkerReplace,
            codeMarker = config.codeMarker || 'Znuny',
            lineComment = config.lineComment || {},
            languageId = activeEditor.document.languageId;

        let currentTime = new Date();

        // returns the month (from 0 to 11).
        let month = currentTime.getMonth() + 1;

        // returns the day of the month (from 1 to 31).
        let day = currentTime.getDate();

        // returns the year (four digits).
        let year = currentTime.getFullYear();

        if (month.toString().length <= 1){
            month = month.toString().padStart(2, '0')
        }
        if (day.toString().length <= 1){
            day = day.toString().padStart(2, '0')
        }

        codeMarker = codeMarker.replace(/\${year}/g, year);
        codeMarker = codeMarker.replace(/\${month}/g, month);
        codeMarker = codeMarker.replace(/\${day}/g, day);

        // Get quoteCharStart from config.
        if (lineComment[languageId] && lineComment[languageId].length){
            quoteCharStart = lineComment[languageId];
        }

        // If no quoteCharStart is set, try to use the default value of lineComment of the current language config.
        if (quoteCharStart.length === 0 && languageId || quoteCharStart === 'undefined'){
            let extensions    = vscode.extensions.all;
            let languagesData = extensions.filter((extension) => extension.packageJSON.name === languageId);

            let languageExtensionPath = languagesData[0].extensionPath;
            let languageConfiguration = languagesData[0].packageJSON.contributes.languages[0].configuration;

            const configPath = path.join(languageExtensionPath, languageConfiguration);
            const content = fs.readFileSync(configPath, { encoding: 'utf8' });

            try {
                const config = JSON.parse(content);
                if (config.comments.lineComment){
                    quoteCharStart = config.comments.lineComment;
                }
                else if (config.comments.blockComment){
                    isBlockComment = 1;
                    quoteCharStart      = config.comments.blockComment[0];
                    quoteCharEnd        = ' ' + config.comments.blockComment[1];
                    quoteCharBlockStart = ' ' + config.comments.blockComment[0].substring(1);
                }

            } catch (error) {
                console.log(error);
            }
        }

        if (!quoteCharStart) return;

        let lineLength = 0;
        text.split(/\r?\n/).forEach(line => {
            if (line.toString().length > lineLength){
                lineLength = line.toString().length;
            }
        })

        codeMarkerReplace = `${quoteCharStart} ---${quoteCharEnd}\n`;
        codeMarkerReplace += `${quoteCharStart} ${codeMarker}${quoteCharEnd}\n`;
        codeMarkerReplace += `${quoteCharStart} ---${quoteCharEnd}\n`;

        if (isBlockComment) {
            codeMarkerReplace += `${quoteCharStart}\n`;
            quoteCharStartOrigin = quoteCharStart;
            quoteCharStart = quoteCharBlockStart;
        }

        // Add QuoteCharStart to every single line.
        text.split(/\r?\n/).forEach(line => {
            codeMarkerReplace += `${quoteCharStart} ${line}\n`;
        })

        if (isBlockComment) {
            codeMarkerReplace += `${quoteCharEnd}\n`;
            quoteCharStart = quoteCharStartOrigin;
        }

        codeMarkerReplace += `\n${text}`;
        codeMarkerReplace += `\n\n${quoteCharStart} ---${quoteCharEnd}\n`;
        text.replace(text, codeMarkerReplace);

        // Replace the selection in the editor with CodeMarker.
        if (selection.isEmpty == false) {
            activeEditor.edit(editBuilder => {
                editBuilder.replace(selection, codeMarkerReplace);
            });
        }

        // Add CodeMarker to current position if nothing is selected and could also not be selected.
        else {
            activeEditor.edit(editBuilder => {
                editBuilder.insert(activeEditor.selection.active, codeMarkerReplace);
            });
        }
    }))
}

function initStatusBarItem(context) {

    let config = vscode.workspace.getConfiguration('znuny').get('statusBar');
    const showZnunyVersionId = 'znuny.showZnunyVersion';

    // Create a new status bar item if enabled.
    if (config && config.enabled != 'Off') {
        myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        myStatusBarItem.command = showZnunyVersionId;
        context.subscriptions.push(myStatusBarItem);
    }

    // Register command in any case, so we do not get error messages.
    context.subscriptions.push(vscode.commands.registerCommand(showZnunyVersionId, () => {

        // Run only if 'On' or 'OnCommand'
        if (config && (config.enabled == 'On' || config.enabled == 'OnCommand')) {
            // Update StatusBar.
            updateStatusBarItem();
        };

        // Command 'znuny.showZnunyVersion' will be tigered by the command
        // and the click on the statusbar.
        // In both cases the "Version" file should be displayed, if available.

        // Get Znuny Data if possibile.
        let znunyData = helper.getZnunyData();
        if (!znunyData || !znunyData.source) return;

        // Open source file, when you click on status bar.
        vscode.workspace.openTextDocument(znunyData.source).then(doc => {
            vscode.window.showTextDocument(doc);
        })
    }))

    // Run only if 'On' or 'OnChangeActiveTextEditor'
    if (config && (config.enabled == 'On' || config.enabled == 'OnChangeActiveTextEditor')) {

        // Register some listener that make sure the status bar item is always up-to-date.
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(
            updateStatusBarItem
        ));

        // Update status bar item once at start.
        updateStatusBarItem();
    };
}

function updateWorkspaceAndWait(start, deleteCount, workspaceFoldersToAdd) {
    const success = vscode.workspace.updateWorkspaceFolders(start, deleteCount, ...workspaceFoldersToAdd)

    if (success) {
        const disps = []
        return new Promise(resolve => {

            // Note: it is not valid to call updateWorkspaceFolders() multiple times
            // without waiting for the onDidChangeWorkspaceFolders() to fire.
            // So we have to always wait in case we want to add or remove multiple folders.
            vscode.workspace.onDidChangeWorkspaceFolders(() => {
                resolve();
            }, null, disps);

        }).finally(() => disps.forEach(disp => disp.dispose()));
    } else {
        return Promise.reject(new Error("Failed to update workspace"))
    }
}

function updateStatusBarItem() {

    let znunyData = helper.getZnunyData();

    // Get colorCustomizations configuration.
    let znunyColorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations');
    let config = vscode.workspace.getConfiguration('znuny').get('statusBar');

    Object.keys(config).forEach(item => {
        let attributes = config[item];
        Object.keys(attributes).forEach(attribute => {
            let value = attributes[attribute];
            znunyColorCustomizations[item + '.' + attribute] = value;
        })
    })

    if (znunyData.product && znunyData.version && znunyData.source) {
        myStatusBarItem.text = `${znunyData.product} ${znunyData.version} `;
        myStatusBarItem.tooltip = `Get data from: \n${znunyData.source} `;
        myStatusBarItem.color = config.statusBar.foregroundZnuny || '#ffffff';
        myStatusBarItem.show();

        // Overwrite entire parent setting.
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', znunyColorCustomizations, false);

        return false
    }
    else {
        myStatusBarItem.hide();

        // Reset colorCustomizations.
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', {}, false);
        return false;
    }
}

// This method is called when your extension is deactivated.
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
