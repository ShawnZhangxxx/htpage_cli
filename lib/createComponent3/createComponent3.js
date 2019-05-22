const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserComponent3");

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

                            <!--标题-->
                            <htng-modal-title modal-title="{{'选择项目负责人'}}" modal-ctrl="modalCtrl">
                        
                                <htng-page-comm-head module-id="${moduleName}" title="选择" title-mark="4"
                                                     page-id="htNg${firstModuleName}"></htng-page-comm-head>
                            </htng-modal-title>
                            <div class="comm_list_top_button">
                                <div class="right m-r-20">
                                    <table>
                                        <tr>
                                            <td>
                                                <ht-ng-label-direct message={{'责任人名称'}}></ht-ng-label-direct>
                                                <div class="comm_inline_block">
                                                    <htng-input-direct text-show-value="${componentName}Model.queryModel.paramName"
                                                                       input-height="25"
                                                                       input-width="100"></htng-input-direct>
                                                </div>
                                            </td>
                                            <td>
                                                <ht-ng-label-direct message={{'部门名称'}}></ht-ng-label-direct>
                                                <div class="comm_inline_block">
                                                    <htng-input-direct text-show-value="${componentName}Model.queryModel.paramName"
                                                                       input-height="25"
                                                                       input-width="100"></htng-input-direct>
                                                </div>
                                            </td>
                                            <td>
                                                <div class="button_space_left">&nbsp;</div>
                                                <htng-button-direct mode="sheetAll" button-name={{'搜索'}}
                                                                    button-action="searchInputAction()"></htng-button-direct>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <!--信息列表-->
                            <div class="m-l-10 m-r-10">
                                <div class="scroll_init_content  table_list_width">
                                    <div class="comm_list_table_title_div">
                                        <table class="comm_list_head_table">
                                            <tr>
                                                <td class="list_table_checkbox_title" width="40px">
                                                    <htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"
                                                                   checked-state="${componentName}Model.checkAllState"></htng-checkbox>
                                                </td>
                                                <td htng-td show-style="table_text_blod " words="{{'责任人名称'}}" width="40%" class="p-t-7"></td>
                                                <td htng-td show-style="table_text_blod " words="{{'部门'}}" width="30%" class="p-t-7"></td>
                                                <td htng-td show-style="table_text_blod "
                                                    words="{{'区域'}}"
                                                    width="30%" class="p-t-7"></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="scroll_init_content hide_beyond_content"  ng-style="getTableHeight()">
                                        <table cellpadding="0" cellspacing="0" class="list_table"
                                               data-ng-init="loadPageToInitScroll()">
                                            <tr height="0">
                                                <td width="40px"></td>
                                                <td width="40%"></td>
                                                <td width="30%"></td>
                                                <td width="30%"></td>
                                            </tr>
                                            <tbody>
                                            <tr htng-list-content-tr ng-repeat="item in ${componentName}Model.dataList" tr-data="item">
                                                <td class="list_table_content_checkbox" width="40px" >
                                                    <htng-checkbox item-obj="item" click-method="clickListCheckItem(checkFlg,clickObj)"
                                                                   checked-state="item.$$checkFlg"></htng-checkbox>
                                                </td>
                                                <td htng-list-content-td>
                                                    <span>{{item.content1}}</span>
                                                </td>
                                                <td htng-list-content-td>
                                                    <span>{{item.content2}}</span>
                                                </td>
                                                <td htng-list-content-td>
                                                    <div>{{item.content3}}</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                        
                                </div>
                            </div>
                            <htng-page-comm-bottom></htng-page-comm-bottom>
                            <!--操作按钮-->
                            <htng-modal-bottom cancel-title={{'取消'}} sure-title={{'发送'}}
                                               sure-action="saveAction()"
                                               modal-ctrl="modalCtrl"></htng-modal-bottom>
                            <!--翻页部品-->
                            <htng-pt-page-selector page-ctrl="${componentName}Model.pageSelectorCtrl"
                                                   method="pageAction()"></htng-pt-page-selector>
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

            /*当前页面对象*/
            scope.${componentName}Model = {};

            scope.queryModel = {};

            scope.queryModel.paramName = "";
            //翻页部品控制对象
            scope.${componentName}Model.pageSelectorCtrl = new PageSelectorCtrl();

            /**
             * 打开画面的回调
             */
            var modalWillShow = function (info) {

            };

            scope.modalCtrl =  $htNgCommUtil.commNewModalCtrl($(iEle),
                get${firstModuleName}ComponentPath() + "/${componentName}/htNgPt${firstModuleName}${firstComponentName}.html",scope.willShowMethod);
            //数据刷新
            scope.listRefresh = function() {
                scope.${componentName}Model.checkAllState = false;
                /**列表内容赋值方法*/
                var getContentListCallback = function (content_list) {
                    //获取数据成功后，进行翻页部品总条数显示
                    console.log(content_list);
                    scope.${componentName}Model.dataList = content_list;
                    scope.${componentName}Model.checkAllState = false;
                };

                var tempDataList = [];
                for (var i = 0; i < 5; i++) {
                    var data = {};
                    data.id = "id" + i;
                    data.content1 = "张三" ;
                    data.content2 = "销售" ;
                    data.content3 = "北京" ;
                    tempDataList.push(data);
                }
                scope.${componentName}Model.dataList = tempDataList;
                scope.${componentName}Model.pageSelectorCtrl.totalItems = 5;
                //$htNg${firstModuleName}01Manager.fetchKpiParamList(scope.queryModel, '', getContentListCallback, scope.${componentName}Model.pageSelectorCtrl);
            };

            scope.listRefresh();

            //获取id字符串
            scope.getSelectedIdListStr = function (dataList) {
                var selectIdStr = "";
                for (var j = 0; j < dataList.length; j++) {
                    var dataObj = dataList[j];
                    if (dataObj.$$checkFlg) {
                        selectIdStr += dataObj.paramId+ ";"
                    }
                }
                return selectIdStr;
            };
            //获取name字符串
            scope.getSelectedNameListStr = function (dataList) {
                var selectNameStr = "";
                for (var j = 0; j < dataList.length; j++) {
                    var dataObj = dataList[j];
                    if (dataObj.$$checkFlg) {
                        selectNameStr += dataObj.paramName+ ";"
                    }
                }
                return selectNameStr;
            };
            /**
             * 选择执行方法
             */
            scope.saveAction = function () {
                var idList = scope.getSelectedIdListStr(scope.${componentName}Model.dataList);
                var nameList = scope.getSelectedNameListStr(scope.${componentName}Model.dataList);
                console.log(nameList);
                //scope.chooseBack({idList:idList,nameList:nameList});
                scope.modalCtrl.closeCurrentModal();
            };
            /**获取弹出层显示位置*/
            scope.showLocation = $htNgCommUtil.getModalMarginTopLeftStyle(600, 740);
            scope.getTableHeight = function () {
                return {
                    "max-height": "400px",
                    "height": "auto"
                };
            };
            //点击翻页部品后执行事件
            /*  scope.pageAction = function () {
             scope.listRefresh();//获取数据刷新列表
             };*/

            /***
             * 获取列表画面的高度
             * @returns
             */
            scope.getTableListHeight = function () {
                return getTableFrameHeightStyle();
            };
            /***
             * 获取列表画面的内容高度
             */
            scope.getTableListContentHeight = function () {
                return getTableContentHeightStyle();
            };
            scope.loadPageToInitScroll = function () {
                $htNgCommUtil.initCommonScroller();
            };
            /**
             * 行选中事件
             */
            scope.itemChecked = function (item) {
                if (item.$$checkFlg && item.$$checkFlg == true) {
                    item.$$checkFlg = false;
                } else {
                    item.$$checkFlg = true;
                }
            };
            /***
             * 处理点击全选的方法
             * @param checkFlg 全选的标识 true是标记全选 false取消全选
             * @param classifyFlg 分组的标记 true是由分组 false不分组
             * @param dataList 列表的数据对象列表
             */
            scope.clickListCheckAll = function (checkFlg, classifyFlg, dataList) {
                if (checkFlg) {// 全选
                    if (classifyFlg) {//分组
                        $htNgCommUtil.updateToCheckAll(dataList);
                    } else {
                        $htNgCommUtil.updateSimpleToCheckAll(dataList);
                    }
                } else {// 取消全选
                    if (classifyFlg) {//分组
                        $htNgCommUtil.refreshListCheckToInit(dataList);
                    } else {
                        $htNgCommUtil.refreshSimpleListCheckToInit(dataList);
                    }
                }
            };
            //点击全选事件
            scope.clickCheckAll = function (checkFlg, clickObj) {
                scope.clickListCheckAll(checkFlg, false, scope.${componentName}Model.dataList);
            };
            /**
             * 点击取消的方法
             */
            scope.closeClickAction = function () {
                scope.modalCtrl.closeCurrentModal();
            };
            /***
             *  排序操作执行事件
             */
            scope.clickSortAction = function () {
                scope.${componentName}Model.pageSelectorCtrl.sortFlg = true;
                scope.listRefresh();//获取数据刷新列表
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

const createComponent3 = function(moduleName, componentName) {
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

module.exports.createComponent3 = createComponent3;