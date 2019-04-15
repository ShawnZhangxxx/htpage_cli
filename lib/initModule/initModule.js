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
                isFolder: 1,
                level: 2,
                childAry: [{ name: "slice", isFolder: 1, level: 3 }]
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
<div class="comm_page_tab_head_div_frame">
<!--审批页签-->
<htng-tab tab-data-list="tabCtrl.tabPageList"
          current-show-index="tabCtrl.currentShowIndex"
          add-model="tabCtrl.addModel"
          right-width="30" tab-module-name = {{tabPageTitle}} tab-img-name = "ht-PAGE-msg">
</htng-tab>
</div>

<div class="comm_page_bottom_div" ng-style="getPageMainContentHeight()">
<div ng-repeat="data in tabCtrl.tabPageList" ng-include="tabCtrl.getShowPagePath(data)"
     ng-show="tabCtrl.getTabShowIncludeOtherFlg($index)" ng-style="getPageMainContentHeight()">
</div>
</div>
</div>`
                        }]
                    },{
                        name: `htNg${firstUpCaseModuleName}0100Ctrl.js`,
                        isFolder: 0,
                        fileContent: `
oaApp.controller("htNg${firstUpCaseModuleName}0100Ctrl", function($stateParams,$htNgCommManager, $scope, $TransportService, $timeout,
    $controller, $COMM_CONSTANT,$htNgCommUtil) {
        // 继承父controller
        angular.extend(this, $controller('htNg00ParentCtrl', {$scope: $scope}));
        /*父页面数据对象*/
        $scope.${moduleName}01Model = {};
        // 将页签控制器对象赋值给门户
        $scope.parentPortalModel.currentTabCtrl = $scope.tabCtrl;
        // 初始化模块的页签
        $scope.initTabCtrlForModule("${moduleName}", get${firstUpCaseModuleName}CommViewPath() + "/${moduleName}01/");
        //重置全模块的css
        $htNgCommUtil.resetModuleCss();
        // 加载该模块的css
        $htNgCommUtil.loadModuleCss("${moduleName}");
        /**页面头部名*/
        //$scope.tabPageTitle = "请求申请";

        /**
         * 设置修改模型
         * @param dataModel
         */
        $scope. setModifyModel = function(dataModel) {
            $scope.modifyModel = dataModel;
        }  ;
    
        //左侧菜单点击事件
        $scope.switchListByFunctionId = function (mark, skipPath, tabPageTitle,item) {
            $scope.tabCtrl.cleanTabPageList();
            $scope.currentShowListType = "";
            if (mark) {
                $scope.currentShowListType = mark;
            }
            //console.log(skipPath)
            $scope.changeTabPageListData(skipPath, tabPageTitle, tabPageTitle);
        };
    
        if($htNgCommUtil.isNotEmpty($stateParams.menuModel)){
            $scope.currentShowListType = $stateParams.menuModel.mark;
            // if($scope.currentShowListType == "PERSONNEL_INFO") {//人事信息
            $scope.${moduleName}01Model.listType = 0;
            // }else if($scope.currentShowListType == "PERSONNEL_NEW_COME_PERSON") {   //新进人员申请列表
            //     $scope.${moduleName}01Model.listType = 1;
            // } else if($scope.currentShowListType == "PERSONNEL_MINE_APPLY"){  //我的审批
            //     $scope.${moduleName}01Model.listType = 2;
            // } else if($scope.currentShowListType == "PERSONNEL_MINE_HISTORY_APPLY"){  //我的历史审批
            //     $scope.${moduleName}01Model.listType = 3;
            // } else if($scope.currentShowListType == "PERSONNEL_INFO"){  //所有人事变动
            //     $scope.${moduleName}01Model.listType = 4;
            // } else if($scope.currentShowListType == "PERSONNEL_CB_HANDLE"){  //C&B办理录用
            //     $scope.${moduleName}01Model.listType = 5;
            // } else if($scope.currentShowListType == "PERSONNEL_TRY_OUT_EXAM"){  //试用期考试目标设定列表
            //     $scope.${moduleName}01Model.listType = 6;
            // } else if($scope.currentShowListType == "PERSONNEL_MOVE_NOTICE"){  //试用期考试目标设定评估
            //     $scope.${moduleName}01Model.listType = 7;
            // } else if($scope.currentShowListType == "PERSONNEL_0110"){  //人事变动任务提醒
            //     $scope.${moduleName}01Model.listType = 8;
            // } else if($scope.currentShowListType == "PERSONNEL_0111"){  //薪酬人事汇报线变动
            //     $scope.${moduleName}01Model.listType = 9;
            // } else if($scope.currentShowListType == "PERSONNEL_0112"){  //薪酬人事汇报线变动-所有
            //     $scope.${moduleName}01Model.listType = 10;
            // } else if($scope.currentShowListType == "PERSONNEL_0113"){  //一线派遣员/内部转入办理
            //     $scope.${moduleName}01Model.listType = 11;
            // }
            var menu1 = $scope.getFunctionMenuModelByMark($scope.currentShowListType);
            if (menu1) {
                menu1.$$selectedFlg = true;
            }
            $scope.switchListByFunctionId($stateParams.menuModel.mark, $stateParams.menuModel.path,$stateParams.menuModel.menuName);
        }
    
        /***
         * 获取多语言的回调
         * @param langObj 多语言对象
         */
        // var initLeftLanguageCall = function (langObj) {
        //if ($stateParams.menuModel.openType == "router") {// 当前的模块
        //    var menu = $scope.getFunctionMenuModelByMark("MANAGE");
        //    $scope.resetSelectState();
        //    menu.$$selectedFlg = true;
        //    $scope.changeShowPageList(menu.path, menu.menuName, menu.mark);
        //
        //} else {
        //
        //    $scope.changeShowPageList($stateParams.menuModel.path, $stateParams.menuModel.menuName, $stateParams.menuModel.mark);
        //}
    
        //     $scope.changeShowPageList($stateParams.menuModel.path, $stateParams.menuModel.menuName, $stateParams.menuModel.mark);
        // };
    
        $scope.$on('leftMenuClick', function (event, data) {
            $scope.$broadcast('refreshSetNav', "");
            var mark = data.mark;
            var clickPosFlg = data.clickPosFlg;
            var name = data.name;
            $scope.setModifyModel(null);
            $scope.switchListByFunctionId(mark, data.skipPath, name);
    
            // $scope.changeShowPageList(data.skipPath, data.name, data.mark);
        });
    
    
        ///***
        // * 初始化数据
        // */
        //$scope.initData = function () {
        //    /**初始化*/
        //    var initFunctionArray = [];
        //    var initSuccessFuncArray = [];
        //    $htNgCommManager.getNewQueryCommInfo(initFunctionArray, initSuccessFuncArray);
        //};
        //// 控制器初始化的调用
        //$scope.initData();
        // initLeftLanguageCall();
    
        //刷新列表标记修改
        $scope.refreshTabFirstPageList = function () {
            $scope.$broadcast('refreshPageList');
        };
    
        $scope.$on('refreshPageList', function (event) {
            // 标记星标触发的刷新列表的标记
            $scope.starRefreshFlg = true;
            $scope.listRefresh('refreshPageList');//列表刷新
        });
    
        //刷新列表标记修改
        // $scope.refreshTabFirstPageList = function () {
        //     $scope.$broadcast('refreshPageList');
        // };
    
        /***
         * 返回列表的方法
         */
        $scope.goBackToList = function(){
            $scope.changeShowPageList("", "","");
        };
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