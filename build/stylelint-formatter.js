const path = require('path');

module.exports = function(result = []) {
    const items = [];
    const root = path.resolve(__dirname, '../');
    result.forEach(item => {
        if (item.errored) {
            items.push(item);
        }
    });
    console.log(`--------本次检出异常文件${items.length}个--------`);
    const fileList = items.map(file => path.resolve(file.source).replace(root, '').replace(/(\\)/g, '/'));
    console.log(JSON.stringify(fileList));
    console.log('---------------end----------------------------');
    process.exit(0);
};