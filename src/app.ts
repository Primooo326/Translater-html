import getTextContent from "./getTextContent";
import translater from "./translater";
import merge from "./merge";
import fs from "fs";

async function main(nombreArchivo: string, traducirA:string) {
  const resultado = await getTextContent(nombreArchivo);
  if (resultado) {
    console.log(resultado);
    const newData = await Promise.all(
      resultado.map(async (etiquetaObject) => {
        const textTranslated = await translater(
          etiquetaObject.textContent,
          traducirA
        );
        return { ...etiquetaObject, textTranslated };
      })
    );
    fs.writeFileSync("datos2.json", JSON.stringify(newData));

    const htmlContent = fs.readFileSync(nombreArchivo, "utf-8");

    let newHtmlContent = merge(htmlContent, newData);
    fs.writeFileSync(`t.${nombreArchivo}`, newHtmlContent);
  }
}

main("index.html","es");
