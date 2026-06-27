import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof en;
    };
  }
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    fallbackLng: "en",
    supportedLngs: ["ar", "en"],
    interpolation: { escapeValue: false },
  });

const RTL_BASE_LANGS = new Set(["ar", "he", "fa", "ur"]);

function syncHtmlLang(lng: string) {
  document.documentElement.lang = lng.split("-")[0] ?? "en";
}

function syncDocumentDirection(lng: string) {
  const base = lng.split("-")[0] ?? "en";
  document.documentElement.dir = RTL_BASE_LANGS.has(base) ? "rtl" : "ltr";
}

function syncDocumentLocale(lng: string) {
  syncHtmlLang(lng);
  syncDocumentDirection(lng);
}

syncDocumentLocale(i18n.resolvedLanguage ?? i18n.language);
i18n.on("languageChanged", (lng) => {
  syncDocumentLocale(lng);
});

export default i18n;
