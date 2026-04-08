import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Znuny extension test suite', function () {
    vscode.window.showInformationMessage('Start all Znuny tests.');

    test('Extension is installed for this test run', () => {
        const ext = vscode.extensions.all.find((e: vscode.Extension<unknown>) => e.packageJSON.name === 'znuny');
        assert.ok(ext, 'Expected znuny extension in development host');
    });

    test('Extension activates without throwing', async () => {
        const ext = vscode.extensions.all.find((e: vscode.Extension<unknown>) => e.packageJSON.name === 'znuny');
        assert.ok(ext);
        await ext.activate();
    });

    test('Core commands are registered after activation', async () => {
        const ext = vscode.extensions.all.find((e: vscode.Extension<unknown>) => e.packageJSON.name === 'znuny');
        assert.ok(ext);
        await ext.activate();

        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('znuny.customizer'));
        assert.ok(commands.includes('znuny.insertFilelist'));
        assert.ok(commands.includes('znuny.insertObjectDependencies'));
        assert.ok(commands.includes('znuny.showZnunyVersion'));
    });

    test('znuny workspace configuration is readable', async () => {
        const ext = vscode.extensions.all.find((e: vscode.Extension<unknown>) => e.packageJSON.name === 'znuny');
        assert.ok(ext);
        await ext.activate();

        const cfg = vscode.workspace.getConfiguration('znuny');
        const insertMode = cfg.get<string>('insertFilelist.mode') ?? 'File';
        assert.ok(insertMode === 'File' || insertMode === 'Filelist');
    });
});
