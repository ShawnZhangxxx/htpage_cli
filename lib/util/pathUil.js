const path = require("path");
const os = require("os");
const pathJson = require("../../htoaPath.json");

const initHtpagesPath = function(htpagesPath = "") {
    if (htpagesPath === "") {
        let platform = os.platform();
        if (platform === "win32") {
            htpagesPath = path.join(pathJson.winHtoaRoot, pathJson.frontend.htpages);
            // htpagesPath = path.normalize("D:\\htoa\\Tomcat\\webapps\\OAapp\\htpages");
        } else {
            htpagesPath = path.join(pathJson.unixHtoaRoot, pathJson.frontend.htpages);
            // htpagesPath = path.normalize("\\etc\\htoa\\Tomcat\\webapps\\OAapp\\htpages");
        }
    } else if (typeof htpagesPath === "string") {
        htpagesPath = path.normalize(htpagesPath);
    } else if (typeof htpagesPath === "object") {
        htpagesPath = path.format(htpagesPath);
    } else {
        throw new TypeError("路径不合法。");
    }
    return htpagesPath;
};
const initBackEndPath = function(htoaRoot = "") {
    if (htoaRoot === "") {
        let platform = os.platform();
        if (platform === "win32") {
            htoaRoot = path.normalize(pathJson.winHtoaRoot);
            // htpagesPath = path.normalize("D:\\htoa\\Tomcat\\webapps\\OAapp\\htpages");
        } else {
            htoaRoot = path.normalize(pathJson.unixHtoaRoot);
            // htpagesPath = path.normalize("\\etc\\htoa\\Tomcat\\webapps\\OAapp\\htpages");
        }
    } else if (typeof htoaRoot === "string") {
        htoaRoot = path.normalize(htoaRoot);
    } else if (typeof htoaRoot === "object") {
        htoaRoot = path.format(htoaRoot);
    } else {
        throw new TypeError("路径不合法。");
    }
    return htoaRoot;
};
exports.initHtpagesPath = initHtpagesPath;
exports.initBackEndPath = initBackEndPath;