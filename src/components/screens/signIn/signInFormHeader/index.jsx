import { useTranslation } from "react-i18next";
import { CardTitle, CardDescription } from "@MEShadcnComponents/card";
import { signInFormHeader, signInFormSubtitle } from "@MELocalization/en";
import logo from "@MEAssets/logo.png";

const SignInFormHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14"
        />
        <div className="min-w-0 flex-1">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold truncate">
            {t("signInFormHeader", { defaultValue: signInFormHeader })}
          </CardTitle>
        </div>
      </div>
      <CardDescription className="text-sm sm:text-base md:text-lg truncate mb-3 md:mb-0">
        {t("signInFormSubtitle", { defaultValue: signInFormSubtitle })}
      </CardDescription>
    </>
  );
};

SignInFormHeader.propTypes = {};

export default SignInFormHeader;
