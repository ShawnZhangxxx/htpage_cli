const path = require("path");
const pathJson = require("../../htoaPath.json");
const { getFirstUpCase } = require("../util/stringUtil");
const fs = require("fs");

/**
 * 处理PathConstant文件的依赖
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const parserPathConstant = function(moduleName, htpagesPath) {
    let firstUpModule = getFirstUpCase(moduleName);
    const independenceFile = path.join(htpagesPath, pathJson.frontend.module,
        "comm\\constant\\pathConstant.js");

    if (!fs.existsSync(independenceFile)) {
        return Promise.reject("未找到依赖文件");
    }

    let insertInfo = `
function get${firstUpModule}CommViewPath() {
    return (localhostPath + NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/view");
}
function get${firstUpModule}ComponentPath() {
    return (localhostPath + NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/component");
}`;

    //追加即可
    fs.writeFile(independenceFile, insertInfo, { flag: "a", encoding: "utf8" }, (err) => {
        if (err) {
            return Promise.reject(err);
        } else {
            console.log("parserPathConstant resolve");
            return Promise.resolve();
        }
    });
}

/**
 * 处理PathConstant文件的依赖
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const parserRouter = function(moduleName, htpagesPath) {
    let firstUpCaseModuleName = getFirstUpCase(moduleName);
    const independenceFile = path.join(htpagesPath, pathJson.frontend.module,
        "comm\\view\\htNgComm.router.js");
    if (!fs.existsSync(independenceFile)) {
        return Promise.reject("未找到依赖文件");
    };
    let insertInfo = `
            .state("htNg${firstUpCaseModuleName}0100", {//
                url: "/htNg${firstUpCaseModuleName}0100",
                params: {menuModel: null},
                templateUrl: get${firstUpCaseModuleName}CommViewPath() + "/${moduleName}01/${moduleName}0100/htNg${firstUpCaseModuleName}0100.html?" + versionToken,
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([${moduleName}01JsPathArray]);
                    }]
                }
            })`;

    return new Promise((resolve, reject) => {

        let readStream = fs.createReadStream(independenceFile, { encoding: "utf8" });
        let str = "";
        readStream.on("data", function(data) {
            str += data;
        });
        readStream.on("close", () => {
            if (insertInfo === "") {
                reject("router.js配置文件路径有误");
            }

            let insertIndex = str.lastIndexOf("}");

            let leftStr = str.slice(0, insertIndex);

            let right = str.slice(insertIndex);

            leftStr = leftStr + insertInfo + "\n";

            fs.writeFile(independenceFile, leftStr + right, (err) => {
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
}

/**
 * 处理PathConstant文件的依赖
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const parserModuleJSPath = function(moduleName, htpagesPath) {
    const independenceFile = path.join(htpagesPath, pathJson.frontend.module,
        "portal\\view\\moduleJSPath.jsp");
    if (!fs.existsSync(independenceFile)) {
        return Promise.reject("未找到依赖文件");
    };
    let insertInfo = `\r\n<script src="<%=NG_PATH_HTPAGE_APP_MODULE%>${moduleName}/view/${moduleName}01/main/${moduleName}01Js.path.js?<%=versionToken%>"></script>`;
    //追加即可
    fs.writeFile(independenceFile, insertInfo, { flag: "a", encoding: "utf8" }, (err) => {
        if (err) {
            return Promise.reject(err);
        } else {
            console.log("parserModuleJSPathresolve");
            return Promise.resolve();
        }
    });
}

/**
 * 处理PathConstant文件的依赖
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const parserPortalParentCtrl = function(moduleName, htpagesPath) {
    const independenceFile = path.join(htpagesPath, pathJson.frontend.module,
        "portal\\view\\htNgPortalParentCtrl.js");
    if (!fs.existsSync(independenceFile)) {
        return Promise.reject("未找到依赖文件");
    };
    let insertInfo = `
            ,${moduleName}01JsPathArray`;

    return new Promise((resolve, reject) => {
        let readStream = fs.createReadStream(independenceFile, { encoding: "utf8" });
        let str = "";
        readStream.on("data", function(data) {
            str += data;
        });
        readStream.on("close", () => {
            if (insertInfo === "") {
                reject("PortalParentCtrl.js配置文件路径有误");
            }

            let tempIndex = str.indexOf("allJsArray");

            let tempRight = str.slice(tempIndex);


            let insertIndex = tempRight.indexOf("]");

            let leftStr = str.slice(0, insertIndex + tempIndex);
            let right = str.slice(insertIndex + tempIndex);
            if (leftStr.trimRight().endsWith(",")) {
                leftStr = leftStr.slice(0, -1) + insertInfo;
            } else {
                leftStr = leftStr + insertInfo;
            }

            fs.writeFile(independenceFile, leftStr + right, (err) => {
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


}

/**
 * 处理模块依赖
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
module.exports.parserModuleIndependence = function parserModuleIndependence(moduleName, htpagesPath) {
    let promise1 = parserPathConstant(moduleName, htpagesPath);
    let promise2 = parserRouter(moduleName, htpagesPath);
    let promise3 = parserModuleJSPath(moduleName, htpagesPath);
    let promise4 = parserPortalParentCtrl(moduleName, htpagesPath);
    return Promise.all([promise1, promise2, promise3, promise4]);
}