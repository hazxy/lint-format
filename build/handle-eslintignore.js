const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");

const execSync = (cmd) => childProcess.execSync(cmd).toString().trim();

let more = true;
let fileList = [];

const root = path.resolve(__dirname, "../");
const eslintIgnoreFiles = path.resolve(root, ".eslintignore_files");
fs.writeFileSync(eslintIgnoreFiles, "");

// 如果项目不大，可以不用while的循环处理
while (more) {
  const output = execSync(
    "eslint --ignore-path .eslintignore_files --format build/eslint-formatter.js --ext .vue,.js,.jsx,.ts,.tsx src/"
  );
  const filesCheckedOut = output.match(/(?<=")[^,]*?(?=")/g) || [];
  if (filesCheckedOut.length === 0) {
    more = false;
    break;
  }
  fileList = fileList.concat(filesCheckedOut);
  fileList = [...new Set(fileList)];
  let result = "";
  if (fileList.length) {
    result += fileList.join("\n");
    result += "\n";
  }
  fs.writeFileSync(eslintIgnoreFiles, result);
}

console.log(`一共有${fileList.length}个文件至.eslintignore_files`);
