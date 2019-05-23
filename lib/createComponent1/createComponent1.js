const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserComponent1");

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
                            <div class="modal-content" ng-style="showLocation" drag>
    <!-- 标题 -->
    <htng-modal-title modal-title={{"车位详情"}} modal-ctrl="modalCtrl">
    </htng-modal-title>

    <div class="scroll_x_init_content" ng-style="outDivStyle()">
        <div style="height: 35px;background-color: #fafafa;" ng-style="tableTitleStyle()">
            <table class="comm_list_head_table" cellpadding="0" cellspacing="0">
                <tr htng-list-titletr style="border-top: 0">
                    <td width="40px" class="list_table_checkbox_title">
                        <htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"
                                       checked-state="${componentName}Model.checkAllState"></htng-checkbox>
                    </td>
                    <!--车位费项-->
                    <td htng-td show-style="bold" words={{'车位费项'}} width="150px"></td>
                    <!--单价-->
                    <td htng-td show-style="bold" words={{'单价'}} width="150px"></td>
                    <!--周期-->
                    <td htng-td show-style="bold" words={{'周期'}} width="150px"></td>
                    <!--车牌型号-->
                    <td htng-td show-style="bold" words={{'车牌型号'}} width="150px"></td>
                    <!--颜色-->
                    <td htng-td show-style="bold" words={{'颜色'}} width="150px"></td>
                    <!--车库-->
                    <td htng-td show-style="bold" words={{'车库'}} width="150px"></td>
                    <!--车位-->
                    <td htng-td show-style="bold" words={{'车位'}} width="150px"></td>
                </tr>
            </table>
        </div>
        <div class="scroll_init_content" ng-style="tableContentStyle()" >
            <table class="comm_list_head_table" cellpadding="0" cellspacing="0"
                   data-ng-init="loadPageToInitScroll()">
                <tr>
                    <td width="40px"></td>
                    <td width="150px"></td>
                    <td width="150px"></td>
                    <td width="150px"></td>
                    <td width="150px"></td>
                    <td width="150px"></td>
                    <td width="150px"></td>
                    <td width="150px"></td>
                </tr>
                <tr htng-list-content-tr ng-repeat="item in ${componentName}Model.dataList" tr-data="item"
                    tr-action="clickListCheckItem(checkFlg,clickObj)">
                    <td class="list_table_content_checkbox" width="40px">
                        <htng-checkbox item-obj="item" click-method="clickListCheckItem(checkFlg,clickObj)"
                                       checked-state="item.$$checkFlg"></htng-checkbox>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.content1}} ></div>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.content1}} ></div>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.content1}} ></div>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.content1}} ></div>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.content1}} ></div>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.content1}} ></div>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.content1}} ></div>
                    </td>

                </tr>
            </table>
        </div>
    </div>

    <!--翻页部品-->
    <htng-pt-page-selector page-ctrl="${componentName}Model.pageSelectorCtrl"
                           method="pageAction()"></htng-pt-page-selector>
    <htng-page-comm-bottom></htng-page-comm-bottom>
</div>
`
                        }]
        }, {
            name: `htNgPt${firstModuleName}${firstComponentName}.js`,
            isFolder: 0,
            fileContent: `
oaApp.directive("htng${firstModuleName}${firstComponentName}", function ($controller,$htNgCommUtil,$alertService,$htNg${firstModuleName}01Manager) {
    return {
        restrict: "E",
        templateUrl: getCommComponentPath() + "/uibModal/htNgPtModalBack.html?" + versionToken,
        scope: {
            callback: "&",//回调
            modalCtrl: "="
        },
        replace: true,
        link: function (scope, iEle, attr) {
            // 继承父controller
            angular.extend(this, $controller('htNgListCtrl', {$scope: scope}));
            /*页面对象*/
            scope.${componentName}Model = {};
            //翻页部品控制对象
            scope.${componentName}Model.pageSelectorCtrl = new PageSelectorCtrl();
            scope.${componentName}Model.datalist = [];

            scope.queryModel = {};

            /**
             * 打开画面的回调
             */
            var willShowMethod = function (info) {
                scope.queryModel.houseId = info;
            };

            scope.modalCtrl = $htNgCommUtil.commNewModalCtrl($(iEle),
                get${firstModuleName}ComponentPath() + "/${componentName}/htNgPt${firstModuleName}${firstComponentName}.html", willShowMethod);

            /**获取弹出层显示位置*/
            scope.showLocation = $htNgCommUtil.getModalMarginTopLeftStyle($htNgCommUtil.getShowPageHeight() - 50
                , $htNgCommUtil.getWindowWidthButLeftMenu() - 50);

            scope.listRefresh = function () {
                var callback = function (fetchdata) {
                    scope.${componentName}Model.datalist = fetchdata;
                };
                var tempDataList = [];
                for (var i = 0; i < 30; i++) {
                    var data = {};
                    data.id = "id" + i;
                    data.content1 = "张三" ;
                    data.content2 = "销售" ;
                    data.content3 = "北京" ;
                    tempDataList.push(data);
                }
                scope.${componentName}Model.dataList = tempDataList;
                scope.${componentName}Model.pageSelectorCtrl.totalItems = 30;
                //$htNg${firstModuleName}01Manager.fetchBills(scope.queryModel, callback, scope.${componentName}Model.pageSelectorCtrl)
            };

            scope.listRefresh();

            scope.tableContentStyle = function () {
                var height = $htNgCommUtil.getShowPageHeight() - 50 - 100;
                // return {'width': width + "px"}
                return {
                    'max-height':height + 'px',
                    'height':'auto',
                    //'width':width,
                }
            };
            scope.tableTitleStyle = function () {
                return {
                    //'width':width,
                }
            }

            scope.outDivStyle = function () {
               var width = $htNgCommUtil.getWindowWidthButLeftMenu() - 50;
               var height = $htNgCommUtil.getShowPageHeight() - 50 - 100;
               return {
                   'max-height':height + 'px',
                   'height':'auto',
                   'width':width + 'px',
                   'overflow':'auto'
               }
            };

            //点击全选事件
            scope.clickCheckAll = function (checkFlg, clickObj) {
                scope.clickListCheckAll(checkFlg, false, scope.${componentName}Model.dataList);
            };

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

const createComponent1 = function(moduleName, componentName) {
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

module.exports.createComponent1 = createComponent1;