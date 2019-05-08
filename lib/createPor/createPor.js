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
const initComponent = function(moduleName, componentName, htpagesPath) {
    let moduleFolderPath = path.join(htpagesPath, pathJson.frontend.portal);
    // console.log(moduleFolderPath);

    let firstComponentName = componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);

    const componentFileTree = {
        name: componentName,
        isFolder: 1,
        childAry: [{
            name: `CN`,
                        isFolder: 1,
                        childAry:[{
                            name: `htNgPt${firstModuleName}${firstComponentName}.html`,
                            isFolder: 0,
                            fileContent: `
                            <div class="por_part_div comm_whole_height">
    <iframe src="https://www.baidu.com/" frameborder="0" style="width:100%;height:100%"></iframe>
</div>
               `
                        }]
        }, {
            name: `htNgPtPor${firstComponentName}.js`,
            isFolder: 0,
            fileContent: `
oaApp.directive("htngPorPt${firstComponentName}", function ($htNgPortalManager, $timeout, $htNgPortalUtil, $SCREEN_CONSTANT, $COMM_CONSTANT,
    $htNgPortalLanguageService, $alertService, $filter, $PORTAL_CONSTANT, $htNgCommUtil) {
    return {
        restrict: "EA",
        templateUrl: getPortalFLOWComponentPath() + "/por${componentName}/htNgPtPor${firstComponentName}.html?" + versionToken,
        scope: {
            moreAction: "&",//回调
        },
        replace: true,
        link: function (scope, iEle, attr) {
        /*页面对象*/
        scope.${componentName}Model = {};
                       
        //宽度
        scope.widthPercent = attr.widthPercent ? parseInt(attr.widthPercent) : 15;
        //高度
        scope.heightType = attr.heightType ? parseInt(attr.heightType) : 6;
        $htNgPortalUtil.iniPortalPart(scope.widthPercent, scope.heightType, 'loadUrl', iEle);


        var initLanguageCall = function (langModel) {
            scope.porLanguageInfo = langModel;
            var titleCallback = function (info) {//获取部品显示title
                scope.${componentName}.title = info.moduleName;
            };
            $htNgPortalManager.getTitleName(scope.${componentName}.fileModule, "", titleCallback);
        };
        //$htNgPortalLanguageService.getPortalSystemTagLanguage(initLanguageCall);


        var callback = function (info) {
            scope.${componentName}.dataList = info;
            scope.${componentName}.hasData = $htNgPortalUtil.hasData(info);
        };

        // $timeout(function () {
        //     scope.${componentName}.limitNum = 1;
        //     if (scope.heightType != 0) {
        //         scope.${componentName}.limitNum = $htNgPortalUtil.getRepeatTime($(iEle).height());
        //     }
        //     $htNgPortalManager.fetchWaitKpiTaskList(scope.${componentName}.limitNum, callback);
        // }, 0, false);


        /**
         * 跳到待我考核
         * @param item
         */
        scope.clickList = function (item) {
            if (scope.moreAction) {
                var obj = {
                    pageId: "nkpi0103pt01/htNgNkpi0103pt01.html",
                    pageItem: item.model,
                    pageType: 1
                }
                $htNgCommUtil.homeToPageArguments.push(obj);
                var pageUrl = "/nkpi0103pt01/htNgNkpi0103pt01.html";
                //var  parentLeftMenuTitle = scope.porLanguageInfo.loadUrlCenterLang;
                var parentLeftMenuTitle = '待我考核';
                var parentFunctionId = "FUNCNkpi01";
                var title = '';
                var pathMale = new HiDbMenu().newCompletelyMenu(parentFunctionId, parentLeftMenuTitle, "",
                    pageUrl, 0, "", false, [], "normal", "", "htNgNkpi0100", '', {portalMoreJump: title});
                scope.moreAction({item: pathMale, clickPosFlg: false, refreshLeftMenuFlg: true});
            }
        }
   };
});`
        }]
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
    //let cssPromise = createCss(moduleName,componentName, htpagesPath);
    let createPromise = initComponent(moduleName, componentName, htpagesPath);
    let cssPromise = createCss(moduleName,componentName, htpagesPath);
    let css_M_Promise = createCss_M(moduleName,componentName, htpagesPath);
    let css_S_Promise = createCss_S(moduleName,componentName ,htpagesPath);
    //let modulePromise = createPor(moduleName, htpagesPath);
    let parserPromise = parserPorIndependence(moduleName,componentName, htpagesPath);
    return Promise.all([createPromise,cssPromise, css_M_Promise, css_S_Promise,parserPromise]);
};

module.exports.createPor = createPor;
// module.exports.initCss = initCss;
// module.exports.initPor = initPor;