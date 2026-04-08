import * as fs from 'fs';

export interface ReleaseData {
    product?: string;
    version?: string;
    source?: string;
}

// get Znuny data from RELEASE file
export function getData(filePath: string): ReleaseData {
    const data: ReleaseData = {};
    let releaseContent: string;
    try {
        releaseContent = fs.readFileSync(filePath, 'utf8');
    } catch {
        return data;
    }

    const productResult = releaseContent.match(/^PRODUCT\s*=\s*(.*)\n/);
    const versionResult = releaseContent.match(/VERSION\s*=\s*(.*)\\?/);
    if (productResult?.[1]) {
        data.product = productResult[1];
    }
    if (versionResult?.[1]) {
        data.version = versionResult[1];
    }
    data.source = filePath;

    return data;
}
