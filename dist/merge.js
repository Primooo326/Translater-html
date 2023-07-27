"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(htmlContent, data) {
    // Expresión regular para capturar las etiquetas <script>
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const scripts = [];
    // Extraer todas las etiquetas <script> y guardarlas en un array
    let cleanedHtmlContent = htmlContent.replace(scriptRegex, (scriptTag) => {
        const scriptMarker = `<!--SCRIPT_MARKER_${scripts.length}-->`;
        scripts.push(scriptTag);
        return scriptMarker;
    });
    let newHtmlContent = cleanedHtmlContent.replaceAll(/\s+/g, " ").trim();
    data.forEach((etiqueta) => {
        newHtmlContent = newHtmlContent.replace(etiqueta.textContent, etiqueta.textTranslated);
    });
    // Restaurar las etiquetas <script> en el contenido final
    scripts.forEach((scriptTag, index) => {
        const scriptMarker = `<!--SCRIPT_MARKER_${index}-->`;
        newHtmlContent = newHtmlContent.replace(scriptMarker, scriptTag);
    });
    return newHtmlContent;
}
exports.default = default_1;
