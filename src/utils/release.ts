const fs    = require('fs');

// get Znuny data from RELEASE file
function getData(filePath) {

    let data = {};
    const release_content = fs.readFileSync(filePath, 'utf8');

    // PRODUCT = Znuny\nVERSION = 6.4.x\n
    let product_result = release_content.match(/^PRODUCT\s*=\s*(.*)\n/);
    let version_result = release_content.match(/VERSION\s*=\s*(.*)\\?/);
    if (product_result[1]){
        data['product'] = product_result[1];
    }
    if (version_result[1]){
        data['version'] = version_result[1];
    }
    data['source'] = filePath;

    return data;
}

module.exports = {
    getData,
};
