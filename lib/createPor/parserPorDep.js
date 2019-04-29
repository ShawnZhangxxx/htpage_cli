const path = require("path");
const pathJson = require("../../htoaPath.json");
const { getFirstUpCase } = require("../util/stringUtil");
const fs = require("fs");

/**
 * parserPorCssPath
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const parserPorCssPath = function(moduleName,componentName, htpagesPath) {
    const independenceFile = path.join(htpagesPath, pathJson.frontend.porcss,
        "\\importPortalCss.css");
        console.log(independenceFile)
    if (!fs.existsSync(independenceFile)) {
        return Promise.reject("未找到依赖文件");
    };
   // let insertInfo = `\r\n<script src="<%=NG_PATH_HTPAGE_APP_MODULE%>${moduleName}/view/${moduleName}01/main/${moduleName}01Js.path.js?<%=versionToken%>"></script>`;
    let insertInfo = `\r\n@import "htNgPtPor${componentName}.css";`;
    //追加即可
    fs.writeFile(independenceFile, insertInfo, { flag: "a", encoding: "utf8" }, (err) => {
        if (err) {
            return Promise.reject(err);
        } else {
            console.log("parserPorCssPathresolve");
            return Promise.resolve();
        }
    });
}
/**
 * parserPorCssPath
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const parserPorCss_M_Path = function(moduleName,componentName, htpagesPath) {
    const independenceFile = path.join(htpagesPath, pathJson.frontend.porcss,
        "\\importPortalCss_M.css");
    if (!fs.existsSync(independenceFile)) {
        return Promise.reject("未找到依赖文件");
    };
    let insertInfo = `\r\n@import "htNgPtPor${componentName}_M.css";`;
    //追加即可
    fs.writeFile(independenceFile, insertInfo, { flag: "a", encoding: "utf8" }, (err) => {
        if (err) {
            return Promise.reject(err);
        } else {
            return Promise.resolve();
        }
    });
}
/**
 * parserPorCssPath
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const parserPorCss_S_Path = function(moduleName,componentName, htpagesPath) {
    const independenceFile = path.join(htpagesPath, pathJson.frontend.porcss,
        "\\importPortalCss_S.css");
    if (!fs.existsSync(independenceFile)) {
        return Promise.reject("未找到依赖文件");
    };
   // let insertInfo = `\r\n<script src="<%=NG_PATH_HTPAGE_APP_MODULE%>${moduleName}/view/${moduleName}01/main/${moduleName}01Js.path.js?<%=versionToken%>"></script>`;
    let insertInfo = `\r\n@import "htNgPtPor${componentName}_S.css";`;
    //追加即可
    fs.writeFile(independenceFile, insertInfo, { flag: "a", encoding: "utf8" }, (err) => {
        if (err) {
            return Promise.reject(err);
        } else {
            return Promise.resolve();
        }
    });
}

/**
 * 处理模块依赖
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
module.exports.parserPorIndependence = function parserPorIndependence(moduleName, componentName,htpagesPath) {
    let promise1 = parserPorCssPath(moduleName, componentName,htpagesPath);
    let promise2 = parserPorCss_M_Path(moduleName,componentName, htpagesPath);
    let promise3 = parserPorCss_S_Path(moduleName,componentName, htpagesPath);
    return Promise.all([promise1, promise2, promise3]);
}