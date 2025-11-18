import { useTranslation } from "react-i18next";
import { signInForm } from "@MELocalization/signIn/signInTranslationEn";

const SignInFormHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-20 h-20 bg-danger p-2" />
      <div className="py-2">
        <h1 className="text-5xl font-bold">
          {t("signInFormHeader", { defaultValue: signInForm.signInFormHeader })}
        </h1>
        <p className="text-base text-dark">
          {t("signInFormSubtitle", { defaultValue: signInForm.signInFormSubtitle })}
        </p>
      </div>
    </>
  );
};

SignInFormHeader.propTypes = {};

export default SignInFormHeader;
