const fs = require("fs");
/**
 * 配置JS.main.js
 * @param {*} filePath 
 * @param {*} inserStr 
 */
exports.parserFile = function(filePath = "", inserStr = "") {

    return new Promise((resolve, reject) => {
        let readStream = fs.createReadStream(filePath, { encoding: "utf8" });
        let str = "";
        readStream.on("data", function(data) {
            str += data;
        });
        readStream.on("close", () => {
            if (inserStr === "") {
                return str;
            }
            let tempIndex = str.indexOf("debugFlg");
            if (tempIndex === -1) {
                reject("未找到debugFlg标识，配置文件有误");
            }
            let tempRight = str.slice(tempIndex);
            let insertIndex = tempRight.indexOf("]");

            let leftStr = str.slice(0, insertIndex + tempIndex);
            let right = str.slice(insertIndex + tempIndex);

            if (leftStr.trimRight().endsWith(",")) {
                leftStr = leftStr + "\n" + inserStr;
            } else {
                leftStr = leftStr + "\n," + inserStr;
            }
            fs.writeFile(filePath, leftStr + right, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        readStream.on("error", (e) => {
            reject(e);
        });
    });
};