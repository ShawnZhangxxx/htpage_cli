/**
 * 首字母大写
 * @param {String} 需要转换的内容 
 */
exports.getFirstUpCase = function getFirstUpCase(str) {
    if (typeof str !== "string") {
        return str;
    }
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}