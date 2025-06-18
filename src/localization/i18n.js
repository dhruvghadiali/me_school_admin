import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { profile } from "@MELocalization/profile/profileTranslationEn";
import { signInForm } from "@MELocalization/signIn/signInTranslationEn";
import { admissionHub } from "@MELocalization/admission/admissionTranslationEn";
import { dashboardSummary } from "@MELocalization/dashboard/dashboardTranslationEn";
import {
  sidebarMenuLabel,
  sidebar,
} from "@MELocalization/sidebar/sidebarTranslationEn";

import * as localizationEn from "@MELocalization/en";

const resources = {
  en: {
    translation: {
      ...profile,
      ...sidebar,
      ...signInForm,
      ...admissionHub,
      ...sidebarMenuLabel,
      ...dashboardSummary,
      ...localizationEn,
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
