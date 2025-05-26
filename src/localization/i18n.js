import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { signInForm } from "@MELocalizationEn/signIn/signInTranslationEn";
import { dashboardSummary } from "@MELocalizationEn/dashboard/dashboardTranslationEn";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";
import { profile } from "@MELocalizationEn/profile/profileTranslationEn";
import {
  sidebarMenuLabel,
  sidebar,
} from "@MELocalizationEn//sidebar/sidebarTranslationEn";

const resources = {
  en: {
    translation: {
      ...signInForm,
      ...sidebarMenuLabel,
      ...sidebar,
      ...dashboardSummary,
      ...admissionHub,
      ...profile,
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
