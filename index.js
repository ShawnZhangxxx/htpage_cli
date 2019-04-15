#!/usr/bin/env node

const { initAllModule } = require("./lib/initModule/initModule");
const { createComponent } = require("./lib/createComponent/createComponent");
const { createList } = require("./lib/createListPage/createListPage");
const { createQuery } = require("./lib/createQuery/createQuery");

let command = process.argv[2];
let moduleName = process.argv[3];
let componentName = process.argv[4];

let resPromise;

switch (command) {
    case "--module":
    case "-m":
        if (typeof moduleName !== "string") {
            console.log("请输入正确的模块名称");
        } else {
            resPromise = initAllModule(moduleName);
        }
        break;
    case "--compontent":
    case "-c":
        if (typeof moduleName !== "string") {
            console.log("请输入正确的模块名称");
        } else if (typeof componentName !== "string") {
            console.log("请输入正确的弹出层名称");
        } else {
            resPromise = createComponent(moduleName, componentName);
        }
        break;
    case "--query":
    case "-q":
        if (typeof moduleName !== "string") {
            console.log("请输入正确的模块名称");
        } else if (typeof componentName !== "string") {
            console.log("请输入正确的高级搜索组件名称");
        } else {
            resPromise = createQuery(moduleName, componentName);
        }
        break;
    case "--list":
    case "-l":
        if (typeof moduleName !== "string") {
            console.log("请输入正确的模块名称");
        } else if (typeof componentName !== "string") {
            console.log("请输入正确的弹出层名称");
        } else {
            resPromise = createList(moduleName, componentName);
        }
        break;
    default:
        console.log("请输入正确的命令：\r\n" +
            "-m 参数：moduleName；功能：创建模块\r\n" +
            "-q 参数：moduleName queryName；功能：创建高级搜索组件\r\n" +
            // "-b 参数：moduleName；功能：创建后台文件\n" +
            "-c 参数：moduleName componentName；功能：创建弹出层\r\n" +
            "-l 参数：moduleName pageName；功能：创建列表\r\n");
};
if (resPromise) {
    resPromise.then(() => {
        console.log("创建成功");
    }).catch((error) => {
        console.log(error);
    });
}

// process.on("exit", (code) => {
//     console.log(`即将退出，退出码：${code}`);
// });