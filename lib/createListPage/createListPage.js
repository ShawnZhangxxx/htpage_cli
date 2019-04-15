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
                 <!--<div class="button_space">
                    <div class="button_space">
                        <htng-button-direct mode="sheetAll" button-name=导入
                                        button-action="importAction()"></htng-button-direct>
                    </div>
                    <div class="button_space">
                        <htng-export call-back="exportAction(exportType)" id=""></htng-export>
                    </div>
                </div>-->
                 <div class="right m-r-20">
                     <table>
                         <tr>
                         <td class="p-l-10">
                         <div class="m-t-3 left m-r-5">
                             <ht-ng-label-direct message={{'事件主题'}}></ht-ng-label-direct>
                         </div>
                         <div class="comm_inline_block ">
                             <htng-input-direct text-show-value="queryModel.aaaame"
                                                input-width="100" input-height="25"></htng-input-direct>
                         </div>
                     </td>
                     <td class="p-l-10">
                         <div class="left m-t-3 m-r-5">
                             <ht-ng-label-direct message={{'上报人'}}></ht-ng-label-direct>
                         </div>
                         <div class="comm_inline_block">
                             <htng-select-user user-id-str="queryModel.userIdList"
                                               selected-data-ary="queryModel.userAry"
                                               select-user-flg="true"
                                               select-dept-flg="false"
                                               select-post-flg="false"
                                               select-contact-flg="false"
                                               select-all-flg="false" input-width="180px"
                                               muti-line-flg="true" animation-flg="true"
                                               show-title="" single-select="true"
                                               select-all-flg="false"
                                               init-selected-id=""
                             >
                             </htng-select-user>
                         </div>
                     </td>
                     <td class="p-l-10">
                         <div class="m-t-3 left m-r-5">
                             <ht-ng-label-direct message={{'表单编号'}}></ht-ng-label-direct>
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
                             
                             <td>
                                 <div class="button_space_left">&nbsp;</div>
                                 <htng-button-direct mode="sheetAll" button-name={{'搜索'}}
                                                     button-action="searchAction()"></htng-button-direct>
                             </td>
                         </tr>
                     </table>
                 </div>
        </div>
        <!--主列表-->
        <div class="scroll_init_content table_list_width" ng-style="getTableListHeight()">
        <div class="comm_list_table_title_div">
            <table class="comm_list_head_table comm_list_head_table_fixed">
                <tr htng-list-titletr>
                    <td width="40px" class="list_table_checkbox_title" >
                        <htng-checkbox item-obj="" click-method="clickCheckAll(checkFlg,clickObj)"
                                       checked-state="${modalName}Model.checkAllState"></htng-checkbox>
                    </td>
                    <td htng-td show-style="table_text_blod " words="{{'事件主题'}}" width="20%"></td>
                    <td htng-sort-td sort-action="clickSortAction()"
                        order-name="name" sort-ctrl="incidentReport0101Model.pageSelectorCtrl"
                        show-title={{'上报人'}}
                        width="20%"></td>
                    <td htng-td show-style="table_text_blod "
                        words="{{'表单编号'}}"
                        width="20%"></td>
                    <td htng-td show-style="table_text_blod "
                        words="{{'所在部门'}}"
                        width="20%"></td>
                    <td htng-td show-style="table_text_blod "
                        words="{{'发生地'}}"
                        width="20%"></td>
                    <td htng-td show-style="table_text_blod "
                        words="{{'事件等级'}}"
                        width="20%"></td>
                    <td htng-td show-style="table_text_blod "
                        words="{{'当前步骤'}}"
                        width="20%"></td>
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
                    <td width="20%"></td>
                </tr>
                <tr htng-list-content-tr ng-repeat="item in ${modalName}Model.dataList" tr-data="item">
                    <td width="40px" class="list_table_content_checkbox">
                        <htng-checkbox item-obj="item" click-method="clickListCheckItem(checkFlg,clickObj)"
                                       checked-state="item.$$checkFlg"></htng-checkbox>
                    </td>
                    <td htng-list-content-td>
                        <div htng-show-all-content pointerFlg="false" content-action="traceAction()"
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
                    <td htng-list-content-td>
                      <div htng-show-all-content pointerFlg="false"
                          content={{item.content6}}>
                      </div>
                    </td>
                    <td htng-list-content-td>
                      <div htng-show-all-content pointerFlg="false"
                          content={{item.content7}}>
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
            data.content1 = "着火";
            data.content2 = "张三";
            data.content3 = "12346";
            data.content4 = "技术";
            data.content5 = "上海";
            data.content6 = "1";
            data.content7 = "灭火";
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

   /*调审批单*/
   $scope.traceAction = function(){
          var tabId =  "../../../trace/view/trace05/trace0503/htNgTrace0503.html";
          var tabDataId = "2aff40af7a3243dc8fa9be29";
          var tabName = "调薪申请单";
          var tabLoadData = {};
          tabLoadData.traceInstanceIndexId = "69620028920b470e8b3d0c84";
          tabLoadData.contentMemo = "<style>\r\n .tdbackgr {text-align:center;background: rgb(243, 243, 243);color: #666666; font-size:14px; font-family: Microsoft YaHei; } .tdclor { text-align:center;color: #666666;\r\n font-size:14px; font-family: Microsoft YaHei;} .tdwdft {text-align:left; color:#666666;font-size:14px; font-family: Microsoft YaHei;}#leavehistory td{ border:solid\r\n 1px #dddddd ; padding-left:5px;}</style>\r\n<center><span style=\"color: rgb(0, 0, 0); font-size: 20pt;\">调薪申请单</span><center><table width=\"720\" height=\"\" align=\"center\" bordercolor=\"#dddddd\" style=\"border-collapse: separate;\" bgcolor=\"#ffffff\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tbody><tr> <td width=\"80\" height=\"30\" class=\"tdclor\" style=\"border-color: rgb(221, 221, 221);\" bgcolor=\"\">编号</td> <td height=\"20\" class=\"tdwdft\" style=\"border-color: rgb(221, 221, 221);\">&nbsp;<input name=\"编号\" title=\"编号\" class=\"InputStyle_Edit\" id=\"MAFO_3\" datafld=\"SYS_SEL_AUTONUM\" type=\"hidden\" value=\"编号{自动流水号}\" fieldtype=\"2\" fieldlength=\"255\" sql=\"0\" relation=\"\" fieldtitle=\"bh\" defaulttruevalue=\"\" manydictnum=\"0\" tempforautonum=\" \" defaultshowvalue=\"\" showstyle=\"\" mobileid=\"0353748288\"> </td> <td width=\"100\" height=\"20\" class=\"tdclor\" style=\"border-color: rgb(221, 221, 221);\" bgcolor=\"\">申请日期</td> <td width=\"140\" height=\"20\" class=\"tdclor\" style=\"border-color: rgb(221, 221, 221);\" bgcolor=\"\"><input name=\"申请日期\" title=\"申请日期\" class=\"InputStyle_Edit\" id=\"MAFO_4\" datafld=\"SYS_SEL_DATE\" type=\"hidden\" value=\"申请日期{日期选择}\" fieldtype=\"3\" fieldlength=\"255\" sql=\"\" relation=\"\" fieldtitle=\"sqrq\" defaulttruevalue=\"\" manydictnum=\"\" tempforautonum=\"\" defaultshowvalue=\"\" showstyle=\"yyyy-MM-dd\" mobileid=\"1030536637\"> </td></tr></tbody></table></center><center><table width=\"720\" height=\"\" align=\"center\" bordercolor=\"#dddddd\" style=\"border-style: solid; border-collapse: collapse;\" bgcolor=\"#ffffff\" border=\"1\" cellspacing=\"0\" cellpadding=\"1\"><tbody><tr> <td width=\"120\" height=\"40\" class=\"tdbackgr\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\">申请部门</td> <td width=\"160\" height=\"20\" class=\"tdclor\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\"><input name=\"申请部门\" title=\"申请部门\" class=\"InputStyle_Edit\" id=\"MAFO_2\" datafld=\"SYS_SEL_CREATERDEPT\" type=\"hidden\" value=\"申请部门{申请人部门}\" fieldtype=\"2\" fieldlength=\"255\" sql=\"\" relation=\"\" fieldtitle=\"app_dept\" defaulttruevalue=\"\" manydictnum=\"\" tempforautonum=\"\" defaultshowvalue=\"\" showstyle=\"\" mobileid=\"4564858318\"> </td> <td width=\"100\" height=\"20\" class=\"tdbackgr\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\">申请人</td> <td width=\"120\" height=\"20\" class=\"tdclor\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\"><input name=\"申请人\" title=\"申请人\" class=\"InputStyle_Edit\" id=\"MAFO_1\" datafld=\"SYS_SEL_CREATERNAME\" type=\"hidden\" value=\"申请人{申请人姓名}\" fieldtype=\"2\" fieldlength=\"255\" sql=\"\" relation=\"\" fieldtitle=\"app_person\" defaulttruevalue=\"\" manydictnum=\"\" tempforautonum=\"\" defaultshowvalue=\"\" showstyle=\"\" mobileid=\"3015609597\"> </td> <td width=\"100\" height=\"20\" class=\"tdbackgr\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\">调薪科目</td> <td width=\"120\" height=\"20\" class=\"tdclor\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\"><input name=\"薪资科目\" title=\"薪资科目\" class=\"InputStyle_Edit\" id=\"MAFO_7\" datafld=\"SYS_SEL_SQL\" type=\"hidden\" value=\"薪资科目[item_cn] {SQL字段}\" fieldtype=\"2\" fieldlength=\"255\" sql=\"select salary_item_id,item_cn from salary_item where item_type=3\" relation=\"\" fieldtitle=\"app_item\" defaulttruevalue=\"salary_item_id\" defaultshowvalue=\"item_cn\" showstyle=\"\" mobileid=\"2403704925\" itemsplit=\"\" sqlshowstyle=\"list\"> </td></tr><tr> <td height=\"80\" class=\"tdbackgr\" style=\"border-style: solid; border-color: rgb(221, 221, 221); padding-left: 10px;\" bgcolor=\"\">调薪说明</td> <td height=\"20\" class=\"tdwdft\" style=\"border-style: solid; border-color: rgb(221, 221, 221); padding-left: 5px; -ms-word-break: break-all; -ms-word-wrap: break-word;\" colspan=\"5\"><input name=\"备注\" title=\"备注\" class=\"InputAreaStyle_Edit\" id=\"MAFO_5\" datafld=\"textarea\" style=\"width: 99.28%; height: 75px;\" type=\"hidden\" fieldtype=\"5\" fieldlength=\"255\" fieldtitle=\"bz\" defaultshowvalue=\"\" showstyle=\"\" jsmethod=\"COMMNoSelect\" jsfounction=\"\"> </td></tr><tr> <td height=\"30\" class=\"tdwdft\" style=\"background: rgb(243, 243, 243); border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\" colspan=\"6\"><table width=\"720\" height=\"\" align=\"center\" bordercolor=\"#dddddd\" style=\"background: rgb(243, 243, 243); border-collapse: separate;\" bgcolor=\"#ffffff\" border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tbody><tr><td width=\"150\" height=\"20\" class=\"tdwdft\" style=\"border-color: rgb(221, 221, 221); padding-left: 10px;\" bgcolor=\"\">调薪详情</td><td height=\"30\" style=\"border-color: rgb(221, 221, 221);\" bgcolor=\"\"></td><td width=\"150\" height=\"20\" style=\"border-color: rgb(221, 221, 221); text-align: right; padding-right: 5px;\" bgcolor=\"\"><input title=\"调薪人员选择\" class=\"ButtonStyle\" id=\"MAFO_6\" datafld=\"SYS_BUTTON_SEARCH\" type=\"hidden\" value=\"调薪人员选择\" fieldtype=\"2\" fieldlength=\"1\" defaultshowvalue=\"SalarMacroView000001BEN2\" showstyle=\"调薪单选择人员\" mobileid=\"4791905502\" otherinfo=\"人员名称[staff_name];工号[staff_number];员工部门[dept_name];员工岗位[role_name];调整前金额[fix_money]\" a_label=\"no\" formula=\"salary_item_id='[薪资科目]{saveValue}'\" trace_onclick=\"clickSearchButton(this);\"></td></tr></tbody></table> </td></tr><tr> <td height=\"20\" class=\"tdclor\" style=\"border-style: solid; border-color: rgb(221, 221, 221); padding: 5px; -ms-word-break: break-all; -ms-word-wrap: break-word;\" colspan=\"6\"><input id=\"0\" datafld=\"ListTable\" type=\"hidden\" stylecsstext=\"\" stylecssname=\"\" txttotal=\"\" defaultrow=\"\" rowheight=\"\" tblmemo='{\"cols\":[{\"fieldName\":\"人员名称\",\"fieldType\":\"2\",\"fieldLength\":\"50\",\"fieldDefault\":\"\",\"fieldTitle\":\"user_name\",\"fieldStyle\":\"\",\"showType\":\"TEXT\",\"showWidth\":\"\",\"showAlign\":\"center\",\"otherInfo\":\"{\\\"list\\\":\\\"\\\",\\\"relation\\\":\\\"\\\",\\\"awoke\\\":\\\"\\\"}\",\"jsFunction\":\"\",\"fieldHeadName\":\"\",\"listTableName\":\"salary_change_detail\",\"listTableId\":\"list_salary_change_detail_id\"},{\"fieldName\":\"工号\",\"fieldType\":\"2\",\"fieldLength\":\"50\",\"fieldDefault\":\"\",\"fieldTitle\":\"job_no\",\"fieldStyle\":\"\",\"showType\":\"TEXT\",\"showWidth\":\"\",\"showAlign\":\"right\",\"otherInfo\":\"{\\\"list\\\":\\\"\\\",\\\"relation\\\":\\\"\\\",\\\"awoke\\\":\\\"\\\",\\\"relationMR\\\":\\\"\\\",\\\"awokeMR\\\":\\\"\\\"}\",\"jsFunction\":\"\",\"fieldHeadName\":\"员工工号\",\"listTableName\":\"salary_change_detail\",\"listTableId\":\"list_salary_change_detail_id\"},{\"fieldName\":\"员工部门\",\"fieldType\":\"2\",\"fieldLength\":\"50\",\"fieldDefault\":\"\",\"fieldTitle\":\"dept_name\",\"fieldStyle\":\"\",\"showType\":\"TEXT\",\"showWidth\":\"\",\"showAlign\":\"left\",\"otherInfo\":\"{\\\"list\\\":\\\"\\\",\\\"relation\\\":\\\"\\\",\\\"awoke\\\":\\\"\\\",\\\"relationMR\\\":\\\"\\\",\\\"awokeMR\\\":\\\"\\\"}\",\"jsFunction\":\"\",\"fieldHeadName\":\"员工部门\",\"listTableName\":\"salary_change_detail\",\"listTableId\":\"list_salary_change_detail_id\"},{\"fieldName\":\"员工岗位\",\"fieldType\":\"2\",\"fieldLength\":\"50\",\"fieldDefault\":\"\",\"fieldTitle\":\"post_name\",\"fieldStyle\":\"\",\"showType\":\"TEXT\",\"showWidth\":\"\",\"showAlign\":\"left\",\"otherInfo\":\"{\\\"list\\\":\\\"\\\",\\\"relation\\\":\\\"\\\",\\\"awoke\\\":\\\"\\\",\\\"relationMR\\\":\\\"\\\",\\\"awokeMR\\\":\\\"\\\"}\",\"jsFunction\":\"\",\"fieldHeadName\":\"员工岗位\",\"listTableName\":\"salary_change_detail\",\"listTableId\":\"list_salary_change_detail_id\"},{\"fieldName\":\"调整前金额\",\"fieldType\":\"1\",\"fieldLength\":\"50\",\"fieldDefault\":\"0.00\",\"fieldTitle\":\"adjust_befor\",\"fieldStyle\":\"#.##\",\"showType\":\"TEXT\",\"showWidth\":\"\",\"showAlign\":\"right\",\"otherInfo\":\"{\\\"list\\\":\\\"\\\",\\\"relation\\\":\\\"\\\",\\\"awoke\\\":\\\"\\\"}\",\"jsFunction\":\"\",\"fieldHeadName\":\"\",\"listTableName\":\"salary_change_detail\",\"listTableId\":\"list_salary_change_detail_id\"},{\"fieldName\":\"调整后金额\",\"fieldType\":\"1\",\"fieldLength\":\"50\",\"fieldDefault\":\"0.00\",\"fieldTitle\":\"adjust_after\",\"fieldStyle\":\"#.##\",\"showType\":\"TEXT\",\"showWidth\":\"\",\"showAlign\":\"right\",\"otherInfo\":\"{\\\"list\\\":\\\"\\\",\\\"relation\\\":\\\"\\\",\\\"awoke\\\":\\\"\\\"}\",\"jsFunction\":\"\",\"fieldHeadName\":\"\",\"listTableName\":\"salary_change_detail\",\"listTableId\":\"list_salary_change_detail_id\"}]}' tablehasnum=\"false\" listtablename=\"salary_change_detail\"> </td></tr><tr> <td height=\"80\" class=\"tdbackgr\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\">总经理审批</td> <td height=\"20\" class=\"tdwdft\" style=\"border-style: solid; border-color: rgb(221, 221, 221); padding-left: 5px; -ms-word-break: break-all; -ms-word-wrap: break-word;\" colspan=\"5\"> </td></tr><tr> <td height=\"80\" class=\"tdbackgr\" style=\"border-style: solid; border-color: rgb(221, 221, 221);\" bgcolor=\"\">人事审批</td> <td height=\"20\" class=\"tdwdft\" style=\"border-style: solid; border-color: rgb(221, 221, 221); padding-left: 5px; -ms-word-break: break-all; -ms-word-wrap: break-word;\" colspan=\"5\"> </td></tr></tbody></table><br></center>\r\n</center><textarea name=\"javascript\" style=\"display: none;\"></textarea>";
          $scope.tabCtrl.newNewLoadDataTabModel(tabId, tabName, tabDataId, tabLoadData, $scope.baseCtrlModel.clickTabSource);
   };

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
