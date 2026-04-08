import * as vscode from 'vscode';

const COMPANION_EXTENSIONS: ReadonlyArray<{ readonly id: string; readonly label: string }> = [
    { id: 'dennykorsukewitz.QuoteWithMarker', label: 'Quote With Marker' },
    { id: 'dennykorsukewitz.AddFolderToWorkspace', label: 'Add Folder To Workspace' },
];

const STORAGE_PREFERENCES = 'znuny.companionExtensions.preferences';

// 7 days
const REMIND_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

type CompanionPreference = {
    neverAsk?: boolean;
    laterUntil?: number;
};

type CompanionPreferencesMap = Record<string, CompanionPreference>;

function getPreferences(context: vscode.ExtensionContext): CompanionPreferencesMap {
    return context.globalState.get<CompanionPreferencesMap>(STORAGE_PREFERENCES) ?? {};
}

async function setPreference(
    context: vscode.ExtensionContext,
    extensionId: string,
    patch: CompanionPreference,
): Promise<void> {
    const all = { ...getPreferences(context) };
    all[extensionId] = { ...all[extensionId], ...patch };
    await context.globalState.update(STORAGE_PREFERENCES, all);
}

export function registerCompanionExtensions(context: vscode.ExtensionContext) {
    void promptMissingCompanions(context);
}

async function promptMissingCompanions(context: vscode.ExtensionContext) {
    for (const companion of COMPANION_EXTENSIONS) {
        if (vscode.extensions.getExtension(companion.id)) {
            continue;
        }

        const prefs = getPreferences(context)[companion.id];
        if (prefs?.neverAsk) {
            continue;
        }
        if (prefs?.laterUntil !== undefined && prefs.laterUntil > Date.now()) {
            continue;
        }

        const choice = await vscode.window.showInformationMessage(
            `Znuny: Optional companion "${companion.label}" is not installed. Install it for related workflow features?`,
            'Install',
            'Later',
            "Don't ask again",
        );

        if (choice === "Don't ask again") {
            await setPreference(context, companion.id, {
                neverAsk: true,
                laterUntil: undefined,
            });
            continue;
        }

        if (choice === 'Later') {
            await setPreference(context, companion.id, {
                laterUntil: Date.now() + REMIND_AFTER_MS,
            });
            continue;
        }

        if (choice === 'Install') {
            await vscode.commands.executeCommand('workbench.extensions.installExtension', companion.id);
            await setPreference(context, companion.id, {
                laterUntil: undefined,
            });
        }
    }
}
