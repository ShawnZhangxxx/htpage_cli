const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserPorIndependence } = require("./parserPorDep");
/**
 * 创建文件
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const createCss = function(moduleName,componentName, htpagesPath) {
    let cssFolderPath = path.join(htpagesPath, pathJson.frontend.porcss);
    if (fs.existsSync(path.join(cssFolderPath, moduleName))) {
        throw new Error("模块CSS文件夹已存在");
    }
    const cssPorPath = {
        name: `htNgPtPor${componentName}.css`,
        isFolder: 0,
        level: 0,
    };
    let cssPromise = createAllFileByTree(cssFolderPath, cssPorPath);
    return cssPromise;
};
const createCss_M = function(moduleName,componentName, htpagesPath) {
    let cssFolderPath = path.join(htpagesPath, pathJson.frontend.porcss);
    if (fs.existsSync(path.join(cssFolderPath, moduleName))) {
        throw new Error("模块CSS文件夹已存在");
    }
    const cssPorPath = {
        name: `htNgPtPor${componentName}_M.css`,
        isFolder: 0,
        level: 0,
    };
    let cssPromise = createAllFileByTree(cssFolderPath, cssPorPath);
    return cssPromise;
};
const createCss_S = function(moduleName, componentName,htpagesPath) {
    let cssFolderPath = path.join(htpagesPath, pathJson.frontend.porcss);
    if (fs.existsSync(path.join(cssFolderPath, moduleName))) {
        throw new Error("模块CSS文件夹已存在");
    }
    const cssPorPath = {
        name: `htNgPtPor${componentName}_S.css`,
        isFolder: 0,
        level: 0,
    };
    let cssPromise = createAllFileByTree(cssFolderPath, cssPorPath);
    return cssPromise;
};



/**
 * 初始化模块
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const createPor = function(moduleName, componentName) {
    // if (moduleName === "") {
    //     throw new TypeError("模块名称不能为空");
    // }
    // if (typeof moduleName !== "string") {
    //     throw new TypeError("模块名称必须为有效字符串格式");
    // }
    
    let firstComponentName = componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
    //let componentChildPath = `${componentName}/htNgPt${firstModuleName}${firstComponentName}.js`;

    //return Promise.all([createPromise, parserPromise]);

    let htpagesPath = initHtpagesPath();
    let cssPromise = createCss(moduleName,componentName, htpagesPath);
    let css_M_Promise = createCss_M(moduleName,componentName, htpagesPath);
    let css_S_Promise = createCss_S(moduleName,componentName ,htpagesPath);
    //let modulePromise = createPor(moduleName, htpagesPath);
    let parserPromise = parserPorIndependence(moduleName,componentName, htpagesPath);
    return Promise.all([cssPromise, css_M_Promise, css_S_Promise,parserPromise]);
};

module.exports.createPor = createPor;
// module.exports.initCss = initCss;
// module.exports.initPor = initPor;