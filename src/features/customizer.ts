import * as vscode from 'vscode';
import { Buffer } from 'buffer';
import fetch from 'node-fetch';
import type {
    GitHubBranchRow,
    GitHubCommitRow,
    GitHubContentBody,
    GitHubJsonError,
    GitHubTreeBody,
} from '../types/github-api';

interface CustomizerConfig {
    informationMessages?: string;
    repositories: string[];
    copyright?: string;
}

export function initCustomizer(context: vscode.ExtensionContext) {
    const customizerId = 'znuny.customizer';
    context.subscriptions.push(
        vscode.commands.registerCommand(customizerId, async () => {
            if (!vscode.workspace.workspaceFolders) {
                vscode.window.showWarningMessage('Znuny: No Workspace Folder is available. Please open a folder before.');
                await vscode.commands.executeCommand('workbench.action.addRootFolder');
                return;
            }
            const config = vscode.workspace.getConfiguration('znuny').get('customizer') as CustomizerConfig | undefined;
            if (!config || !Array.isArray(config.repositories)) {
                vscode.window.showErrorMessage('Znuny - Customizer: Invalid configuration.');
                return;
            }

            if (config.informationMessages !== 'false') {
                vscode.window.showInformationMessage('Znuny - Customizer (1/5): Fetching GitHub repositories.');
            }

            const repository = await vscode.window.showQuickPick(config.repositories, {
                title: 'Znuny - Customizer (1/5)',
                placeHolder: 'Znuny - Customizer: Select GitHub Repositories...',
                canPickMany: false,
            });
            if (!repository) {
                return;
            }

            let url = `https://api.github.com/repos/znuny/${repository}/branches`;
            if (config.informationMessages !== 'false') {
                let message = 'Znuny - Customizer (2/5): Fetching branches.';
                if (config.informationMessages === 'verbose') {
                    message = `Znuny - Customizer (2/5): Fetching branches from "${url}".`;
                }
                vscode.window.showInformationMessage(message);
            }

            let response = await fetch(url);
            const json = (await response.json()) as GitHubJsonError | GitHubBranchRow[];
            const branches: string[] = [];

            if (!Array.isArray(json) && json.message) {
                vscode.window.showErrorMessage(`Znuny - Customizer: ${json.message}.`);
                return;
            }

            if (Array.isArray(json)) {
                json.forEach(function (row: GitHubBranchRow) {
                    if (row.name) {
                        branches.push(row.name);
                    }
                });
            }

            const branch = await vscode.window.showQuickPick(branches.reverse(), {
                title: 'Znuny - Customizer (2/5)',
                placeHolder: 'Znuny - Customizer: Select Branch...',
                canPickMany: false,
            });
            if (!branch) {
                return;
            }

            url = `https://api.github.com/repos/znuny/${repository}/git/trees/${branch}?recursive=1`;

            if (config.informationMessages !== 'false') {
                let message = 'Znuny - Customizer (3/5): Fetching files.';
                if (config.informationMessages === 'verbose') {
                    message = `Znuny - Customizer (3/5): Fetching files from "${url}".`;
                }
                vscode.window.showInformationMessage(message);
            }

            response = await fetch(url);
            const treeBody = (await response.json()) as GitHubTreeBody;
            const files: string[] = [];

            if (treeBody.message) {
                vscode.window.showErrorMessage(`Znuny - Customizer: ${treeBody.message}.`);
                return;
            }

            if (treeBody.tree) {
                treeBody.tree.forEach(function (file) {
                    if (file.type === 'tree') {
                        return;
                    }
                    if (file.path) {
                        files.push(file.path);
                    }
                });
            }

            let file = await vscode.window.showQuickPick(files, {
                title: 'Znuny - Customizer (3/5)',
                placeHolder: 'Znuny - Customizer: Select File...',
                canPickMany: false,
            });
            if (!file) {
                return;
            }
            if (!vscode.workspace.workspaceFolders?.length) {
                return;
            }

            const workspaceFolders: string[] = [];
            vscode.workspace.workspaceFolders.forEach((workspaceFolder) => {
                workspaceFolders.push(workspaceFolder.uri.path);
            });

            if (config.informationMessages !== 'false') {
                vscode.window.showInformationMessage('Znuny - Customizer (4/5): Fetching destination folder.');
            }

            const workspaceFolder = await vscode.window.showQuickPick(workspaceFolders, {
                title: 'Znuny - Customizer (4/5)',
                placeHolder: 'Znuny - Customizer: Select destination folder...',
                canPickMany: false,
            });
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('Znuny - Customizer: No Workspace Folder exists.');
                return;
            }

            url = `https://api.github.com/repos/znuny/${repository}/contents/${file}?ref=${branch}`;

            if (config.informationMessages === 'verbose') {
                vscode.window.showInformationMessage(
                    `Znuny - Customizer: Fetching file data for file: "${file}" from branch: "${branch}" from url: "${url}".`
                );
            }

            response = await fetch(url);
            const contentBody = (await response.json()) as GitHubContentBody;
            if (contentBody.message) {
                vscode.window.showErrorMessage(`Znuny - Customizer: ${contentBody.message}.`);
                return;
            }

            if (!contentBody.content) {
                vscode.window.showErrorMessage('Znuny - Customizer: No file content exists.');
                return;
            }

            if (config.informationMessages === 'verbose') {
                vscode.window.showInformationMessage(`Znuny - Customizer: Decoded file: "${file}" from branch: "${branch}".`);
            }

            let content = Buffer.from(contentBody.content, 'base64').toString('utf-8');
            if (!content) {
                vscode.window.showErrorMessage('Znuny - Customizer: No file content exists.');
                return;
            }

            url = `https://api.github.com/repos/znuny/${repository}/commits?path=${file};sha=${branch}`;

            if (config.informationMessages === 'verbose') {
                vscode.window.showInformationMessage(
                    `Znuny - Customizer: Fetching commits for file: "${file}" from branch: "${branch}" from url: "${url}".`
                );
            }

            response = await fetch(url);
            const commits = (await response.json()) as GitHubCommitRow[] | GitHubJsonError;

            let commentPrefix = '#';
            let commentPrefixRegex = `${commentPrefix}`;

            if (file.endsWith('.js')) {
                commentPrefix = '//';
                commentPrefixRegex = `${commentPrefix}`;
            }

            if (!Array.isArray(commits) || !commits[0]?.sha) {
                vscode.window.showErrorMessage('Znuny - Customizer: Could not resolve latest commit for origin header.');
                return;
            }

            let originBlock = `${commentPrefix} --\n`;
            originBlock += `${commentPrefix} $origin: ${repository} - ${commits[0].sha} - ${file}`;

            let copyrightBlock = '';
            if (config.copyright) {
                copyrightBlock = `${commentPrefix} ${config.copyright}\n`;
            }

            const customizationBlock = `${copyrightBlock}${originBlock}\n`;
            const searchRegex = `(^${commentPrefixRegex}\\s+Copyright\\s[^\\n]+\\sZnuny\\sGmbH[^\\n]+\\n)`;

            const regEx = new RegExp(searchRegex, 'gm');
            content = content.replace(regEx, `$1${customizationBlock}`);

            if (file.endsWith('.pm') || file.endsWith('.dtl') || file.endsWith('.tt')) {
                file = `Custom/${file}`;
            }

            const wsEdit = new vscode.WorkspaceEdit();
            const filePath = vscode.Uri.file(workspaceFolder + '/' + file);

            wsEdit.createFile(filePath, { ignoreIfExists: true });
            wsEdit.insert(filePath, new vscode.Position(0, 0), content);

            await vscode.workspace.applyEdit(wsEdit);
            if (config.informationMessages !== 'false') {
                vscode.window.showInformationMessage(`Znuny - Customizer (5/5): Added file ${filePath.path} `);
            }
        })
    );
}
