const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserSql");

const initComponent = function(moduleName, componentName, htpagesPath) {
    let moduleFolderPath = path.join(htpagesPath, pathJson.frontend.module, moduleName);
    // console.log(moduleFolderPath);
    let firstComponentName = componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);

    const componentFileTree = {
        name: `菜单`.sql,
        isFolder: 1,
        childAry: [{
            name: `SQL`,
            fileContent:`
                aaaaa
            `        
        }]
    };  

    let componentPath = path.join(moduleFolderPath, "component");

    let compontentFolderPath = path.join(componentPath, componentName);


    let cssPromise = createAllFileByTree(componentPath, componentFileTree);
    return cssPromise;
};

const createSql = function(moduleName, componentName) {
    if (moduleName === "" || typeof moduleName !== "string") {
        throw new TypeError("模块名称不能为空");
    }
    if (typeof moduleName !== "string") {
        throw new TypeError("模块名称必须为有效字符串格式");
    }
    if (componentName === "") {
        throw new TypeError("模块组件名称不能为空");
    }
    if (typeof componentName !== "string") {
        throw new TypeError("模块组件名称必须为有效字符串格式");
    }
    let htpagesPath = initHtpagesPath();

    let firstComponentName = componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
    let componentChildPath = `${componentName}/htNgPt${firstModuleName}${firstComponentName}.js`;

    let createPromise = initComponent(moduleName, componentName, htpagesPath);
    let parserPromise = parserIndependence(moduleName, componentChildPath, htpagesPath);
    return Promise.all([createPromise, parserPromise]);
};

module.exports.createSql = createSql;