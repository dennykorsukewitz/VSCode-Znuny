const fs    = require('fs');
const xpath = require('xpath');

// Get Znuny data from SOPM file
function getData(filePath) {

    let data           = {};
    let sopmStructure = getStructure(filePath);
    data['product']    = sopmStructure['Vendor'];
    data['source']     = filePath;

    if (sopmStructure['Framework']){
        // use highest framework version
        const sortedarr = sopmStructure['Framework'].map(ele => ele && ele.toUpperCase()).sort() ;
        data['version'] = sortedarr[sortedarr.length -1];
    }

    return data;
}

function getStructure(filePath) {

    let sopmStructure = {};

    // Load SOPM structure
    const xmldom = require('xmldom').DOMParser;
    const xml    = fs.readFileSync(filePath, 'utf8');
    const dom    = new xmldom().parseFromString(xml);

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

    singleTags.forEach(tag => {
        const nodes = xpath.select('//' + tag, dom);

        if (!nodes[0] || !nodes[0].firstChild || !nodes[0].firstChild.data) {
            return;
        }

        const key = tag;
        const value = nodes[0].firstChild.data;
        sopmStructure[key] = value;
    });

    const multipleTags = [
        'Framework',

        // version name
        'PackageRequired',

        // version name
        'ModuleRequired',
        'Description',
        'IntroInstall',
    ];

    multipleTags.forEach(tag => {
        const nodes         = xpath.select('//' + tag, dom);
        const key           = tag;
        sopmStructure[key] = [];

        nodes.forEach(node => {
            if (!node || !node.firstChild || !node.firstChild.data) {
                return;
            }
            const value = node.firstChild.data;
            sopmStructure[key].push(value);
        });
    });

    return sopmStructure;
}

module.exports = {
    getData,
    getStructure,
}
