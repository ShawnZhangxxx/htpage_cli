const path = require("path");
const fs = require("fs");
const htoaPathJson = require("../../htoaPath.json");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const { initBackEndPath } = require("../util/pathUil");
const { appendAppservices } = require("./appendAppservices");

/**
 * 新建manager文件
 * @param {String} moduleName 
 * @param {String} hoaRootPath 
 */
const initManager = function(moduleName, hoaRootPath) {
    let managerFolderPath = path.join(hoaRootPath, htoaPathJson.backend.manager);

    if (fs.existsSync(path.join(managerFolderPath, moduleName))) {
        throw new Error("模块已存在");
    }

    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
    const managerPathTree = {
        name: `ht${moduleName}`,
        isFolder: 1,
        childAry: [{
            name: `ht${moduleName}00`,
            isFolder: 1,
            childAry: [{
                name: `Ht${firstModuleName}00Constant.java`,
                isFolder: 0,
                fileContent: `
package com.oa8000.ht${moduleName}.ht${moduleName}00;

public class Ht${firstModuleName}00Constant {
    
}`
            }]
        }, {
            name: `ht${moduleName}01`,
            isFolder: 1,
            childAry: [{
                name: "manager",
                isFolder: 1,
                childAry: [{
                    name: `Ht${firstModuleName}01Manager.java`,
                    isFolder: 0,
                    fileContent: `
package com.oa8000.ht${moduleName}.ht${moduleName}01.manager;

import com.oa8000.proxy.comm.HiOaMainService;

public class Ht${firstModuleName}01Manager extends HiOaMainService {
                            
}`
                }]
            }]
        }]
    };

    let cssPromise = createAllFileByTree(managerFolderPath, managerPathTree);
    return cssPromise;
};

/**
 * 新建servicer文件
 * @param {String} moduleName 
 * @param {String} hoaRootPath 
 */
const initService = function(moduleName, hoaRootPath) {
    let managerFolderPath = path.join(hoaRootPath, htoaPathJson.backend.service);

    if (fs.existsSync(path.join(managerFolderPath, moduleName))) {
        throw new Error("模块已存在");
    }

    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);

    const servicePath = {
        name: `ht${moduleName}`,
        isFolder: 1,
        childAry: [{
            name: `Ht${firstModuleName}Service.java`,
            isFolder: 0,
            fileContent: `
package com.oa8000.appservice.ht${moduleName};

import com.oa8000.appservice.comm.HtMainService;

public class Ht${firstModuleName}Service extends HtMainService {
                
}`
        }]
    };

    let cssPromise = createAllFileByTree(managerFolderPath, servicePath);
    return {
        "promise": cssPromise,
        "servicePath": `com.oa8000.ht${moduleName}.Ht${firstModuleName}Service`
    };
};

let servicePath;
let serviceKey;

/**
 * 创建后台文件
 * @param {String} moduleName 
 * @param {String} hoaRootPath 
 */
const createBackFile = function(moduleName) {
    if (moduleName === "") {
        throw new TypeError("模块名称不能为空");
    }
    if (typeof moduleName !== "string") {
        throw new TypeError("模块名称必须为有效字符串格式");
    }
    let hoaRootPath = initBackEndPath();
    let managerPromise = initManager(moduleName, hoaRootPath);

    const returnObj = initService(moduleName, hoaRootPath);

    let servicePromise = returnObj.promise;

    // { servicePath, promise: servicePromise } = returnObj;
    let allFilePromise = Promise.all([managerPromise, servicePromise]);
    serviceKey = `${moduleName}Service`;
    servicePath = returnObj.servicePath;
    return allFilePromise;
    // let writePromise = appendAppservices(serviceKey, servicePath);
    // return Promise.all([allFilePromise, writePromise]);
};

/**
 * 追加后台配置文件
 */
const createBackAndAppservicesFile = function() {
    if (serviceKey && servicePath) {
        let key = serviceKey;
        let value = servicePath;
        serviceKey = undefined;
        servicePath = undefined;
        return appendAppservices(key, value);
    } else {
        throw new Error("请先创建后台文件！");
    }

};

module.exports.createBackFile = createBackFile;

module.exports.createBackAndAppservicesFile = createBackAndAppservicesFile;