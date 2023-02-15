// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const helper = require('./utils/helper.js');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let myStatusBarItem;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "Znuny" is now active!');

    // register a command that is invoked when the status bar
    initQuoteWithMarker(context);

    // register a command that is invoked when the status bar
    initStatusBarItem(context);
}

function initQuoteWithMarker(context) {
    // The code you place here will be executed every time your command is executed
    const quoteWithMarkerId = 'znuny.quoteWithMarker';
    context.subscriptions.push(vscode.commands.registerCommand(quoteWithMarkerId, () => {
        vscode.window.showInformationMessage('Hello World from znuny!');
    }))
}

function initStatusBarItem(context) {

    // register a command that is invoked when the status bar
    const showZnunyVersionId = 'znuny.showZnunyVersion';
    context.subscriptions.push(vscode.commands.registerCommand(showZnunyVersionId, () => {
        var znunyData = helper.getZnunyData();
        vscode.window.showInformationMessage(`You are developing with Znuny that is awesome. Keep going!`, { modal: false });

        // open source file, when you click on status bar
        vscode.workspace.openTextDocument(znunyData.source).then(doc => {
            vscode.window.showTextDocument(doc);
        })
    }))

    // create a new status bar item that we can now manage
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    myStatusBarItem.command = showZnunyVersionId;
    context.subscriptions.push(myStatusBarItem);

    // register some listener that make sure the status bar
    // item always up-to-date
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

    // update status bar item once at start
    updateStatusBarItem();
}

function updateStatusBarItem() {

    var znunyData = helper.getZnunyData();

    // get colorCustomizations configuration
    var znunyColorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations');
    var znunyColors              = vscode.workspace.getConfiguration('znuny').get('color');

    Object.keys(znunyColors).forEach(item => {
        var attributes = znunyColors[item];
        Object.keys(attributes).forEach(attribute => {
            var value = attributes[attribute];
            znunyColorCustomizations[item + '.' + attribute] = value;
        })
    })

    if (znunyData.product && znunyData.version && znunyData.source) {
        myStatusBarItem.text    = `${znunyData.product} ${znunyData.version}`;
        myStatusBarItem.tooltip = `Get data from:\n${znunyData.source}`;
        myStatusBarItem.color   = '#2f00ff';
        myStatusBarItem.show();

        // Overwrite entire parent setting
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', znunyColorCustomizations, false );

        return false
    }
    else {
        myStatusBarItem.hide();

        // reset colorCustomizations
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', {}, false );
        return false;
    }
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
