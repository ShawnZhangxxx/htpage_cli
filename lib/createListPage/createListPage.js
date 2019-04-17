const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserListPage");

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
        <div ng-controller="htNg${firstModuleName}${firstComponentName}Ctrl" class="list_out_frame_div">
        <htng-page-comm-head module-id="${firstModuleName}"
                  title-mark="0"
                      page-title="标题"></htng-page-comm-head>
                      <div class="comm_list_top_button">
                 <div class="button_space_left">&nbsp;</div>
                 <div class="button_space">
                     <htng-button-direct mode="sheetAll" button-name="{{'删除'}}"
                                         button-action="deleteAction()"></htng-button-direct>
                 </div>
                 <div class="button_space">
                    <div class="button_space">
                        <htng-button-direct mode="sheetAll" button-name=导入
                                        button-action="importAction()"></htng-button-direct>
                    </div>
                </div>
                 <div class="right m-r-20">
                     <table>
                         <tr>
                             <td class="p-l-10">
                                 <div class="m-t-3 left m-r-5">
                                   <ht-ng-label-direct message={{'单号'}}></ht-ng-label-direct>
                                 </div>
                                 <div class="comm_inline_block ">
                                 <htng-input-direct text-show-value="queryModel.aaaame"
                                     input-width="100" input-height="25"></htng-input-direct>
                                 </div>
                             </td>
                             <td>
                                 <div class="button_space_left">&nbsp;</div>
                                 <htng-button-direct mode="sheetAll" button-name={{'搜索'}}
                                                     button-action="searchAction()"></htng-button-direct>
                             </td>
                         </tr>
                     </table>
                 </div>
        </div>
        <ht-ng-${moduleName}-query
            query-action="searchAction()"
            query-model="queryModel"
            query-ctrl="${moduleName}Model.queryCtrl"
            tab-special-mark="tabSpecialMark"
        ></ht-ng-${moduleName}-query>
        <!--主列表-->
        <div class="scroll_init_content table_list_width" ng-style="getTableListHeight()">
        <div class="comm_list_table_title_div">
            <table class="comm_list_head_table comm_list_head_table_fixed">
                <tr htng-list-titletr>
                    <td width="40px" class="list_table_checkbox_title" >
                        <htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"
                                       checked-state="${modalName}Model.checkAllState"></htng-checkbox>
                    </td>
                    <td htng-td show-style="table_text_blod "words="{{'员工编号'}}" width="20%"></td>
                    <td htng-sort-td sort-action="clickSortAction()"
                        order-name="name" sort-ctrl="${modalName}Model.pageSelectorCtrl"
                        show-title={{'月度奖金'}}
                        width="20%"></td>
                    <td htng-td show-style="table_text_blod "
                        words="{{'额外奖金金额'}}"
                        width="20%"></td>
                    <td htng-td show-style="table_text_blod "
                        words="{{'备注'}}"
                        width="20%"></td>
                    <td width="20%">
                        <div style="height: 30px; width: 100%;margin-top: 0;padding-top: 1px;" >
                            <htng-td-list default-value="${modalName}Model.stateName"
                                          list-data="${modalName}Model.stateList" show-id="showId"
                                          select-acion="stateListCallBack(name,checkedKey)"
                                          list-title-height="30px"
                                          list-width="150px"
                                          list-title-width="150px"
                                          define-value-flag="true"></htng-td-list>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="scroll_init_content hide_beyond_content" ng-style="getTableListContentHeight()">
            <table id="contentTableId" cellpadding="0" cellspacing="0" class="list_table"
                   data-ng-init="loadPageToInitScroll()">
                <tr height="0">
                    <td width="40px"></td>
                    <td width="20%"></td>
                    <td width="20%"></td>
                    <td width="20%"></td>
                    <td width="20%"></td>
                    <td width="20%"></td>
                    <td width="20%"></td>
                </tr>
                <tr htng-list-content-tr ng-repeat="item in ${modalName}Model.dataList" tr-data="item">
                    <td width="40px" class="list_table_content_checkbox">
                        <htng-checkbox item-obj="item" click-method="clickListCheckItem(checkFlg,clickObj)"
                                       checked-state="item.$$checkFlg"></htng-checkbox>
                    </td>
                    <td htng-list-content-td>
                        <div htng-show-all-content pointerFlg="false" content-action=""
                            content={{item.content1}}>
                        </div>
                    </td>
                    <td htng-list-content-td>
                        <div htng-show-all-content pointerFlg="false"
                          content={{item.content2}}>
                        </div>
                    </td>
                    <td htng-list-content-td>
                      <div htng-show-all-content pointerFlg="false"
                          content={{item.content3}}>
                      </div>
                    </td>
                    <td htng-list-content-td>
                      <div htng-show-all-content pointerFlg="false"
                          content={{item.content4}}>
                      </div>
                    </td>
                    <td htng-list-content-td>
                      <div htng-show-all-content pointerFlg="false"
                          content={{item.content5}}>
                      </div>
                    </td>
                </tr>
            </table>
        </div>
        </div>
        <!--翻页部品-->
        <htng-pt-page-selector page-ctrl="${modalName}Model.pageSelectorCtrl" method="pageAction()"></htng-pt-page-selector>
        <!--导入-->
        <htng-import import-action="importActionFile(file)"
                     download-action="downloadAddressAction()" modal-ctrl="${modalName}Model.importCtrl"></htng-import>
        <htng-page-comm-bottom></htng-page-comm-bottom>
        </div>`
                }
        ]
    }, {
            name: `htNg${firstModuleName}${firstComponentName}Ctrl.js`,
            isFolder: 0,
            fileContent: `
oaApp.controller("htNg${firstModuleName}${firstComponentName}Ctrl", function($scope, $controller, $htNg${firstModuleName}01Manager,
    $htNgCommUtil, $alertService) {
    // 继承父controller
    angular.extend(this, $controller('htNgListCtrl', { $scope: $scope }));

    $scope.${modalName}Model = {};

    $scope.${modalName}Model.pageSelectorCtrl = new PageSelectorCtrl();

    $scope.${modalName}Model.dataList = [];

    $scope.queryModel = {};

    $scope.${modalName}Model.stateName = "正在进行的流程";
    $scope.${modalName}Model.statetId = "";
    $scope.${modalName}Model.stateList = [{value:[
        {key:"",name:"全部"},
        {key:"1",name:"已完成"},
        {key:"2",name:"未通过"},
        {key:"3",name:"审批中"},
        {key:"4",name:"未发送"},
        {key:"5",name:"已撤销"},
        {key:"6",name:"已退回"},
    ]}];

    /****************************搜索栏aaa下拉列表****************************/
    $scope.queryModel.aaaSelectKey = -1;
    $scope.aaaSelectList = [
        {
            value: [
                  {key: "-1", name: "请选择"},//请选择aaa
                    {key: "1", name: "bbb"},//bbb
                    {key: "2", name: "ccc"}//ccc
                  ]
        }
    ];
    $scope.aaaSelectAction = function (name, checkedKey) {
        $scope.queryModel.aaaSelectName = name;
        $scope.queryModel.aaaSelectKey = checkedKey;
    };


    //数据刷新
    $scope.listRefresh = function() {
        var callback = function(dataList) {
            $scope.${modalName}Model.pageSelectorCtrl.totalItems = 5;
            $scope.${modalName}Model.dataList = dataList
        };
        var tempDataList = [];
        for (var i = 0; i < 5; i++) {
            var data = {};
            data.id = "id" + i;
            data.content1 = "110010023";
            data.content2 = "100";
            data.content3 = "100";
            data.content4 = "无";
            data.content5 = "待审";
            tempDataList.push(data);
        }
        callback(tempDataList);
        //$htNg${modalName}Manager.fetch${modalName}List($scope..queryModel, '', callback, $scope.${modalName}Model.pageSelectorCtrl);
    };
    //获取id字符串
   $scope.getSelectedIdListStr = function (dataList) {
       var selectIdStr = "";
       for (var j = 0; j < dataList.length; j++) {
           var dataObj = dataList[j];
           if (dataObj.$$checkFlg) {
               selectIdStr += dataObj.${modalName}Id+ ";"
           }
       }
       return selectIdStr;
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
       $scope.clickListCheckAll(checkFlg, false, $scope.${modalName}Model.dataList);
   };

   /*增加方法*/
   $scope.addAction = function(){
       $scope.${modalName}Model.newModel.showCurrentModal();
   }

   /*修改方法*/
   $scope.modifyAction = function(){
       if ($scope.fitRulesCheckedAlert($htNgCommUtil.getSimpleListCheckedNum($scope.${modalName}Model.dataList), false)) {
           var idList = $scope.getSelectedIdListStr($scope.${modalName}.dataList);
           $scope.${modalName}Model.newModel.showCurrentModal(idList);
           $scope.${modalName}Model.checkAllState = false;
       }
   }

   /*删除方法 多删*/
   $scope.deleteAction = function(){
       if ($scope.fitRulesCheckedAlert($htNgCommUtil.getSimpleListCheckedNum($scope.${modalName}Model.dataList), true)) {
           var idList = $scope.getSelectedIdListStr($scope.${modalName}Model.dataList);
           $htNg${firstModuleName}01Manager.delete${firstModuleName}Action(idList, $scope.listRefresh);
           $scope.${modalName}Model.checkAllState = false;
       }
   }

   /***
    * 导入的操点击方法
    */
   $scope.importAction = function () {
       $scope.${modalName}Model.importCtrl.showCurrentModal();
   };

   /*导入回调*/
   var importActionCallBack = function (info) {
       $alertService.commAlert("上传成功",ALERT_SUCCESS);
       $scope.listRefresh();
       $scope.${modalName}Model.importCtrl.closeCurrentModal();
   };
   /**
    * 导入方法
    */
   $scope.importActionFile = function (file) {
       var attachmentList =$htNgCommUtil.transferImportFileToAttachmentList(file);
       //$htNg${firstModuleName}01Manager.actImportSummaryBtn( jsonToString(attachmentList),"",importActionCallBack);
   };

   /**
    * 导出方法
    */
   $scope.exportAction = function(exportType) {
       var exportMaintenanceCallback = function(path, fileName){
           $htNgCommUtil.showDownloadFilePath(path, fileName);
       };
       var chooseArr = $htNg${firstModuleName}Util.getSelectedList($scope.${modalName}Model.dataList);
       if(exportType == "choose") {//导出指定
           /*$htNg${firstModuleName}01Manager.doExportTopicBtn(idArr, $scope.${modalName}QueryModel.mettingTopic,
            "","", exportMaintenanceCallback);*/
           if(chooseArr.length == 0) {
               $alertService.commAlert("请选择数据后再进行本次操作");
           } else {
               //$htNgMetting01Manager.doExportTopicBtn(idArr,$scope.metting01QueryModel.mettingTopic,
               //    "","",exportMaintenanceCallback);
           }
       } else{//导出全部
           //$htNgMetting01Manager.doExportTopicBtn("",$scope.metting01QueryModel.mettingTopic,
           //    "","",exportMaintenanceCallback);
       }
       $scope.${modalName}Model.checkAllState = false;
   };

   /**
    *  搜索
    */
   $scope.searchAction = function () {
       $scope.${modalName}Model.pageSelectorCtrl.returnToFirstPage();
       $scope.listRefresh();
   };

    /**
    *  点击返回 上级菜单
    */
   /*$scope.backAction = function () {
       $scope.goBackToMenu();
   };
   */
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

const createList = function(moduleName, componentName) {
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

module.exports.createList = createList;
