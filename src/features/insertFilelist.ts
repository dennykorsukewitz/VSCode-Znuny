import * as vscode from 'vscode';
import * as helper from '../utils/helper';

interface InsertFilelistConfig {
    mode?: string;
}

export function initInsertFilelist(context: vscode.ExtensionContext) {
    const commandId = 'znuny.insertFilelist';
    context.subscriptions.push(
        vscode.commands.registerCommand(commandId, async () => {
            const activeEditor = vscode.window.activeTextEditor;

            if (!activeEditor) {
                return;
            }
            if (!activeEditor.document.fileName.endsWith('.sopm')) {
                return;
            }

            const config = vscode.workspace.getConfiguration('znuny').get('insertFilelist') as InsertFilelistConfig | undefined;

            const fileName = activeEditor.document.fileName;
            const workspace = fileName.substring(0, fileName.lastIndexOf('/') + 1);
            const filesList = await helper.getFileList(workspace);

            let fileListTemplate = '';
            if (config?.mode === 'Filelist') {
                fileListTemplate = '    <Filelist>\n';
            }

            filesList.sort((a, b) => a.localeCompare(b)).forEach(function (file, i) {
                let permission = '660';
                if (
                    (file.startsWith('scripts/') || file.startsWith('bin/') || file.endsWith('.sh') || file.endsWith('.pl')) &&
                    !file.endsWith('.t')
                ) {
                    permission = '770';
                }

                fileListTemplate += `        <File Permission="${permission}" Location="${file}"/>`;

                if (filesList.length - 1 !== i) {
                    fileListTemplate += `\n`;
                }
            });

            if (config?.mode === 'Filelist') {
                fileListTemplate += '\n    </Filelist>';
            }

            await activeEditor.edit((editBuilder) => {
                editBuilder.insert(activeEditor.selection.active, fileListTemplate);
            });
        })
    );
}
