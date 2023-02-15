const vscode  = require('vscode');
const fs      = require('fs');
const path    = require('path');
const sopm    = require('./sopm.js');
const release = require('./release.js');

// get Znuny data from RELEASE or sopm file
function getZnunyData() {

    let data = {};

    // return if no workspaceFolders is available
    if (!vscode.workspace.workspaceFolders){
        return data;
    }

    // use root directory as fallback
    let workspace = vscode.workspace.workspaceFolders[0].uri.path;

    // check the current active editor and its root directory (workspace)
    if (vscode.window.activeTextEditor) {
        const activeEditorPath = vscode.window.activeTextEditor.document.uri.path;
        const matchingWorkspace = vscode.workspace.workspaceFolders.find(
            (wsFolder) => {
                const relative = path.relative(wsFolder.uri.fsPath, activeEditorPath);
                return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
            }
        );

        if (!matchingWorkspace || !matchingWorkspace.uri){
            return data;
        }
        workspace = matchingWorkspace.uri.path;
    }

    let filePath = workspace + '/RELEASE';

    if (fs.existsSync(filePath)) {
        data = release.getData(filePath);
        return data;
    }

    const dir   = fs.readdirSync(workspace);
    const files = dir.filter((elm) => elm.match(/.*\.(sopm)/ig));

    if (!files[0]) {
        return data;
    }

    const sopm_name = files[0];
    filePath        = workspace + '/' + sopm_name;

    if (fs.existsSync(filePath)) {
        data = sopm.getData(filePath);
        return data;
    }
    return data;
}

module.exports = {
    getZnunyData
}
