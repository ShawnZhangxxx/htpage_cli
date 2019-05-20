const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserComponent2");

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
    <htng-modal-title modal-title={{"标题"}} modal-ctrl="modalCtrl">
    </htng-modal-title>

    <div class="scroll_x_init_content" ng-style="allWidthStyle()">
        <div class="scroll_init_content" ng-style="rightTableWidth()">
            <table class="comm_list_head_table" cellpadding="0" cellspacing="0"
                   data-ng-init="loadPageToInitScroll()" ng-style="rightTableWidth()">
                <tr htng-list-titletr style="border-top: 0">
                    <td width="40px" class="list_table_checkbox_title">
                        <htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"
                                       checked-state="${componentName}Model.checkAllState"></htng-checkbox>
                    </td>
                    <!--房产地址-->
                    <td htng-td show-style="bold" words=房产地址 width="200px"></td>
                    <!--业主名称-->
                    <td htng-td show-style="bold" words=业主名称 width="100px"></td>
                    <!--电子票号-->
                    <td htng-td show-style="bold" words=电子票号 width="150px"></td>
                    <!--收款日期-->
                    <td htng-td show-style="bold" words=收款日期 width="150px"></td>
                    <!--费项名称-->
                    <td htng-td show-style="bold" words=费项名称 width="200px"></td>
                    <!--应收金额-->
                    <td htng-td show-style="bold" words=应收金额 width="170px"></td>
                    <!--实收金额-->
                    <td htng-td show-style="bold" words=实收金额 width="150px"></td>
                    <!--未收金额-->
                    <td htng-td show-style="bold" words=未收金额 width="150px"></td>
                    <!--单价-->
                    <td htng-td show-style="bold" words=单价（元） width="150px"></td>
                    <!--收款状态-->
                    <td htng-td show-style="bold" words=收款状态 width="150px"></td>
                    <!--审核状态-->
                    <td htng-td show-style="bold" words=审核状态 width="150px"></td>
                    <!--账单开始日期-->
                    <td htng-td show-style="bold" words=账单开始日期 width="150px"></td>
                    <!--账单结束日期-->
                    <td htng-td show-style="bold" words=账单结束日期 width="150px"></td>
                    <!--操作-->
                    <!--<td htng-td show-style="bold" words=操作 width="150px"></td>-->
                </tr>
                <tr htng-list-content-tr ng-repeat="item in ${componentName}Model.datalist" tr-data="item"
                    tr-action="clickListCheckItem(checkFlg,clickObj)">
                    <td class="list_table_content_checkbox" width="40px">
                        <htng-checkbox item-obj="item" click-method="clickListCheckItem(checkFlg,clickObj)"
                                       checked-state="item.$$checkFlg"></htng-checkbox>
                    </td>
                    <!--房产地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.houseName}} defined-class="comm_text_align_center"></div>
                    </td>
                    <!--业主名称-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.customerName}}>
                        </div>
                    </td>
                    <!--电子票号-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.receiptNo}}>
                        </div>
                    </td>
                    <!--收款日期-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.receiveTime}}>
                        </div>
                    </td>
                    <!--费项名称-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.feeItemName}}>
                        </div>
                    </td>
                    <!--应收金额-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.receivable}}>
                        </div>
                    </td>
                    <!--实收金额-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.received}}>
                        </div>
                    </td>
                    <!--未收金额-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.notReceive}}>
                        </div>
                    </td>
                    <!--单价-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.price}}>
                        </div>
                    </td>
                    <!--收款状态-->
                    <td htng-list-content-td>
                        <div ng-if="item.billPayState == 1">已收</div>
                        <div ng-if="item.billPayState == 0">未收</div>
                    </td>
                    <!--审核状态-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content=无>
                        </div>
                    </td>
                    <!--账单开始日期-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.beginDate}}>
                        </div>
                    </td>
                    <!--账单结束日期-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content-action="itemChecked(item)"
                             content={{item.endDate}}>
                        </div>
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
oaApp.directive("htng${firstModuleName}${firstComponentName}", function ($htNgCommUtil,$alertService,$htNg${firstModuleName}01Manager) {
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
                $htNg${firstModuleName}01Manager.fetchBills(scope.queryModel, callback, scope.${componentName}Model.pageSelectorCtrl)
            };


            scope.getTableListHeight = function () {
                return $htNgCommUtil.getTableFrameHeightStyle();
            };

            /***
             * 获获取右侧显示的宽度
             */
            scope.getTreeAreaTableShowWidth = function () {
                var tableWidth = $htNgCommUtil.getWindowWidthButLeftMenu() - 200;
                return {'width': tableWidth + "px"};
            };

            /**
             * 获取树形显示的高度
             * @returns {{height: string}}
             */
            scope.getTreeHeightValue = function () {
                return $htNgCommUtil.getTableButTabHeight();
            };
            scope.getCurrentTableListContentHeight = function () {
                var topHeight = $htNgCommUtil.getTableButTabHeight();
                return {"height": topHeight + "px"};
            };

            scope.rightTableWidth = function () {
                var width = $htNgCommUtil.getWindowWidth() - 50;
                return {'width': width + "px"}
            };

            scope.allWidthStyle = function () {
               var width = $htNgCommUtil.getWindowWidthButLeftMenu() - 50;
               var height = $htNgCommUtil.getShowPageHeight() - 50 - 100;
               return {
                   'max-height':height + 'px',
                   'height':'auto',
                   'width':width + 'px',
                   'overflow':'auto'
               }
            };
            scope.loadPageToInitScroll = function () {
                $htNgCommUtil.initCommonScroller();
            };
            //点击全选事件
            scope.clickCheckAll = function (checkFlg, clickObj) {
                scope.clickListCheckAll(checkFlg, false, scope.${componentName}Model.datalist);
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

const createComponent2 = function(moduleName, componentName) {
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

module.exports.createComponent2 = createComponent2;