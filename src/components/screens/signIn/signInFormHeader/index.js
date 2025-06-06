import { useTranslation } from "react-i18next";
import { signInForm } from "@MELocalization/signIn/signInTranslationEn";

const SignInFormHeader = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="w-20 h-20 bg-danger p-2" />
      <div className="py-2">
        <h1 className="text-3xl font-bold">
          {i18n.exists("signInFormHeader")
            ? t("signInFormHeader")
            : signInForm.signInFormHeader}
        </h1>
        <p className="text-xs text-dark">
          {i18n.exists("signInFormSubtitle")
            ? t("signInFormSubtitle")
            : signInForm.signInFormSubtitle}
        </p>
      </div>
    </>
  );
};

SignInFormHeader.propTypes = {};

export default SignInFormHeader;
