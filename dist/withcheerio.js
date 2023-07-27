"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const cheerio = require('cheerio');
function cleanText(text) {
    return text.replace(/\s+/g, ' ').trim();
}
function countTagsAndTextContent(filePath) {
    try {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(htmlContent);
        const tagsCount = {};
        const tagsWithTextContent = [];
        $('*').each((index, element) => {
            const tagName = element.tagName;
            // Count tags
            if (tagsCount[tagName]) {
                tagsCount[tagName]++;
            }
            else {
                tagsCount[tagName] = 1;
            }
            // Check if tag has text content
            const textContent = $(element).text();
            const cleanedTextContent = cleanText(textContent);
            if (cleanedTextContent) {
                tagsWithTextContent.push({ tagName, textContent: cleanedTextContent });
            }
        });
        return { tagsCount, tagsWithTextContent };
    }
    catch (error) {
        console.error('Error reading or parsing the HTML file:', error);
        return null;
    }
}
exports.default = countTagsAndTextContent;
