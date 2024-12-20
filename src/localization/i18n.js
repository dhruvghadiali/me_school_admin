import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {loginForm} from './login/loginTranslationEn';

const resources = {
  en: {
    translation: {
      ...loginForm,
    }
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;