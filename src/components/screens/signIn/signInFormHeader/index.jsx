import { useTranslation } from "react-i18next";

import _ from "lodash";

import {
  signInFormHeader,
  signInFormSubtitle,
  signInFormBrandingTitle,
  signInFormBrandingSubtitle,
} from "@MELocalization/en";

import logo from "@MEAssets/logo.png";

import PropTypes from "prop-types";

const SignInFormHeader = ({ variant = "form" }) => {
  const { t } = useTranslation();

  if (variant === "branding") {
    return (
      <>
        <img
          src={logo}
          alt="Logo"
          className="h-24 w-24 xl:h-32 xl:w-32 mb-6 rounded-2xl shadow-lg"
        />
        <h2 className="text-3xl xl:text-4xl font-bold text-primary-foreground tracking-tight">
          {`ME ${_.startCase(t("signInFormBrandingTitle", { defaultValue: signInFormBrandingTitle }))}`}
        </h2>
        <p className="mt-2 text-primary-foreground/70 text-base xl:text-lg text-center max-w-sm">
          {_.upperFirst(t("signInFormBrandingSubtitle", { defaultValue: signInFormBrandingSubtitle }))}
        </p>
      </>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-col items-center space-y-3">
        <img src={logo} alt="Logo" className="h-14 w-14 sm:h-16 sm:w-16" />
        <div className="space-y-1 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {t("signInFormHeader", { defaultValue: signInFormHeader })}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("signInFormSubtitle", { defaultValue: signInFormSubtitle })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
        {t("signInFormHeader", { defaultValue: signInFormHeader })}
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        {t("signInFormSubtitle", { defaultValue: signInFormSubtitle })}
      </p>
    </div>
  );
};

SignInFormHeader.propTypes = {
  variant: PropTypes.oneOf(["branding", "compact", "form"]),
};

export default SignInFormHeader;
