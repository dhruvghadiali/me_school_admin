import { useTranslation } from 'react-i18next';
import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";
import MEButton from "../../components/common/button/meButton";

const SettingsScreen = () => {
  const { t, i18n } = useTranslation(); 
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <h1> Settings Screen </h1>
          <MEButton onClick={() => {
            console.log("Change Language");
            i18n.changeLanguage("en");
          }}>
            EN Change Language
          </MEButton>

          <MEButton onClick={() => {
            console.log("Change Language");
            i18n.changeLanguage("fr");
          }}>
            FR Change Language
          </MEButton>

          <MEButton onClick={() => {
            console.log("Change Language");
            i18n.changeLanguage("de");
          }}>
            DE Change Language
          </MEButton>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default SettingsScreen;
