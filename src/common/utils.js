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

    static limitSentence(s, MAX_COUNT = 50) {
        if (Utils.isEmptyStr(s) || s.length < MAX_COUNT) {
            return s
        }

        return s.substring(0, MAX_COUNT) + '...';
    }
}
