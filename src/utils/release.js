const fs    = require('fs');

// Get Znuny data from RELEASE file
function getData(filePath) {

    let data = {};
    const releaseContent = fs.readFileSync(filePath, 'utf8');

    // PRODUCT = Znuny\nVERSION = 6.4.x\n
    let productResult = releaseContent.match(/^PRODUCT\s*=\s*(.*)\n/);
    let versionResult = releaseContent.match(/VERSION\s*=\s*(.*)\\?/);
    if (productResult[1]){
        data['product'] = productResult[1];
    }
    if (versionResult[1]){
        data['version'] = versionResult[1];
    }
    data['source'] = filePath;

    return data;
}

module.exports = {
    getData,
}
