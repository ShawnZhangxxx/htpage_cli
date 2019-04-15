const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

/**
 * 按照路径树建立文件或文件夹
 * @param {*} rootPath 根路径
 * @param {*} pathTree 路径树。格式为：
 *     {
            name: string,
            isFolder: number,(1 or 0)
            childAry: [{
                name: string,
                isFolder: number,
            }, {
                name: string,
                isFolder: number,
                fileContent：string
            }]
        }
 *    
 */
const createAllFileByTree = function(rootPath, pathTree) {
    // console.log(rootPath);
    let currentStatus = {
        fileCount: 0,
        fileReadyCount: 0,
        folderCount: 0,
        folderReadyCount: 0,
    };

    //深度优先
    const create = function(fileObj, parentPath, callBack) {
        const createDeatil = function(fileObj, parentPath) {
            let currentPath = path.join(parentPath, fileObj.name);
            if (fileObj.isFolder === 1) {
                createFolder(currentPath, fileObj);
            } else {
                const filePromise = createFile(currentPath, fileObj);
                filePromise.then(() => {
                    currentStatus.fileReadyCount++;
                    if (currentStatus.fileReadyCount === currentStatus.fileCount) {
                        // console.log("createAllFileSuccess");
                        callBack();
                    }
                }).catch((error) => {
                    console.error(error);
                    callBack(error);
                });
            }
        };

        const createFolder = function(currentPath, fileObj) {
            currentStatus.folderCount++;
            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath);
                currentStatus.folderReadyCount++;
            }
            if (fileObj.childAry) {
                fileObj.childAry.forEach((childFileObj) => {
                    createDeatil(childFileObj, currentPath);
                });
            }
        };

        const createFile = function(currentPath, fileObj) {
            currentStatus.fileCount++;
            const fileOptions = {
                flags: "w",
                autoClose: true,
                encoding: "utf8",
            };
            return new Promise((resolve, reject) => {
                const writeStream = fs.createWriteStream(currentPath, fileOptions);
                const write = () => {
                    if (fileObj.fileContent instanceof Buffer || typeof fileObj.fileContent === "string") {
                        let drainFlg = writeStream.end(fileObj.fileContent || "", "UTF-8", () => {
                            // console.log("end");
                        });
                        if (!drainFlg) {
                            writeStream.once("drain", () => {
                                setImmediate(write);
                            });
                        }
                    } else {
                        writeStream.end(null, "UTF-8", () => {
                            // console.log("end");
                        });
                    }

                };
                writeStream.on("error", (error) => {
                    // console.log(error);
                    reject(error);
                });
                writeStream.on("close", () => {
                    // console.log("close");
                    resolve("successEnd");
                });
                write();
            });
        };
        createDeatil(fileObj, parentPath);
    };


    return new Promise((resolve, reject) => {
        create(pathTree, rootPath, (error) => {
            // console.log("nextResult" + error);
            if (error) {
                reject(error);
            }
            // console.log("nextSuccess");
            resolve();
        });
    });

    //广度优先 不合适

    // objQueue.push(pathTree);
    // while (objQueue.length > 0) {
    //     let fileObj = objQueue.shift();

    //     const currentPath = path.join(currentFolderPath, fileObj.name);

    //     if (fileObj.isFolder === 1) {
    //         if (!fs.existsSync(currentPath)) {
    //             fs.mkdirSync(currentPath);
    //         }
    //         if (fileObj.childAry) {
    //             objQueue.push(...fileObj.childAry);
    //         }
    //     } else {
    //         fs.open(currentPath, "w", (error, file) => {
    //             if (error) {
    //                 throw error;
    //             }
    //             if (file) {
    //                 fs.close(file, (error) => {
    //                     if (error) {
    //                         throw error;
    //                     }
    //                 });
    //             }
    //         });
    //     }
    //     // console.log("当前对象");
    //     // console.log(fileObj);
    //     // console.log("队列内容");
    //     // for (let value of objQueue) {
    //     //     console.log(value);
    //     // }

    //     if (objQueue.length > 0) {
    //         const nextFileObj = objQueue[0];
    //         // console.log("下一个对象");
    //         // console.log(nextFileObj);
    //         if (nextFileObj.level && nextFileObj.level > currentLevel) {
    //             currentFolderPath = path.join(currentFolderPath, fileObj.name);
    //             currentLevel = nextFileObj.level;
    //         }
    //     }
    // }

};

const deleteDirOrFile = function(fullPath, call) {
    let exec = child_process.exec;
    exec("rm -rf " + path.normalize(fullPath), function(err, out) {
        // console.log("out" + out);
        // err && console.log(err);
        call(err, out);
    });
};
exports.createAllFileByTree = createAllFileByTree;
exports.deleteDirOrFile = deleteDirOrFile;