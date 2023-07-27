"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTextContent_1 = __importDefault(require("./getTextContent"));
const translater_1 = __importDefault(require("./translater"));
const merge_1 = __importDefault(require("./merge"));
const fs_1 = __importDefault(require("fs"));
async function main(nombreArchivo, traducirA) {
    const resultado = await (0, getTextContent_1.default)(nombreArchivo);
    if (resultado) {
        console.log(resultado);
        const newData = await Promise.all(resultado.map(async (etiquetaObject) => {
            const textTranslated = await (0, translater_1.default)(etiquetaObject.textContent, traducirA);
            return { ...etiquetaObject, textTranslated };
        }));
        fs_1.default.writeFileSync("datos2.json", JSON.stringify(newData));
        const htmlContent = fs_1.default.readFileSync(nombreArchivo, "utf-8");
        let newHtmlContent = (0, merge_1.default)(htmlContent, newData);
        fs_1.default.writeFileSync(`t.${nombreArchivo}`, newHtmlContent);
    }
}
main("index.html", "es");
