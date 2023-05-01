// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const helper = require('./utils/helper.js');

// Create global variable `myStatusBarItem`.
let myStatusBarItem;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "Znuny" is now active!');

    // This function shows that this extension `dennykorsukewitz.dk4znuny-visualstudiocode` is deprecate in favor of the new extension `dennykorsukewitz.znuny`.
    // Please install the new Znuny extension instead and uninstall the old version.
    initShowDeprecated(context);

    // This function quotes the selected area and adds a custom marker to it.
    initQuoteWithMarker(context);

    // This function inserts the @ObjectDependencies array by parsing the file content. Only regular used OM (ObjectManager) calls are supported.
    initObjectDependencies(context);

    // The status bar gets an additional **Znuny** item and the entire status bar is displayed in the Znuny color if the active file is a "Znuny file".
    initStatusBarItem(context);
}

function initShowDeprecated(context) {
    vscode.window.showWarningMessage(`[Deprecated] Znuny (DK4Znuny-VisualStudioCode).`, {
        detail: '"dennykorsukewitz.dk4znuny-visualstudiocode" is deprecate in favor of the new extension "dennykorsukewitz.znuny". Please install the new Znuny extension instead and uninstall the old version.', modal: true
    });
    return;
}

function initQuoteWithMarker(context) {
    const quoteWithMarkerId = 'znuny.quoteWithMarker';
    context.subscriptions.push(vscode.commands.registerCommand(quoteWithMarkerId, () => {

        let editor = vscode.window.activeTextEditor;
        if (!editor) return; // No open text editor.

        let text = editor.document.getText();
        if (!text) return; // No text.

        let languageId = editor.document.languageId;
        let selection = editor.selection;

        let quoteChar,
            codeMarkerReplace,
            codeMarker = vscode.workspace.getConfiguration('znuny').get('codeMarker') || 'Znuny';

        if (languageId == 'perl' || languageId == 'html' || languageId == 'plaintext') {
            quoteChar = '#';
        }
        else if (languageId == 'javascript') {
            quoteChar = '//';
        }

        if (!quoteChar) {
            return;
        }

        codeMarkerReplace = `${quoteChar} ---\n`;
        codeMarkerReplace += `${quoteChar} ${codeMarker}\n`;
        codeMarkerReplace += `${quoteChar} ---\n`;

        // Add QuoteChar to every single line.
        text.split(/\r?\n/).forEach(line => {
            codeMarkerReplace += `${quoteChar} ${line}\n`;
        })

        codeMarkerReplace += `\n${text}`;
        codeMarkerReplace += `\n\n${quoteChar} ---\n`;
        text.replace(text, codeMarkerReplace);

        // Replace the selection in the editor with the new string.
        editor.edit(editBuilder => {
            editBuilder.replace(selection, codeMarkerReplace);
        });
    }))
}

function initObjectDependencies(context) {

    const objectDependenciesId = 'znuny.objectDependencies';
    context.subscriptions.push(vscode.commands.registerCommand(objectDependenciesId, () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) return; // No open text editor.

        let text = editor.document.getText();
        if (!text) return; // No text.

        let languageId = editor.document.languageId;
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
            objectDependenciesTemplate += `    '${object}',\n`;
        })

        objectDependenciesTemplate += ");";

        // Add ObjectDependencies to current position (selection.active)
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, objectDependenciesTemplate);
        });
    }))
}

function initStatusBarItem(context) {

    const showZnunyVersionId = 'znuny.showZnunyVersion';
    context.subscriptions.push(vscode.commands.registerCommand(showZnunyVersionId, () => {
        let znunyData = helper.getZnunyData();
        vscode.window.showInformationMessage(`You are developing with Znuny that is awesome. Keep going!`, { modal: false });

        // Open source file, when you click on status bar.
        vscode.workspace.openTextDocument(znunyData.source).then(doc => {
            vscode.window.showTextDocument(doc);
        })
    }))

    // Create a new status bar item that we can now manage.
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    myStatusBarItem.command = showZnunyVersionId;
    context.subscriptions.push(myStatusBarItem);

    // Register some listener that make sure the status bar item is always up-to-date
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

    // Update status bar item once at start.
    updateStatusBarItem();
}

function updateStatusBarItem() {

    let znunyData = helper.getZnunyData();

    // Get colorCustomizations configuration.
    let znunyColorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations');
    let znunyColors = vscode.workspace.getConfiguration('znuny').get('color');

    Object.keys(znunyColors).forEach(item => {
        let attributes = znunyColors[item];
        Object.keys(attributes).forEach(attribute => {
            let value = attributes[attribute];
            znunyColorCustomizations[item + '.' + attribute] = value;
        })
    })

    if (znunyData.product && znunyData.version && znunyData.source) {
        myStatusBarItem.text = `${znunyData.product} ${znunyData.version}`;
        myStatusBarItem.tooltip = `Get data from:\n${znunyData.source}`;
        myStatusBarItem.color = znunyColors.statusBar.foregroundZnuny || '#ffffff';
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
