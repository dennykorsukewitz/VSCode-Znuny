import * as vscode from 'vscode';
import { registerCompanionExtensions } from './companionExtensions';
import { initCustomizer } from './features/customizer';
import { initInsertFilelist } from './features/insertFilelist';
import { initInsertObjectDependencies } from './features/insertObjectDependencies';
import { initStatusBarItem } from './features/statusBar';

export function activate(context: vscode.ExtensionContext) {
    registerCompanionExtensions(context);
    initCustomizer(context);
    initInsertFilelist(context);
    initInsertObjectDependencies(context);
    initStatusBarItem(context);
}

export function deactivate() {}
