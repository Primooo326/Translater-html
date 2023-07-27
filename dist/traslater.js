"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require("axios");
const fs = require("fs");
const datos = require("./datos.json");
const datos_traducidos = [];
function translateText(text, targetLanguage) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = "AIzaSyBTXF77wY-pjPSehT8lj7ZXxHqw3ZDq8LM";
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        try {
            const response = yield axios.post(url, {
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
    });
}
function downloadJSON(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("datos_traducidos.json", jsonData);
    console.log("Archivo JSON descargado con éxito.");
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(datos[0]);
        //   for (const etiqueta of datos) {
        // const title = job["Title EN"];
        // const definition = job["Definition"];
        // console.log(`Traduciendo ${title}...`);
        // const translatedTitle = await translateText(title, "es");
        // const translatedDefinition = await translateText(definition, "es");
        // datos_traducidos.push({
        //   titulo: translatedTitle,
        //   definicion: translatedDefinition,
        // });
        //   }
        //   console.log("espera");
        //   downloadJSON(datos_traducidos);
    });
}
init();
// console.log(datos_traducidos[0]);
