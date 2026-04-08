import * as vscode from 'vscode';
import * as helper from '../utils/helper';

interface StatusBarNested {
    [attribute: string]: string;
}

interface StatusBarConfig {
    enabled?: string;
    statusBar?: StatusBarNested;
    [key: string]: string | StatusBarNested | undefined;
}

let myStatusBarItem: vscode.StatusBarItem | undefined;

function updateStatusBarItem() {
    const znunyData = helper.getZnunyData();

    const znunyColorCustomizations =
        vscode.workspace.getConfiguration('workbench').get<Record<string, string>>('colorCustomizations') ?? {};
    const config = vscode.workspace.getConfiguration('znuny').get('statusBar') as StatusBarConfig | undefined;

    if (!config) {
        return;
    }

    Object.keys(config).forEach((item) => {
        const attributes = config[item];
        if (typeof attributes !== 'object' || attributes === null) {
            return;
        }
        Object.keys(attributes as StatusBarNested).forEach((attribute) => {
            const nested = attributes as StatusBarNested;
            const value = nested[attribute];
            if (typeof value === 'string') {
                znunyColorCustomizations[item + '.' + attribute] = value;
            }
        });
    });

    if (!myStatusBarItem) {
        return;
    }

    if (znunyData.product && znunyData.version && znunyData.source) {
        myStatusBarItem.text = `${znunyData.product} ${znunyData.version} `;
        myStatusBarItem.tooltip = `Get data from: \n${znunyData.source} `;
        const fg = config.statusBar;
        if (fg && typeof fg === 'object' && 'foregroundZnuny' in fg) {
            myStatusBarItem.color = fg.foregroundZnuny || '#ffffff';
        }
        myStatusBarItem.show();

        void vscode.workspace.getConfiguration('workbench').update('colorCustomizations', znunyColorCustomizations, false);
        return;
    }

    myStatusBarItem.hide();

    void vscode.workspace.getConfiguration('workbench').update('colorCustomizations', {}, false);
}

export function initStatusBarItem(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('znuny').get('statusBar') as StatusBarConfig | undefined;
    const showZnunyVersionId = 'znuny.showZnunyVersion';

    if (config && config.enabled !== 'Off') {
        myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
        myStatusBarItem.command = showZnunyVersionId;
        context.subscriptions.push(myStatusBarItem);
    }

    context.subscriptions.push(
        vscode.commands.registerCommand(showZnunyVersionId, () => {
            if (config && (config.enabled === 'On' || config.enabled === 'OnCommand')) {
                updateStatusBarItem();
            }

            const znunyData = helper.getZnunyData();
            if (!znunyData || !znunyData.source) {
                return;
            }

            void vscode.workspace.openTextDocument(znunyData.source).then((doc) => {
                void vscode.window.showTextDocument(doc);
            });
        })
    );

    if (config && (config.enabled === 'On' || config.enabled === 'OnChangeActiveTextEditor')) {
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));

        updateStatusBarItem();
    }
}
