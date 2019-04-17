const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserSql");

const initComponent = function(moduleName, componentName, htpagesPath) {
    let moduleFolderPath = path.join(htpagesPath, pathJson.frontend.module, moduleName);
    // console.log(moduleFolderPath);
    if (!fs.existsSync(moduleFolderPath)) {
        throw new Error("模块不存在");
    }

    let firstComponentName = componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);

    const componentFileTree = {
        name: moduleName,
        isFolder: 0,
        fileContent: `
        INSERT INTO \`user_functionlist_dict\` VALUES ('1', 'FUNC20009', 'FUNC${firstModuleName}01', 56, '${componentName}', NULL, 2, 'ht-HEAD-hr', '', ' ', 0, '', '', '', '', '{openType:\"router\",router:\"htNg${firstModuleName}0100\"}', 'self', NULL, NULL, NULL, NULL, NULL);
        INSERT INTO \`user_functionlist_dict\` VALUES ('1', 'FUNC${firstModuleName}01', 'FUNC${firstModuleName}01001', 1, '${componentName}', NULL, 2, 'ht-trace06-focus', '', ' ', 0, '', '', '', '', '{openType:\"normal\",path:\"${moduleName}0101/htNg${firstModuleName}0101.html\",router:\"htNg${firstModuleName}0100\",mark:\"${firstModuleName}_APPLY\",linkType:2}', 'self', NULL, NULL, NULL, NULL, NULL);
        INSERT INTO \`user_functionlist_dict\` VALUES ('1', 'FUNC${firstModuleName}01', 'FUNC${firstModuleName}01002', 2, '${componentName}', NULL, 2, 'ht-trace06-focus', NULL, NULL, 0, NULL, NULL, NULL, NULL, '{openType:\"normal\",path:\"${moduleName}0102/htNg${firstModuleName}0102.html\",router:\"htNg${firstModuleName}0100\",mark:\"${firstModuleName}_MY_APPLY\",linkType:2}', 'self', NULL, NULL, NULL, NULL, NULL);
        INSERT INTO \`user_functionlist_dict\` VALUES ('1', 'FUNC${firstModuleName}01', 'FUNC${firstModuleName}01003', 3, '${componentName}', NULL, 2, 'ht-trace06-focus', '', ' ', 0, '', '', '', '', '{openType:\"normal\",path:\"${moduleName}0103/htNg${firstModuleName}0103.html\",router:\"htNg${firstModuleName}0100\",mark:\"${firstModuleName}_HISTORY_TRACE\",linkType:2}', 'self', NULL, NULL, NULL, NULL, NULL);
        INSERT INTO \`user_functionlist_dict\` VALUES ('1', 'FUNC${firstModuleName}01', 'FUNC${firstModuleName}01004', 4, '${componentName}', NULL, 2, 'ht-trace06-focus', '', ' ', 0, '', '', '', '', '{openType:\"normal\",path:\"${moduleName}0104/htNg${firstModuleName}0104.html\",router:\"htNg${firstModuleName}0100\",mark:\"${firstModuleName}_TRACE_ALL\",linkType:2}', 'self', NULL, NULL, NULL, NULL, NULL);
        INSERT INTO \`user_functionlist_dict\` VALUES ('1', 'FUNC${firstModuleName}01', 'FUNC${firstModuleName}01005', 5, '${componentName}', NULL, 2, 'ht-trace06-focus', '', ' ', 0, '', '', '', '', '{openType:\"normal\",path:\"${moduleName}0105/htNg${firstModuleName}0105.html\",router:\"htNg${firstModuleName}0100\",mark:\"${firstModuleName}_LEVEL_MAINTAIN\",linkType:2}', 'self', NULL, NULL, NULL, NULL, NULL);
        INSERT INTO \`user_functionlist_dict\` VALUES ('1', 'FUNC${firstModuleName}01', 'FUNC${firstModuleName}01006', 6, '${componentName}', NULL, 2, 'ht-trace06-focus', '', ' ', 0, '', '', '', '', '{openType:\"normal\",path:\"${moduleName}0106/htNg${firstModuleName}0106.html\",router:\"htNg${firstModuleName}0100\",mark:\"${firstModuleName}_FOUR_LEVEL\",linkType:2}', 'self', NULL, NULL, NULL, NULL, NULL);
        `
    };

    let componentPath = path.join(moduleFolderPath, "component");

    let compontentFolderPath = path.join(componentPath, componentName);
    // console.log(compontentFolderPath);
    if (fs.existsSync(compontentFolderPath)) {
        throw new Error("模块组件已经存在");
    }

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