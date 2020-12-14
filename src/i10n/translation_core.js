import defaultTranslationTable from "./default_lang";

var default_language = "pt_br";
var debugKeyNotFound = true;
var debugTextNotFound = false;

const TranslationCore = {
  Initialize: function (configuration) {
    if (configuration.language)
      default_language = configuration.language.replace("-", "_");
  },
  Translate: Translate,
};

export function Translate(text) {
  let translationObject = defaultTranslationTable[text];
  if (!translationObject) {
    if (debugKeyNotFound) console.log("[TRANSLATION][KEY NOT FOUND]:" + text);
    return text;
  }

  let translationValue = translationObject[default_language];
  if (!translationValue) {
    if (debugTextNotFound)
      console.log(
        "[TRANSLATION][TEXT NOT FOUND FOR " +
          default_language.toUpperCase() +
          "]:" +
          text
      );
    return text;
  }

  return translationValue;
}

window.Translate = Translate;

export default TranslationCore;
