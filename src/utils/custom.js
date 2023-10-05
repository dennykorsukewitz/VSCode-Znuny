const fs                 = require('fs');
const { default: fetch } = require('node-fetch');
require('buffer');

// Get Znuny data from Custom file
async function getData(filePath) {

    const customFileContent = fs.readFileSync(filePath, 'utf8');

    const regexp = /\$origin: (.+) - (.+) - (.+)/g;
    let matches  = [...customFileContent.matchAll(regexp)];

    let origin   = matches[0][1];
    let commitid = matches[0][2];
    let file     = matches[0][3];

    let branch   = 'dev'; // todo


    let url = `https://api.github.com/repos/znuny/${origin}/commits?path=${file};sha=${branch}`;

    let response = await fetch(url);
    let commits  = await response.json();

    let latestCommitid = commits[0].sha;

    let data = {
        origin: origin,
        commitid: commitid,
        latestCommitid: latestCommitid,
        file: file,
        branch: branch,
        source: filePath,
    };

    console.log('data');
    console.log(data);

    return data;
}

module.exports = {
    getData,
}
