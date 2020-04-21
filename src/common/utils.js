import moment from "moment";

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

    // Reference - https://stackoverflow.com/a/16348977/1518924
    // Stolen from here ^
    static stringToColour(str) {
        if (Utils.isEmptyStr(str)) {
            return '#000';
        }

        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    // https://stackoverflow.com/a/34064434/1518924
    // ^ Picked it up from here
    static htmlUnescape(input) {
        let doc = (new DOMParser().parseFromString(input, "text/html"));
        return doc.documentElement.textContent;
    }

    static formatDate(dateStr) {
        return moment(dateStr).format('Do MMMM YYYY');
    }

    static getVal(v, defaultVal = "") {
        if (Utils.isNull(v)) {
            return defaultVal;
        }
        return v;
    }
}
