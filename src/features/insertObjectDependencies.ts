import * as vscode from 'vscode';

export function initInsertObjectDependencies(context: vscode.ExtensionContext) {
    const commandId = 'znuny.insertObjectDependencies';
    context.subscriptions.push(
        vscode.commands.registerCommand(commandId, () => {
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor) {
                return;
            }

            const text = activeEditor.document.getText();
            if (!text) {
                return;
            }

            const languageId = activeEditor.document.languageId;
            if (languageId !== 'perl') {
                return;
            }

            const packageNamePattern = /package (.*);/g;
            const packageNameMatches = [...text.matchAll(packageNamePattern)];
            const firstPkg = packageNameMatches[0];
            if (!firstPkg?.[1]) {
                return;
            }
            const packageName = firstPkg[1];

            const objectDependencies: string[] = [];

            const objectDependenciesPattern = /\$Kernel::OM->(?:Get|Create)\(\s*(?:['"])([^'"]+)(?:['"])/g;
            const objectDependenciesMatches = [...text.matchAll(objectDependenciesPattern)];

            let objectDependenciesTemplate = 'our @ObjectDependencies = (\n';
            objectDependenciesMatches.forEach((match) => {
                const object = match[1];
                const exists = objectDependencies.includes(object);

                if (!object || object === packageName || exists) {
                    return;
                }

                objectDependencies.push(match[1]);
            });

            objectDependencies.sort().forEach((object) => {
                objectDependenciesTemplate += `    '${object}',\n`;
            });

            objectDependenciesTemplate += ');';

            activeEditor.edit((editBuilder) => {
                editBuilder.insert(activeEditor.selection.active, objectDependenciesTemplate);
            });
        })
    );
}
