"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function default_1(text, targetLanguage) {
    const apiKey = "AIzaSyBTXF77wY-pjPSehT8lj7ZXxHqw3ZDq8LM";
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    try {
        const response = await axios_1.default.post(url, {
            q: text,
            target: targetLanguage,
        });
        const translatedText = response.data.data.translations[0].translatedText;
        console.log(`Texto traducido (${targetLanguage}): ${translatedText}`);
        return translatedText;
    }
    catch (error) {
        console.error("Error al traducir el texto:", error);
    }
}
exports.default = default_1;
