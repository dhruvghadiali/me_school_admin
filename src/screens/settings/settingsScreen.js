import { useTranslation } from 'react-i18next';

import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";
import MEButton from "@MECommonComponents/button/meButton";

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <MEAuthHoc>
        <h1> Settings Screen </h1>
        <MEButton onClick={() => {
          i18n.changeLanguage("en");
        }}>
          EN Change Language
        </MEButton>

        <MEButton onClick={() => {
          i18n.changeLanguage("fr");
        }}>
          FR Change Language
        </MEButton>

        <MEButton onClick={() => {
          i18n.changeLanguage("de");
        }}>
          DE Change Language
        </MEButton>
      </MEAuthHoc>
    </>
  );
};

export default SettingsScreen;
