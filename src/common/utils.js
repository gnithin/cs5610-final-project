export default class Utils {
    static isNull(obj) {
        return (typeof (obj) === "undefined" || obj === null)
    }

    static isEmptyObject(obj) {
        if (this.isNull(obj)) {
            return true;
        }
        return Object.keys(obj).length === 0;
    }

    static isEmptyStr(obj) {
        return (this.isNull(obj) || (typeof obj === "string" && obj.trim() === ""));
    }

    static escapeRegexStr(s) {
        return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
}
