const fs    = require('fs');
const xpath = require('xpath');

// get Znuny data from SOPM file
function getData(filePath) {

    let data           = {};
    let sopm_structure = getStructure(filePath);
    data['product']    = sopm_structure['Vendor'];
    data['source']     = filePath;

    if (sopm_structure['Framework']){
        // use highest framework version
        const sortedArray = sopm_structure['Framework'].map(ele => ele && ele.toUpperCase()).sort() ;
        data['version'] = sortedArray[sortedArray.length -1];
    }

    return data;
}

function getStructure(filePath) {

    let sopm_structure = {};

    // load SOPM structure
    const xmldom = require('xmldom').DOMParser;
    const xml    = fs.readFileSync(filePath, 'utf8');
    const dom    = new xmldom().parseFromString(xml);

    const single_tags = [
        'Name',
        'Version',
        'Vendor',
        'License',
        'URL',
        'PackageIsVisible',
        'PackageIsDownloadable',
        'PackageIsRemovable',
    ];

    single_tags.forEach(tag => {
        const nodes = xpath.select('//' + tag, dom);

        if (!nodes[0] || !nodes[0].firstChild || !nodes[0].firstChild.data) {
            return;
        }

        const key = tag;
        const value = nodes[0].firstChild.data;
        sopm_structure[key] = value;
    });

    const multiple_tags = [
        'Framework',

        // version name
        'PackageRequired',

        // version name
        'ModuleRequired',
        'Description',
        'IntroInstall',
    ];

    multiple_tags.forEach(tag => {
        const nodes         = xpath.select('//' + tag, dom);
        const key           = tag;
        sopm_structure[key] = [];

        nodes.forEach(node => {
            if (!node || !node.firstChild || !node.firstChild.data) {
                return;
            }
            const value = node.firstChild.data;
            sopm_structure[key].push(value);
        });
    });

    return sopm_structure;
}

module.exports = {
    getData,
    getStructure,
};
