const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserListPage1");

const initList = function(moduleName, componentName, htpagesPath) {
    let moduleFolderPath = path.join(htpagesPath, pathJson.frontend.module, moduleName);
    // console.log(moduleFolderPath);
    if (!fs.existsSync(moduleFolderPath)) {
        return Promise.reject("模块不存在");
    }

    let firstModuleName = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1);

    let firstComponentName = componentName.substring(0, 1).toUpperCase() + componentName.substring(1);
    let modalName = moduleName + firstComponentName;

    const componentFileTree = 
    {
        name: `${moduleName}${firstComponentName}`,
        isFolder: 1,
        childAry:[
            {
                name: `CN`,
                isFolder: 1,
                childAry: [{
                    name: `htNg${firstModuleName}${firstComponentName}.html`,
                    isFolder: 0,
                    fileContent: `
                    <!--右侧-->
                    <div ng-controller="htNg${firstModuleName}${componentName}Ctrl" class="list_out_frame_div">
                        <div class="table_list_width comm_area_tree_table_div "
                             ng-style="getTreeAreaTableShowWidth()">
                            <div class="comm_list_top_button">
                                <div class="button_space_left">&nbsp;</div>
                                <div class="button_space">
                                    <htng-button-direct mode="sheetAll" button-name="{{'查看投诉'}}"
                                                        button-action="viewComplaintActionByButton()"></htng-button-direct>
                                </div>
                                <!--<div class="button_space">
                                   <div class="button_space">
                                       <htng-button-direct mode="sheetAll" button-name=导入
                                                       button-action="importAction()"></htng-button-direct>
                                   </div>
                                   <div class="button_space">
                                       <htng-export call-back="exportAction(exportType)" id=""></htng-export>
                                   </div>
                               </div>-->
                                <!--<div class="right m-r-20">-->
                                    <!--<table>-->
                                        <!--<tr>-->
                                            <!--<td class="p-l-10">-->
                                                <!--<div class="m-t-3 left m-r-5">-->
                                                    <!--<ht-ng-label-direct message={{'AAA'}}></ht-ng-label-direct>-->
                                                <!--</div>-->
                                                <!--<div class="comm_inline_block ">-->
                                                    <!--<htng-input-direct text-show-value="queryModel.aaaame"-->
                                                                       <!--input-width="100" input-height="25"></htng-input-direct>-->
                                                <!--</div>-->
                                            <!--</td>-->
                                            <!--<td>-->
                                                <!--<div class="button_space_left">&nbsp;</div>-->
                                                <!--<htng-button-direct mode="sheetAll" button-name={{'搜索'}}-->
                                                                    <!--button-action="searchAction()"></htng-button-direct>-->
                                            <!--</td>-->
                    
                                        <!--</tr>-->
                                    <!--</table>-->
                                <!--</div>-->
                            </div>
                            <!--主列表-->
                            <div class="scroll_x_init_content table_list_width" ng-style="getTableListHeight11()">
                                <!--头-->
                                <div class="" style="width:1790px;height: 70px;background-color: #fafafa;">
                                    <table class="comm_list_head_table " style="width:1790px">
                                        <tr height="0">
                                            <td width="40px"></td>
                                            <!--房屋-->
                                            <td width="250px"></td>
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <!--业主-->
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <!--缴费-->
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <!--报修-->
                                            <td width="150px"></td>
                                            <!--投诉-->
                                            <td width="150px"></td>
                                        </tr>
                                        <tr htng-list-titletr>
                                            <td rowspan="2" width="40px" class=" " style="padding-left:16px ">
                                                <htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"
                                                               checked-state="${moduleName}Model.checkAllState"></htng-checkbox>
                                            </td>
                                            <td colspan="3" htng-td show-style="table_text_blod"
                                                class=" b-r-1 b-l-1" style="text-align: center"
                                                words={{'房屋'}}
                                                width="550px"></td>
                                            <td colspan="2" htng-td show-style="table_text_blod"
                                                class="b-r-1 b-l-1" style="text-align: center"
                                                words={{'业主'}}
                                                width="300px"></td>
                                            <td colspan="4" htng-td show-style="table_text_blod"
                                                class=" b-r-1 b-l-1" style="text-align: center"
                                                words={{'缴费'}}
                                                width="600px"></td>
                                            <td colspan="1" htng-td show-style="table_text_blod"
                                                class=" b-r-1 b-l-1" style="text-align: center"
                                                words={{'报修'}}
                                                width="150px"></td>
                                            <td colspan="1" htng-td show-style="table_text_blod"
                                                class=" b-r-1 b-l-1" style="text-align: center"
                                                words={{'投诉'}}
                                                width="150px"></td>
                                        </tr>
                                        <tr htng-list-titletr>
                                            <!--<td width="40px" class="list_table_checkbox_title">-->
                                            <!--<htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"-->
                                            <!--checked-state="${moduleName}Model.checkAllState"></htng-checkbox>-->
                                            <!--</td>-->
                                            <!--房屋-->
                                            <td htng-td show-style="table_text_blod " class=" b-l-1 " style="text-align: center;cursor: pointer"
                                                words="{{'房屋名称'}}"
                                                width="250px"></td>
                                            <td htng-td show-style="table_text_blod " class=" b-l-1 " style="text-align: center;cursor: pointer"
                                                words="{{'房屋编号'}}"
                                                width="150px"></td>
                                            <td htng-td show-style="table_text_blod " class="b-l-1 b-r-1 " style="text-align: center;cursor: pointer"
                                                words="{{'建筑面积'}}"
                                                width="150px"></td>
                                            <!--业主-->
                                            <td htng-td show-style="table_text_blod " class=" b-l-1 b-r-1 " style="text-align: center"
                                                words="{{'业主名称'}}"
                                                width="150px"></td>
                                            <td htng-td show-style="table_text_blod " class="  b-r-1 " style="text-align: center"
                                                words="{{'电话'}}"
                                                width="150px"></td>
                                            <!--缴费-->
                                            <td htng-td show-style="table_text_blod " class=" b-r-1 " style="text-align: center"
                                                words="{{'物业费组'}}"
                                                width="150px"></td>
                                            <td htng-td show-style="table_text_blod " class="b-r-1 " style="text-align: center"
                                                words="{{'物业应收'}}"
                                                width="150px"></td>
                                            <td htng-td show-style="table_text_blod " class=" b-r-1 " style="text-align: center"
                                                words="{{'停车费组'}}"
                                                width="150px"></td>
                                            <td htng-td show-style="table_text_blod " class="b-r-1 " style="text-align: center"
                                                words="{{'停车应收'}}"
                                                width="150px"></td>
                                            <!--报修-->
                                            <td htng-td show-style="table_text_blod " class="  b-r-1 " style="text-align: center"
                                                words="{{'报修数量'}}"
                                                width="150px"></td>
                                            <!--投诉-->
                                            <td htng-td show-style="table_text_blod " class=" b-r-1 " style="text-align: center"
                                                words="{{'投诉数量'}}"
                                                width="150px"></td>
                                        </tr>
                                    </table>
                                </div>
                                <!--内容-->
                                <div class="scroll_init_content hide_beyond_content m-t-2" style="width:1790px"
                                     ng-style="getTableListContentHeight()">
                                    <table id="contentTableId" cellpadding="0" cellspacing="0" style="width:1790px" class="list_table"
                                           data-ng-init="loadPageToInitScroll()">
                                        <tr height="0">
                                            <td width="40px"></td>
                                            <td width="250px"></td>
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                    
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <!--缴费-->
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                                            <td width="150px"></td>
                    
                                            <td width="150px"></td>
                    
                                            <td width="150px"></td>
                                        </tr>
                                        <tr htng-list-content-tr ng-repeat="item in ${moduleName}Model.dataListDetail" tr-data="item">
                                            <td width="40px" class="list_table_content_checkbox">
                                                <htng-checkbox item-obj="item" click-method="clickListCheckItem(checkFlg,clickObj)"
                                                               checked-state="item.$$checkFlg"></htng-checkbox>
                                            </td>
                                            <!--房屋-->
                                            <td htng-list-content-td width="250px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewHouseDetail(item.houseId)"
                                                     defined-class="${moduleName}_float_none" text-show-style=""
                                                     content={{item.houseName}}>
                                                </div>
                                            </td>
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewHouseDetail(item.houseId)"
                                                     content={{item.houseNo}}>
                                                </div>
                                            </td>
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewHouseDetail(item.houseId)"
                                                     content={{item.area}}>
                                                </div>
                                            </td>
                                            <!--业主-->
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewAction(item.houseId)"
                                                     content={{item.customer}}>
                                                </div>
                                            </td>
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewAction(item.houseId)"
                                                     content={{item.phone}}>
                                                </div>
                                            </td>
                    
                                            <!--缴费-->
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewFeeAction(item.houseId)"
                                                     content={{item.houseFeeGroupName}}>
                                                </div>
                                            </td>
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewFeeAction(item.houseId)"
                                                     content={{item.houseFeeReceivable}}>
                                                </div>
                                            </td>
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewFeeAction(item.houseId)"
                                                     content={{item.parkingFeeGroupName}}>
                                                </div>
                                            </td>
                                            <td htng-list-content-td width="150px" class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewFeeAction(item.houseId)"
                                                     content={{item.parkingFeePrice}}>
                                                </div>
                                            </td>
                    
                                            <!--维修-->
                                            <td htng-list-content-td class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewFixAction(item.houseId)"
                                                     content={{item.repairNum}}>
                                                </div>
                                            </td>
                                            <!--投诉-->
                                            <td htng-list-content-td class="p-l-10">
                                                <div htng-show-all-content pointer-flg="true" content-action="viewComplaintAction(item.houseId)"
                                                     content={{item.complaintNum}}>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    
                        <htng-page-comm-bottom></htng-page-comm-bottom>
                        <!--投诉-->
                        <!--<htng-${moduleName}-complaint-detail-view modal-ctrl="${moduleName}Model.complaintDetailCtrl" callback=""></htng-${moduleName}-complaint-detail-view>-->
                        <htng-pt-page-selector page-ctrl="${moduleName}Model.pageSelectorCtrl"
                                               method="pageAction()"></htng-pt-page-selector>
                    </div>`
                }
        ]
    }, {
            name: `htNg${firstModuleName}${firstComponentName}Ctrl.js`,
            isFolder: 0,
            fileContent: `
            /**
             * Created by Administrator on 2017/3/30.
             */
            oaApp.controller("htNg${firstModuleName}${componentName}Ctrl",function($USER_INFO,$alertService,$scope, $htNgCommManager, $timeout,$htNgCommUtil,$COMM_CONSTANT, $htNg${firstModuleName}01Manager,$controller){
                // 继承父controller
                angular.extend(this, $controller('htNgListCtrl', {$scope: $scope}));
                $scope.${moduleName}Model = {};
                $scope.${moduleName}Model.complaintDetailCtrl = {};
                $scope.queryModel = {};
                $scope.${moduleName}Model.dataList = [];//右侧列表数据
              
                //翻页部品控制对象
                $scope.${moduleName}Model.pageSelectorCtrl = new PageSelectorCtrl();
    
                $scope.getTableListHeight = function () {
                    return $htNgCommUtil.getTableFrameHeightStyle();
                };
                /***
                 * 获取列表画面的内容高度
                 */
                $scope.getTableListContentHeight = function () {
                    //return $htNgCommUtil.getTableContentHeightStyle();
                    return {
                        "max-height": ($htNgCommUtil.getTableContentHeight() - 34 - 50) + "px",
                        "height": "auto"
                    };
                };
            
                //获取右侧页面高度
                $scope.getCurrentTableListContentHeight = function () {
                    // var topHeight = $htNgCommUtil.getShowPageHeight() - $COMM_CONSTANT.LIST_BUTTON_SPACE_HEIGHT - $COMM_CONSTANT.NO_TAB_MODULE_TITLE_HEIGHT;
                    var topHeight = $htNgCommUtil.getTableButTabHeight();
                    return {"height": topHeight};
                };
            
                //计算高度
                $scope.getTableListRightHeight = function () {
                    var height = $htNgCommUtil.getShowPageHeight() - $COMM_CONSTANT.NO_TAB_MODULE_TITLE_HEIGHT - $COMM_CONSTANT.LIST_BUTTON_SPACE_HEIGHT - 10;
                    return {
                        "max-height": height + "px",
                        "height": "auto"
                    };
                };
                $scope.loadPageToInitScroll = function () {
                    $timeout(function () {
                        $htNgCommUtil.initCommonScroller();
                    }, 35)
                };
            
                /**
                 * 计算宽度
                 * @returns {number}
                 */
                $scope.calculateAllWidth = function () {
                    //var allWidth = 0;
                    //if (scope.addModel.titleList) {
                    //    var width = ($htNgCommUtil.getWindowWidthButLeftMenu() - 50 - 200 - 20 - 40 - 150) / scope.addModel.titleList.length;
                    //    if (width < 150) {
                    //        allWidth = 150 * scope.addModel.titleList.length + 190
                    //    } else {
                    //        allWidth = $htNgCommUtil.getWindowWidthButLeftMenu() - 50 - 200 - 20;
                    //    }
                    //}
                    var width = $htNgCommUtil.getWindowWidthButLeftMenu()+200;
                    return {'width': width + 'px'};
                };
                $scope.getTableListHeight11 = function () {
                    var height = $htNgCommUtil.getTableFrameHeight();
                    var width = $htNgCommUtil.getWindowWidthButLeftMenu() - 200;
                    return {'max-height': height + 'px','height':'auto','width':width,  'overflow': 'auto'};
                };
            
                /***
                 * 获取选中的数据 组成数组
                 * @param dataList
                 * @returns {Array}
                 */
                $scope.getSelectedList = function (dataList) {
                    var idArr = [];
                    for (var j = 0; j < dataList.length; j++) {
                        var dataObj = dataList[j];
                        if (dataObj.$$checkFlg) {
                            idArr.push(dataObj);
                        }
                    }
                    return idArr;
                };
                //点击全选事件
                $scope.clickCheckAll = function (checkFlg, clickObj) {
                    $scope.clickListCheckAll(checkFlg, false, $scope.${moduleName}Model.dataListDetail);
                };
                /**
                 * 点击查看投诉信息
                 */
                $scope.viewComplaintAction = function (houseId) {
                    // if ($scope.fitRulesCheckedAlert($htNgCommUtil.getSimpleListCheckedNum($scope.${moduleName}Model.dataListDetail), false)) {
                    //     var objList = $scope.getSelectedList($scope.${moduleName}Model.dataListDetail);
                    //     $scope.${moduleName}Model.houseDetailCtrl.showCurrentModal(objList);
                    //     $scope.${moduleName}Model.checkAllState = false;
                    // }
                    $scope.${moduleName}Model.complaintDetailCtrl.showCurrentModal(houseId);
                }
                /**
                 * 点击查看投诉信息
                 */
                $scope.viewComplaintActionByButton = function () {
                    if ($scope.fitRulesCheckedAlert($htNgCommUtil.getSimpleListCheckedNum($scope.${moduleName}Model.dataListDetail), false)) {
                        var objList = $scope.getSelectedList($scope.${moduleName}Model.dataListDetail);
                        $scope.${moduleName}Model.complaintDetailCtrl.showCurrentModal(objList[0].houseId);
                        $scope.${moduleName}Model.checkAllState = false;
                    }
                };
            
            });`
        }]
    };

    let componentPath = path.join(moduleFolderPath, "view", `${moduleName}01`);

    let compontentFolderPath = path.join(componentPath, `${firstModuleName}${firstComponentName}`);

    if (fs.existsSync(compontentFolderPath)) {
        // throw new Error("模块组件已经存在");
        return Promise.reject("模块组件已经存在");
    }

    let cssPromise = createAllFileByTree(componentPath, componentFileTree);
    return cssPromise;
};

const createList1 = function(moduleName, componentName) {
    if (moduleName === "") {
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
    let componentChildPath = `${moduleName}${firstComponentName}/htNg${firstModuleName}${firstComponentName}Ctrl.js`;

    let createPromise = initList(moduleName, componentName, htpagesPath);
    let parserPromise = parserIndependence(moduleName, componentChildPath, htpagesPath);
    return Promise.all([createPromise, parserPromise]);
};

module.exports.createList1 = createList1;
