const path = require("path");
const fs = require("fs");
const { createAllFileByTree } = require("../util/createAllFileUtil");
const pathJson = require("../../htoaPath.json");
const { initHtpagesPath } = require("../util/pathUil");
const { parserIndependence } = require("./parserQuery");

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
            childAry: [{
            name: `htNgPt${firstModuleName}${firstComponentName}.html`,
            isFolder: 0,
            fileContent: `<div id="popover-content-div">
            <div class="advance_query_all_div">
                <div>
                    <!--第一行-->
                    <div class="advance_query_line_div">
                        <!--查询标题1-->
                        <htng-query-line query-title={{"查询标题1"}}>
                            <htng-input-direct text-show-value="queryModel.info1"
                                               input-width={{queryCtrl.getSearchInputWidth()}}></htng-input-direct>
                        </htng-query-line>
            
                        <!-- 查询标题2-->
                        <htng-query-line query-title={{"查询标题2"}}>
                        <htng-list default-key={{queryModel.aaaSelectKey}}
                            select-acion="aaaSelectAction(name,checkedKey)"
                            hide-type="false"
                            list-data="aaaSelectList"
                            list-width="150px"
                            list-title-width="150px"
                            list-title-height="25px" define-value-flag="true">
                        </htng-list>
                        </htng-query-line>
                    </div>
                    <!--第二行-->
                    <div class="advance_query_line_div">
                        <!-- 时间-->
                        <htng-query-line query-title={{"时间"}}>
                            <div class="comm_inline_block ">
                            <htng-time-picker time-value="queryModel.startDate" format="-"
                                              date-type="date" time-width="100px"
                                              time-height="30px"></htng-time-picker>
                            </div>
                            <div class="comm_inline_block b-t-1" style="border-top: 1px solid #999;
                                width: 10px;margin-bottom: 12px;" >
                            </div>
                            <div class="comm_inline_block ">
                                <htng-time-picker time-value="queryModel.endDate" format="-"
                                                  date-type="date" time-width="100px"
                                                  time-height="30px"></htng-time-picker>
                            </div>
                        </htng-query-line>
                        <!--人-->
                        <htng-query-line query-title={{"人"}}>
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
                                init-selected-id="">
                            </htng-select-user>
                        </htng-query-line>
                    </div>
                    <!--第三行-->
                    <div class="advance_query_line_div">
                        <!-- -->
                        <htng-query-line query-title={{""}}>
                    
                        </htng-query-line>
                    </div>
                </div>
                <htng-query-bottom query-ctrl="queryCtrl" query-action="queryDataAction()"
                                   reset-action="resetDataAction()"></htng-query-bottom>
            </div>
            </div>`
        }]}, {
            name: `htNgPt${firstModuleName}${firstComponentName}.js`,
            isFolder: 0,
            fileContent: `
            oaApp.directive("htNg${firstModuleName}${firstComponentName}", function ($timeout,$htNgCommUtil) {
               return {
                   restrict: "E",
                   templateUrl: getCommComponentPath() + "/query/htNgPtQueryBack.html?" + versionToken,
                   replace: true,
                   scope: {
                       queryModel: '=',// 搜索对象
                       queryAction: '&',// 查询方法
                       cancelAction: '&',// 取消方法
                       queryCtrl: "=" //搜索管理对象=
                   },
                   link: function (scope, iEle, attr) {
                       scope.showInfo = {};
                       var modalWillShow = function () {
                           scope.queryModel.titleOrContent="";
                        /****************************搜索栏aaa下拉列表****************************/
                        scope.queryModel.aaaSelectKey = -1;
                        scope.aaaSelectList = [
                            {
                                value: [
                                    {key: "-1", name: "请选择"},//请选择aaa
                                    {key: "1", name: "bbb"},//bbb
                                    {key: "2", name: "ccc"}//ccc
                                ]
                            }
                        ];
                        scope.aaaSelectAction = function (name, checkedKey) {
                            scope.queryModel.aaaSelectName = name;
                            scope.queryModel.aaaSelectKey = checkedKey;
                        };
                       };
                       scope.queryCtrl = $htNgCommUtil.commNewQueryCtrl($(iEle),
                           get${firstModuleName}ComponentPath() + "/${componentName}/htNgPt${firstModuleName}${firstComponentName}.html", modalWillShow);
                    

                       /**
                        * 搜索重置方法
                        */
                       scope.resetDataAction = function () {
                           scope.queryModel.info1="";
                           scope.queryModel.info2="";
                           scope.queryModel.info3="";
                           scope.queryModel.timeListValue="";
                           scope.queryModel.queryStartDate="";
                           scope.queryModel.queryEndDate="";
                       };
            
                       //点击搜索按钮
                       scope.queryDataAction = function () {
                           scope.queryAction({queryObj: scope.queryModel});
                           scope.queryCtrl.closeCurrentQueryPage();
                       };
            
                       /**
                        * 搜索时间方法
                        * @param name 下拉列表名
                        * @param starTime 开始时间
                        * @param endTime 结束时间
                        */
                       scope.querySendTime = function (name, starTime, endTime, selectedModel) {
                           scope.queryModel.queryStartDate = starTime;
                           scope.queryModel.queryEndDate = endTime;
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

const createQuery = function(moduleName, componentName) {
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

module.exports.createQuery = createQuery;