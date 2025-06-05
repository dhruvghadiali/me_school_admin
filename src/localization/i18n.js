import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { profile } from "@MELocalizationEn/profile/profileTranslationEn";
import { signInForm } from "@MELocalizationEn/signIn/signInTranslationEn";
import { admissionHub } from "@MELocalizationEn/admission/admissionTranslationEn";
import { dashboardSummary } from "@MELocalizationEn/dashboard/dashboardTranslationEn";
import { academicClass } from "@MELocalizationEn/academicClass/academicClassTranslationEn";
import {
  sidebarMenuLabel,
  sidebar,
} from "@MELocalizationEn//sidebar/sidebarTranslationEn";

const resources = {
  en: {
    translation: {
      ...profile,
      ...sidebar,
      ...signInForm,
      ...admissionHub,
      ...academicClass,
      ...sidebarMenuLabel,
      ...dashboardSummary,
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
