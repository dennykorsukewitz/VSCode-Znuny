import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import * as sopm from './sopm';
import * as release from './release';

export interface ZnunyData {
    product?: string;
    version?: string;
    source?: string;
}

// get Znuny data from RELEASE or sopm file
export function getZnunyData(): ZnunyData {
    let data: ZnunyData = {};

    if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders.length) {
        return data;
    }

    let workspace = vscode.workspace.workspaceFolders[0].uri.path;

    if (vscode.window.activeTextEditor) {
        const activeEditorPath = vscode.window.activeTextEditor.document.uri.path;
        const matchingWorkspace = vscode.workspace.workspaceFolders.find((wsFolder) => {
            const relative = path.relative(wsFolder.uri.fsPath, activeEditorPath);
            return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
        });

        if (!matchingWorkspace?.uri) {
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
    const files = dir.filter((elm) => elm.match(/.*\.(sopm)/gi));

    if (!files[0]) {
        return data;
    }

    const sopmName = files[0];
    filePath = workspace + '/' + sopmName;

    if (fs.existsSync(filePath)) {
        data = sopm.getData(filePath);
        return data;
    }
    return data;
}

export async function getFileList(workspacePath: string): Promise<string[]> {
    const files = globSync(workspacePath + '/**/*.*');
    const fileList = files
        .map((file: string) => file.replace(workspacePath, ''))
        .filter((file: string) => file.match(/.*\.(pm|pl|tt|t|xml|js|html\.tmpl|png|jpg|svg|gif|ico|yml|yaml)$/gi));

    return fileList;
}
