const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserComponent");

const initComponent = function(moduleName, componentName, htpagesPath) {
    let moduleFolderPath = path.join(htpagesPath, pathJson.frontend.module, moduleName);
    // console.log(moduleFolderPath);
    if (!fs.existsSync(moduleFolderPath)) {
        throw new Error("模块不存在");
    }

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
                <div class="modal-content" ng-style="showLocationStyle" drag>
                    <!-- 标题 -->
                    <htng-modal-title modal-title={{"标题"}} modal-ctrl="modalCtrl">
                    </htng-modal-title>
                    <div class="p-l-20 p-r-20 p-t-20">
                        <div class="${moduleName}_flex_start h-40">
                            <div class="${moduleName}_flex_start" style="width: 50%">
                                    <div class="w-100">
                                        <ht-ng-label-direct message={{'资产编号:'}}>
                                        </ht-ng-label-direct>
                                    </div>
                                    <div>
                                        <ht-ng-label-direct message={{${moduleName}.datalist.assetsNum}}>
                                        </ht-ng-label-direct>
                                    </div>
                            </div>
                            <div class="${moduleName}_flex_start " style="width: 50%">
                                <div class="w-100">
                                    <ht-ng-label-direct message={{'姓名'}}>
                                    </ht-ng-label-direct>
                                </div>
                                <div>
                                    <htng-select-user user-id-str="queryModel.userIdList"
                                                      selected-data-ary="queryModel.userAry"
                                                      select-user-flg="true"
                                                      select-dept-flg="false"
                                                      select-post-flg="false"
                                                      select-contact-flg="false"
                                                      select-all-flg="false" input-width="240px"
                                                      muti-line-flg="true" animation-flg="true"
                                                      show-title="" single-select="true"
                                                      select-all-flg="false"
                                                      init-selected-id="">
                                    </htng-select-user>
                                </div>
                            </div>   
                        </div>   
                    </div>
       
                    <htng-page-comm-bottom></htng-page-comm-bottom>
                    <!--操作按钮-->
                    <htng-modal-bottom cancel-title={{"取消"}} sure-title={{"保存"}}
                                       sure-action="saveAction()"
                                       modal-ctrl="modalCtrl"></htng-modal-bottom>      
                </div>`
                        }]
        }, {
            name: `htNgPt${firstModuleName}${firstComponentName}.js`,
            isFolder: 0,
            fileContent: `
oaApp.directive("htng${firstModuleName}${firstComponentName}", function ($htNgCommUtil,$alertService) {
    return {
        restrict: "E",
        templateUrl: getCommComponentPath() + "/uibModal/htNgPtModalBack.html?" + versionToken,
        scope: {
            callback: "&",//回调
            modalCtrl: "="
        },
        replace: true,
        link: function (scope, iEle, attrs) {
        /*页面对象*/
        scope.addressModel = {};
                       
        /**
         * 打开画面的回调
         */
        scope.willShowMethod = function (info) {
            
        };
        scope.modalCtrl =  $htNgCommUtil.commNewModalCtrl($(iEle),
            get${firstModuleName}ComponentPath() + "/${componentName}/htNgPt${firstModuleName}${firstComponentName}.html",scope.willShowMethod);
            
        /**
         * 点击确定的方法
         */
        scope.saveAction = function () {
            scope.modalCtrl.closeCurrentModal();        
        };
            
        //显示位置
        scope.showLocationStyle =$htNgCommUtil.getModalMarginTopLeftStyle(500, 740);
            
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

const createComponent = function(moduleName, componentName) {
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

module.exports.createComponent = createComponent;