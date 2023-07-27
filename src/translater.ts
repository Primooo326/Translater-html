import axios from "axios";
export default async function (text:string, targetLanguage) {
  const apiKey = "AIzaSyBTXF77wY-pjPSehT8lj7ZXxHqw3ZDq8LM";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLanguage,
    });

    const translatedText = response.data.data.translations[0].translatedText;
    console.log(`Texto traducido (${targetLanguage}): ${translatedText}`);
    return translatedText;
  } catch (error) {
    console.error("Error al traducir el texto:", error);
  }
}
