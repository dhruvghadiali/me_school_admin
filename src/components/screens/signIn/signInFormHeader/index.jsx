import { useTranslation } from "react-i18next";
import { signInForm } from "@MELocalization/signIn/signInTranslationEn";

const SignInFormHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 sm:mb-8">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-danger rounded-lg mb-4" />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          {t("signInFormHeader", { defaultValue: signInForm.signInFormHeader })}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t("signInFormSubtitle", { defaultValue: signInForm.signInFormSubtitle })}
        </p>
      </div>
    </div>
  );
};

SignInFormHeader.propTypes = {};

export default SignInFormHeader;
