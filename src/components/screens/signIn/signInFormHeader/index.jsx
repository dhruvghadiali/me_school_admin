import { useTranslation } from "react-i18next";
import { CardTitle, CardDescription } from "@MEShadcnComponents/card";
import { signInFormHeader, signInFormSubtitle } from "@MELocalization/en";

const SignInFormHeader = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 bg-linear-to-br from-dark to-dark/80 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg flex items-center justify-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
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
