import defaultTranslationTable from "./default_lang";

var default_language = "pt_br";
var debugKeyNotFound = true;
var debugTextNotFound = false;
var customTranslationTable = {};

const TranslationCore = {
  Initialize: function (configuration) {
    customTranslationTable = configuration.customTranslationTable;
    if (configuration.language)
      default_language = configuration.language.replace("-", "_");
  },
  Translate: Translate,
};

export function Translate(text) {
  let translationObject;

  if (customTranslationTable)
    translationObject = customTranslationTable[text];
  else
    translationObject = defaultTranslationTable[text];

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
