import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🌍 Import all language packs
import en from "./en.json";
import yo from "./yo.json";
import ha from "./ha.json";
import ig from "./ig.json";
import fr from "./fr.json";
import es from "./es.json";
import ar from "./ar.json";
import zh from "./zh.json";
import hi from "./hi.json";
import pt from "./pt.json";

// 🧠 Auto-detect browser language
const browserLang = navigator.language.split("-")[0]; // e.g. "fr-FR" → "fr"

// 🛡️ Supported languages
const supportedLangs = {
  en: { translation: en },
  yo: { translation: yo },
  ha: { translation: ha },
  ig: { translation: ig },
  fr: { translation: fr },
  es: { translation: es },
  ar: { translation: ar },
  zh: { translation: zh },
  hi: { translation: hi },
  pt: { translation: pt }
};

// 🧩 Initialize i18n
i18n.use(initReactI18next).init({
  resources: supportedLangs,
  lng: supportedLangs[browserLang] ? browserLang : "en", // fallback if unsupported
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
