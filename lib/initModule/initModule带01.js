const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserModuleIndependence } = require("./parserModuleDep");
/**
 * 创建文件
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const createCss = function(moduleName, htpagesPath) {
    let cssFolderPath = path.join(htpagesPath, pathJson.frontend.css);
    if (fs.existsSync(path.join(cssFolderPath, moduleName))) {
        throw new Error("模块CSS文件夹已存在");
    }
    const cssModulePath = {
        name: moduleName,
        isFolder: 1,
        level: 0,
        childAry: [{
            name: "Dvpt",
            isFolder: 1,
            level: 1,
            childAry: [{
                name: "img",
                isFolder: 1,
                level: 2,
                childAry: [{ name: "slice", isFolder: 1, level: 3 }]
            }, {
                name: moduleName + ".css",
                isFolder: 0,
                level: 2
            }, {
                name: moduleName + ".min.css",
                isFolder: 0,
                level: 2,
                fileContent: `@import url(${moduleName}.css?__inline);`
            }]
        }]
    };
    let cssPromise = createAllFileByTree(cssFolderPath, cssModulePath);
    return cssPromise;
};

const createModule = function(moduleName, htpagesPath) {
    const moduleFolderPath = path.join(htpagesPath, pathJson.frontend.module);
    if (fs.existsSync(path.join(moduleFolderPath, moduleName))) {
        throw new Error("模块module文件夹已存在");
    }
    const firstUpCaseModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);
    const modulePath = {
        name: moduleName,
        isFolder: 1,
        childAry: [{
            name: "component",
            isFolder: 1,
        }, {
            name: "constant",
            isFolder: 1,
            childAry: [{
                name: `${moduleName}Constant.js`,
                isFolder: 0,
                fileContent: `
oaApp.constant("$${moduleName.toUpperCase()}_CONSTANT", {

});`
            }]
        }, {
            name: "directive",
            isFolder: 1,
        }, {
            name: "filter",
            isFolder: 1,
        }, {
            name: "manager",
            isFolder: 1,
            childAry: [{
                name: "manager01",
                isFolder: 1,
                childAry: [{
                    name: `htNg${firstUpCaseModuleName}01Manager.js`,
                    isFolder: 0,
                    fileContent: `
oaApp.factory("$htNg${firstUpCaseModuleName}01Manager", function($htNgCommManager, $USER_INFO, $TransportService, $${moduleName.toUpperCase()}_CONSTANT, $htNgCommUtil) {
    var factory = {};
                   
    return factory;
});`
                }]
            }]
        }, {
            name: "model",
            isFolder: 1,
        }, {
            name: "service",
            isFolder: 1,
            childAry: [{
                name: `htNg${firstUpCaseModuleName}Util.js`,
                isFolder: 0,
                fileContent: `
oaApp.service("$htNg${firstUpCaseModuleName}Util", function ($htNgCommUtil) {
                    
});`
            }, {
                name: `htNg${firstUpCaseModuleName}LanguageService.js`,
                isFolder: 0,
                fileContent: `
oaApp.service("$htNg${firstUpCaseModuleName}LanguageService", function ($oaNgMultiLanguageTitleService, $q, $oaNgLanguageService) {
    
});`
            }]
        }, {
            name: "view",
            isFolder: 1,
            childAry: [{
                name: `${moduleName}01`,
                isFolder: 1,
                childAry: [{
                    name: `${moduleName}0100`,
                    isFolder: 1,
                    childAry: [ {
                        name: `CN`,
                        isFolder: 1,
                        childAry:[{
                            name: `htNg${firstUpCaseModuleName}0100.html`,
                        isFolder: 0,
                        fileContent: `
<div scroll="no" class="h-all" ng-controller="htNg${firstUpCaseModuleName}0100Ctrl">
    <div ng-include="getShowPageUrl()"></div>
</div>`
                        }]
                    },{
                        name: `htNg${firstUpCaseModuleName}0100Ctrl.js`,
                        isFolder: 0,
                        fileContent: `
oaApp.controller("htNg${firstUpCaseModuleName}0100Ctrl", function($htNgCommManager, $scope, $controller, $timeout,
                                                                $htNg${firstUpCaseModuleName}01Manager, $htNgCommUtil, $alertService, $COMM_CONSTANT, $${moduleName.toUpperCase()}_CONSTANT,
                                                                $stateParams, $htNg${firstUpCaseModuleName}LanguageService, $htNg${firstUpCaseModuleName}Util) {
    // 继承父controller
    angular.extend(this, $controller('htNg00ParentCtrl', { $scope: $scope }));
                        
    $scope.${moduleName}01Model = {};
    // 初始化模块的页签
    $scope.initTabCtrlForModule("${moduleName}", get${firstUpCaseModuleName}CommViewPath() + "/${moduleName}01/");
    //重置全模块的css
    $htNgCommUtil.resetModuleCss();
    // 加载该模块的css
    $htNgCommUtil.loadModuleCss("${moduleName}");
    /***
     * 左菜单的点击方法
     */
    $scope.$on('leftMenuClick', function(event, data) {
        var mark = data.mark;
        var skipPath = data.skipPath;
        var name = data.name;
        $scope.switchListByFunctionId(mark, skipPath, name);
    });
                        
    $scope.switchListByFunctionId = function(mark, path, name) {
        $scope.jumpTo${firstUpCaseModuleName}Setting(path, name);
        $scope.lastMark = mark;
    };

    /**
     * @param path
     * @param pageTitle
     */
    $scope.jumpTo${firstUpCaseModuleName}Setting = function(path, pageTitle) {
        $scope.${moduleName}01Model.showCurrentPath = "";
        $timeout(function() {
            $scope.${moduleName}01Model.showCurrentPath = get${firstUpCaseModuleName}CommViewPath() + "/${moduleName}01/" + path;
            $scope.tabPageTitle = pageTitle;
        }, 10);
    };
                        
    var historyStack = [];

    /**
     * 跳转页面
     */
    $scope.changePageType = function(path, pageTitle, lastPageIndex) {
        $timeout(function() {
            var lastPageModal = {};
            lastPageModal.lastPageIndex = $scope.lastPageIndex;
            lastPageModal.currentShowTabFlg = $scope.currentShowTabFlg;
            lastPageModal.showCurentPath = $scope.${moduleName}01Model.showCurentPath;
            lastPageModal.tabPageTitle = $scope.tabPageTitle;
                        
            $scope.lastPageIndex = lastPageIndex;
            $scope.currentShowTabFlg = true;
            $scope.${moduleName}01Model.showCurentPath = get${firstUpCaseModuleName}CommViewPath() + "/${moduleName}01/" + path;
            $scope.tabPageTitle = pageTitle;
                        
            historyStack.push(lastPageModal);
        }, 10);
    };
                        
                        
    /**
     * 返回
     */
    $scope.goBackToList = function() {
        var lastPageModal = historyStack.pop();
        $scope.lastPageIndex = lastPageModal.lastPageIndex;
        $scope.currentShowTabFlg = lastPageModal.currentShowTabFlg;
        $scope.${moduleName}01Model.showCurentPath = lastPageModal.showCurentPath;
        $scope.tabPageTitle = lastPageModal.tabPageTitle;
    };
                        
    $scope.getShowPageUrl = function() {
        //暂时直接跳转0101，如果需要页签等其他类型标题头，请修改此处。
        // switch (currentShowListType) {
        //     //case "":
        //     default:
        return get${firstUpCaseModuleName}CommViewPath() + "/${moduleName}01/${moduleName}0101/htNg${firstUpCaseModuleName}0101.html?" + versionToken;
        // }
   };
                        
    /***
     * 为页面准备多语言
     */
    var initLeftLanguageCall = function(langModel) {

        $scope.${moduleName}01CommLangObj = langModel;
    
        var menu;
        if ($stateParams.menuModel && $stateParams.menuModel.openType == "router") { // 当前的模块
            // menu = $scope.getFunctionMenuModelByMark("DEFAULT_VIEW");
            // if (menu) {
            //     $scope.resetSelectState();
            //     menu.$$selectedFlg = true;
            //     $scope.switchListByFunctionId(menu.mark, menu.path, menu.menuName);
            // }
        } else {
            if ($stateParams.menuModel) {

            }
            $scope.switchListByFunctionId($stateParams.menuModel.mark, $stateParams.menuModel.path, $stateParams.menuModel.menuName);
        }
    };
    initLeftLanguageCall({});
});`
                    }]
                }, {
                    name: `${moduleName}0101`,
                    isFolder: 1,
                    childAry: [{
                        name: `CN`,
                        isFolder: 1,
                        childAry:[{
                            name: `htNg${firstUpCaseModuleName}0101.html`,
                            isFolder: 0,
                            fileContent: `
    <div ng-controller="htNg${firstUpCaseModuleName}0101Ctrl">
        <div class="comm_page_head_title_style">
            <!--标题部分-->
            <div class="comm_page_head_Icon font20 comm_page_head_Icon_size ht-DUTY-manage"></div>
            <div ng-bind="tabPageTitle" style="line-height: 38px" ></div>
        </div>          
        <div class="comm_list_bottom_div" ng-style="getNoTabPageMainContentHeight()">
            <div  ng-include="${moduleName}01Model.showCurrentPath"></div>
        </div>
    </div>`
                        }]
                       
                    }, {
                        name: `htNg${firstUpCaseModuleName}0101Ctrl.js`,
                        isFolder: 0,
                        fileContent: `
oaApp.controller('htNg${firstUpCaseModuleName}0101Ctrl', function ($scope) {
});`
                    }]
                }, {
                    name: "main",
                    isFolder: 1,
                    level: 3,
                    childAry: [{
                        name: `${moduleName}01Js.path.js`,
                        isFolder: 0,
                        level: 2,
                        fileContent: `
var ${moduleName}01JsPathArray = [];
if (debugFlg == 1) {
    ${moduleName}01JsPathArray = [
        NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/constant/${moduleName}Constant.js",

        NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/manager/manager01/htNg${firstUpCaseModuleName}01Manager.js",

        NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/service/htNg${firstUpCaseModuleName}Util.js",
        NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/service/htNg${firstUpCaseModuleName}LanguageService.js",
                        
        NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/view/${moduleName}01/${moduleName}0100/htNg${firstUpCaseModuleName}0100Ctrl.js",
        NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/view/${moduleName}01/${moduleName}0101/htNg${firstUpCaseModuleName}0101Ctrl.js"
        ];
} else {
    ${moduleName}01JsPathArray = [NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/js/${moduleName}Comm.min.js?" + versionToken];
}`
                    }]
                }]
            }]
        }]
    };
    let cssPromise = createAllFileByTree(moduleFolderPath, modulePath);
    return cssPromise;
};

/**
 * 初始化模块
 * @param {String} moduleName 
 * @param {String} htpagesPath 
 */
const initAllModule = function(moduleName = "") {
    if (moduleName === "") {
        throw new TypeError("模块名称不能为空");
    }
    if (typeof moduleName !== "string") {
        throw new TypeError("模块名称必须为有效字符串格式");
    }

    let htpagesPath = initHtpagesPath();
    let cssPromise = createCss(moduleName, htpagesPath);
    let modulePromise = createModule(moduleName, htpagesPath);
    let parserPromise = parserModuleIndependence(moduleName, htpagesPath);
    return Promise.all([cssPromise, modulePromise, parserPromise]);
};

module.exports.initAllModule = initAllModule;
// module.exports.initCss = initCss;
// module.exports.initModule = initModule;