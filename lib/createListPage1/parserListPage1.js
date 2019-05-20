const path = require("path");
const pathJson = require("../../htoaPath.json");
const { parserFile } = require("../util/parserMainJs");
const parserIndependence = function(moduleName, componentChildPath, htpagesPath) {
    const independenceFile = path.join(htpagesPath, pathJson.frontend.module,
        moduleName, `view\\${moduleName}01\\main`, `${moduleName}01Js.path.js`);
    const componentFilePath = `NG_PATH_HTPAGE_APP_MODULE + "${moduleName}/view/${moduleName}01/${componentChildPath}"`;
    let promise = parserFile(independenceFile, componentFilePath);
    return promise;
};
exports.parserIndependence = parserIndependence;
