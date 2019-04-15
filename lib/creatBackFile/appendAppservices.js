const path = require("path");
const fs = require("fs");
const htoaPathJson = require("../../htoaPath.json");

const appendAppservices = function(serviceKey, servicePath) {
    const appservicesFilePath = path.join(htoaPathJson.winHtoaRoot, htoaPathJson.backend.appserviceProperties);
    let newFileContent = `\r\n${serviceKey}=${servicePath}`;
    return new Promise((resolve, reject) => {
        let ws = fs.createWriteStream(appservicesFilePath, {
            flags: "a+"
        });
        ws.end(newFileContent);
        ws.on("error", (error) => {
            reject(error);
        });
        ws.on("close", () => {
            resolve();
        });
    });
};
exports.appendAppservices = appendAppservices;
