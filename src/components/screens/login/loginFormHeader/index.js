import { useTranslation } from "react-i18next";
import { loginForm } from "@MELocalizationEn/login/loginTranslationEn";

const LoginFormHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="w-20 h-20 bg-danger p-2" />
      <div className="py-2">
        <h1 className="text-3xl font-bold">
          {i18n.exists("loginFormHeader")
            ? t("loginFormHeader")
            : loginForm.loginFormHeader}
        </h1>
        <p className="text-xs text-dark">
          {i18n.exists("loginFormSubtitle")
            ? t("loginFormSubtitle")
            : loginForm.loginFormSubtitle}
        </p>
      </div>
    </>
  );
};

LoginFormHeader.propTypes = {};

export default LoginFormHeader;
