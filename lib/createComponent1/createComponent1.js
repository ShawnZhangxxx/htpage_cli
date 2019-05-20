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
                            <div class="modal-content" ng-style="showLocationStyle" drag>
    <!-- 标题 -->
    <htng-modal-title modal-title={{"维修详细"}} modal-ctrl="modalCtrl">
    </htng-modal-title>

    <div class="table_list_width" ng-style="getTableListHeight()">
        <div class="comm_list_table_title_div ">
            <table class="comm_list_head_table comm_list_head_table_fixed">
                <tr htng-list-titletr>
                    <td width="40px" class="list_table_checkbox_title">
                        <htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"
                                       checked-state="${componentName}Model.checkAllState"></htng-checkbox>
                    </td>
                    <!--地址 报修内容 报修人 报修人电话	报修类型	工单状态	归属机构-->
                    <!--<td htng-td words={{"重点"}} show-style="table_text_blod" width="40px"></td>-->
                    <td htng-td words={{"工单号"}} show-style="table_text_blod" width="120px"></td>
                    <td htng-td words={{"报修类型"}} show-style="table_text_blod " width="150px"></td>
                    <td htng-td words={{"报修内容"}} show-style="table_text_blod" width="20%"></td>
                    <td htng-td words={{"地址"}} show-style="table_text_blod" width="15%"></td>
                    <td htng-sort-td show-title={{"报修人"}} sort-action="clickSortAction()"
                        order-name="repair_performer_user" sort-ctrl="${componentName}Model.pageSelectorCtrl"
                        width="80px"></td>
                    <td htng-td words={{"报修人电话"}} show-style="table_text_blod " width="120px"></td>
                    <!--工单状态 -->
                    <td htng-td words={{"工单状态"}} show-style="table_text_blod " width="150px"></td>
            </table>
        </div>
        <div class="scroll_init_content hide_beyond_content"
             ng-style="getTableListContentHeight()">
            <table cellpadding="0" cellspacing="0" class="list_table"
                   data-ng-init="loadPageToInitScroll()">
                <tr height="0">
                    <td width="40px"></td>
                    <!--<td width="40px"></td>-->
                    <td width="120px"></td>
                    <td width="150px"></td>
                    <td width="20%"></td>
                    <td width="15%"></td>
                    <td width="80px"></td>
                    <td width="120px"></td>
                    <!--<td width="120px"></td>-->
                    <td width="150px"></td>
                </tr>
                <tr htng-list-content-tr ng-repeat="item in ${componentName}Model.datalist" tr-data="item">
                    <td class="list_table_content_checkbox" width="40px">
                        <htng-checkbox item-obj="item" click-method="clickCheckAll(checkFlg,clickObj)"
                                       checked-state="item.$$checkFlg"></htng-checkbox>
                    </td>
                    <!---9全部工单 0待分配 1待到场 2待完工 3待回访 4挂起-->
                    <!--重点 -->
                    <!--<td htng-list-content-td>
                        <div ng-click="switchImportance(item,$event)" title="更改工单重要度"
                             ng-class="{true: 'comm_pointer repair_importance_img_button',
                                false: 'comm_pointer repair_importance_no_img_button'}[item.importantFlg==1]">
                        </div>
                    </td>-->
                    <!--工单号 -->
                    <td htng-list-content-td>
                        <div htng-show-all-content content-action="itemChecked(item)"
                             content={{item.repairWorkId}}>
                        </div>
                    </td>
                    <!--报修类型 -->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.repairType}}>
                        </div>
                    </td>
                    <!--报修内容 -->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" content={{item.reason}}>
                        </div>
                    </td>
                    <!--地址-->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.address}}></div>
                    </td>

                    <!--报修人 shouji -->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.people}}>
                        </div>
                    </td>

                    <!--电话 -->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false"
                             content={{item.tel}}>
                        </div>
                    </td>
                    <!--工单状态 -->
                    <td htng-list-content-td>
                        <div htng-show-all-content pointer-flg="false" defined-class="{{getStateColor(item)}}"
                             content={{item.statusName}}>
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
        link: function (scope, iEle, attrs) {
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
                scope.queryModel = info;
            };

            scope.modalCtrl = $htNgCommUtil.commNewModalCtrl($(iEle),
                get${firstModuleName}ComponentPath() + "/${componentName}/htNgPt${firstModuleName}${firstComponentName}.html?", willShowMethod);

            scope.listRefresh = function () {
                var callback = function (datalist) {
                    scope.${componentName}Model.datalist = datalist;
                };
                $htNg${firstModuleName}01Manager.fetchRepairsByHouseId(scope.queryModel, callback, scope.${componentName}Model.pageSelectorCtrl)
            };
            /**
             * 点击确定的方法
             */
            // scope.saveAction = function () {
            //     scope.modalCtrl.closeCurrentModal();
            // };

            /*获取弹出层显示位置*/
            scope.showLocationStyle = $htNgCommUtil.getModalMarginTopLeftStyle($htNgCommUtil.getShowPageHeight() - 50
                , $htNgCommUtil.getWindowWidthButLeftMenu() - 50);

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