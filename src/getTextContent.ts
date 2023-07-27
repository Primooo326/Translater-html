import fs from "fs";
import cheerio from "cheerio";

function cleanText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}
function eliminarRepetidos(array) {
  // Creamos un objeto para almacenar los textContent únicos
  const textContentUnicos = {};

  // Filtramos los elementos del array que tengan textContent único
  const resultado = array.filter((elemento) => {
    if (!textContentUnicos[elemento.textContent]) {
      // Si no hemos encontrado este textContent antes, lo agregamos al objeto
      textContentUnicos[elemento.textContent] = true;
      return true; // Devolvemos true para incluir este elemento en el resultado
    }
    return false; // Si ya hemos encontrado este textContent, no lo incluimos en el resultado
  });

  return resultado;
}
export default function (filePath) {
  try {
    const htmlContent = fs.readFileSync(filePath, "utf8");
    const $ = cheerio.load(htmlContent);

    const tagsWithTextContent: any[] = [];

    const hasTextContent = ($element) => {
      return $element
        .contents()
        .toArray()
        .some((childElement) => {
          return (
            childElement.type === "text" &&
            cleanText(childElement.data).length > 0
          );
        });
    };

    $("*").each((index, element) => {
      const $element = $(element);

      if (hasTextContent($element)) {
        $element.contents().each((childIndex, childElement) => {
          if (childElement.type === "text") {
            const textContent = cleanText(childElement.data);
            if (textContent) {
              tagsWithTextContent.push({
                tagName: $element.prop("tagName"),
                textContent,
              });
            }
          }
        });
      }
    });

    return eliminarRepetidos(
      tagsWithTextContent.filter(
        (item) =>
          !["html", "head", "meta", "body", "script", "style"].includes(
            item.tagName.toLowerCase()
          )
      )
    );
  } catch (error) {
    console.error(
      "Error reading or parsing the HTML file:".toLowerCase(),
      error
    );
    return null;
  }
}
