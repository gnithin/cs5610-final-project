import React from "react";

const showdown = require('showdown');
const markdownConvertor = new showdown.Converter();

export default class ComponentUtils {
    static getMarkdownComponentForText(text) {
        let markdown = markdownConvertor.makeHtml(text);
        return (
            <div className="md-formatting" dangerouslySetInnerHTML={{__html: markdown}}/>
        );
    }
}
