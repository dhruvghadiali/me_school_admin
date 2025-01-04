import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { loginForm } from "@MELocalizationEn/login/loginTranslationEn";
import { dashboardSummary } from "@MELocalizationEn/dashboard/dashboardTranslationEn";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";
import {
  sidebarMenuLabel,
  sidebar,
} from "@MELocalizationEn//sidebar/sidebarTranslationEn";

const resources = {
  en: {
    translation: {
      ...loginForm,
      ...sidebarMenuLabel,
      ...sidebar,
      ...dashboardSummary,
      ...admissionHub,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
