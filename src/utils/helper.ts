const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sopm = require('./sopm.js');
const release = require('./release.js');


export function updateWorkspaceAndWait(start, deleteCount, workspaceFoldersToAdd) {
    const success = vscode.workspace.updateWorkspaceFolders(start, deleteCount, ...workspaceFoldersToAdd);

    if (success) {
        const disps = [];
        return new Promise(resolve => {

            // Note: it is not valid to call updateWorkspaceFolders() multiple times
            // without waiting for the onDidChangeWorkspaceFolders() to fire.
            // So we have to always wait in case we want to add or remove multiple folders.
            vscode.workspace.onDidChangeWorkspaceFolders(() => {
                resolve();
            }, null, disps);

        }).finally(() => disps.forEach(disp => disp.dispose()));
    } else {
        return Promise.reject(new Error("Failed to update workspace"));
    }
}

export function updateStatusBarItem(statusBarItem) {

    let znunyData = getZnunyData();

    // Get colorCustomizations configuration.
    let znunyColorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations');
    let config: any = vscode.workspace.getConfiguration('znuny').get('statusBar');

    Object.keys(config).forEach(item => {
        let attributes = config[item];
        Object.keys(attributes).forEach(attribute => {
            let value = attributes[attribute];
            znunyColorCustomizations[item + '.' + attribute] = value;
        });
    });

    if (znunyData.product && znunyData.version && znunyData.source) {
        statusBarItem.text = `${znunyData.product} ${znunyData.version} `;
        statusBarItem.tooltip = `Get data from: \n${znunyData.source} `;
        statusBarItem.color = config.statusBar.foregroundZnuny || '#ffffff';
        statusBarItem.show();

        // Overwrite entire parent setting.
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', znunyColorCustomizations, false);

        return false;
    }
    else {
        statusBarItem.hide();

        // Reset colorCustomizations.
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', {}, false);
        return false;
    }
}

export async function getPackageFileList(path) {

    const files = await glob.sync(path + '/**/*.*');
    let fileList = files.map(file => file.replace(path, '')).filter((file) => file.match(/.*\.(pm|tt|t|xml|js|html\.tmpl)$/ig));

    return fileList;
}

export async function getWorkspaceDirectories() {

    let config: any = vscode.workspace.getConfiguration('znuny').get('addFolderToWorkspace');

    let workspaceDirectories = config.workspaces || [];
    let workspaceDirectory: string[] = [];

    // Get all first level directories from given directories.
    let workspaceDirectoriesPromises = config.recursiveWorkspaces.map(async (myWorkspace: string) => {
        let workspaceDirectory: string[] = [];
        const workspaceDir = await vscode.workspace.fs.readDirectory(vscode.Uri.file(myWorkspace));

        workspaceDir.forEach((dir) => {
            if (dir[1] === vscode.FileType.Directory) {
                workspaceDirectory.push(vscode.Uri.joinPath(vscode.Uri.file(myWorkspace), dir[0]).fsPath);
            }
        });
        return workspaceDirectory;
    });

    let recursiveWorkspaceDirectories = (await Promise.all(workspaceDirectoriesPromises)).flat();
    workspaceDirectories = workspaceDirectories.concat(recursiveWorkspaceDirectories);

    return workspaceDirectories;
}

// get Znuny data from RELEASE or sopm file
export function getZnunyData() {

    let data = {};

    // return if no workspaceFolders is available
    if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length) {
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

        if (!matchingWorkspace || !matchingWorkspace.uri) {
            return data;
        }
        workspace = matchingWorkspace.uri.path;
    }

    let filePath = workspace + '/RELEASE';

    if (fs.existsSync(filePath)) {
        data = release.getData(filePath);
        return data;
    }

    const dir = fs.readdirSync(workspace);
    const files = dir.filter((elm) => elm.match(/.*\.(sopm)/ig));

    if (!files[0]) {
        return data;
    }

    const sopm_name = files[0];
    filePath = workspace + '/' + sopm_name;

    if (fs.existsSync(filePath)) {
        data = sopm.getData(filePath);
        return data;
    }
    return data;
}
