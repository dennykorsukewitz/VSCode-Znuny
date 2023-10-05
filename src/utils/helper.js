const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sopm = require('./sopm.js');
const release = require('./release.js');
const custom = require('./custom.js');

// Get Znuny data from RELEASE or sopm file
async function getZnunyData() {

    let data = {};

    // Return if no workspaceFolders is available
    if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length) {
        return data;
    }

    // Use root directory as fallback
    let workspace = vscode.workspace.workspaceFolders[0].uri.path;
    let activeEditorPath;

    // Check the current active editor and its root directory (workspace)
    if (vscode.window.activeTextEditor) {
        activeEditorPath = vscode.window.activeTextEditor.document.uri.path;
        const matchingWorkspace = vscode.workspace.workspaceFolders.find(
            (wsFolder) => {
                const relative = path.relative(wsFolder.uri.fsPath, activeEditorPath);
                return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
            }
        );

        if (!matchingWorkspace || !matchingWorkspace.uri) {
            return data;
        }
        workspace = matchingWorkspace.uri.path;
    }

    let filePath;

    // console.log('activeEditorPath');
    // console.log(activeEditorPath);
    // console.log(workspace);
    // console.log(vscode.window.activeTextEditor.document);

    // If editor is active / open file.
    if (activeEditorPath){

        let isCustomFile = activeEditorPath.includes(workspace + "/Custom/");

        console.log('isCustomFile');
        console.log(isCustomFile);

        if (isCustomFile){
            customData = await custom.getData(activeEditorPath);
            data = {
                ...data,
                ...customData
            };
        }
    }

    // Check if RELEASE file exists.
    filePath = workspace + '/RELEASE';
    if (fs.existsSync(filePath)) {

        // Get Data from RELEASE file.
        releaseData = release.getData(filePath);

        data = {
            ...data,
            ...releaseData
        };

        return data;
    }

    // Check if SOPM file exists.
    const dir = fs.readdirSync(workspace);
    const files = dir.filter((elm) => elm.match(/.*\.(sopm)/ig));
    if (!files[0]) {
        return data;
    }

    const sopm_name = files[0];
    filePath = workspace + '/' + sopm_name;

    if (fs.existsSync(filePath)) {

        // Get Data from SOPM file.
        sopmData = sopm.getData(filePath);

        data = {
            ...data,
            ...sopmData
        };

        return data;
    }
    return data;
}

async function getFileList(path) {

    const files = await glob.sync(path + '/**/*.*');
    let fileList = files.map(file => file.replace(path, '')).filter((file) => file.match(/.*\.(pm|tt|t|xml|js|html\.tmpl)$/ig));

    return fileList;
}

module.exports = {
    getZnunyData,
    getFileList
}
