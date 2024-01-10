const path = require("path");

module.exports = function (result = []) {
  const items = [];
  const root = path.resolve(__dirname, "../");
  result.forEach((item) => {
    // 是只需要error相关的还是也需要warning相关的, 看取舍
    if (item.warningCount || item.errorCount) {
      items.push(item);
    }
  });
  console.log(`--------本次检出异常文件${items.length}个--------`);
  const fileList = items.map((file) =>
    path.resolve(file.filePath).replace(root, "").replace(/(\\)/g, "/")
  );
  console.log(JSON.stringify(fileList));
  console.log("---------------end----------------------------");
  process.exit(0);
};
