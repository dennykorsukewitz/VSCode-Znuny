import * as fs from 'fs';
import * as xpath from 'xpath';
import { DOMParser } from 'xmldom';

export interface SopmData {
    product?: string;
    version?: string;
    source?: string;
}

interface SopmStructure {
    [key: string]: string | string[] | undefined;
}

// get Znuny data from SOPM file
export function getData(filePath: string): SopmData {
    const data: SopmData = {};
    const sopmStructure = getStructure(filePath);
    const vendor = sopmStructure['Vendor'];
    data.product = typeof vendor === 'string' ? vendor : undefined;
    data.source = filePath;

    const frameworks = sopmStructure['Framework'];
    if (Array.isArray(frameworks) && frameworks.length) {
        const sorted = frameworks.map((ele) => (ele ? String(ele).toUpperCase() : '')).sort();
        data.version = sorted[sorted.length - 1];
    }

    return data;
}

function getStructure(filePath: string): SopmStructure {
    const sopmStructure: SopmStructure = {};
    const xml = fs.readFileSync(filePath, 'utf8');
    const dom = new DOMParser().parseFromString(xml, 'text/xml');

    const singleTags = [
        'Name',
        'Version',
        'Vendor',
        'License',
        'URL',
        'PackageIsVisible',
        'PackageIsDownloadable',
        'PackageIsRemovable',
    ];

    singleTags.forEach((tag) => {
        const nodes = xpath.select('//' + tag, dom) as unknown[];
        const first = nodes[0] as { firstChild?: { data?: string } } | undefined;
        if (!first?.firstChild?.data) {
            return;
        }
        sopmStructure[tag] = first.firstChild.data;
    });

    const multipleTags = [
        'Framework',
        'PackageRequired',
        'ModuleRequired',
        'Description',
        'IntroInstall',
    ];

    multipleTags.forEach((tag) => {
        const nodes = xpath.select('//' + tag, dom) as unknown[];
        sopmStructure[tag] = [];
        const list = sopmStructure[tag] as string[];
        nodes.forEach((node) => {
            const n = node as { firstChild?: { data?: string } };
            if (!n?.firstChild?.data) {
                return;
            }
            list.push(n.firstChild.data);
        });
    });

    return sopmStructure;
}
