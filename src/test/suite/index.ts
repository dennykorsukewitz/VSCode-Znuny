import * as path from 'path';

import Mocha from 'mocha';

export function run(): Promise<void> {
    const mocha = new Mocha({ ui: 'tdd', color: true });
    const testsRoot = __dirname;
    mocha.addFile(path.join(testsRoot, 'extension.test.js'));

    return new Promise((resolve, reject) => {
        mocha.run((failures: number) => {
            if (failures > 0) {
                reject(new Error(`${String(failures)} test(s) failed`));
            } else {
                resolve();
            }
        });
    });
}
