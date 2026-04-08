import * as vscode from 'vscode';
import { initCustomizer } from './features/customizer';
import { initInsertFilelist } from './features/insertFilelist';
import { initInsertObjectDependencies } from './features/insertObjectDependencies';
import { initStatusBarItem } from './features/statusBar';

export function activate(context: vscode.ExtensionContext) {
    initCustomizer(context);
    initInsertFilelist(context);
    initInsertObjectDependencies(context);
    initStatusBarItem(context);
}

export function deactivate() {}
