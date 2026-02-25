import { useRef } from "react";
import { useFormik } from "formik";
import { CircleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { variants } from "@MEUtils/enums";
import { signIn } from "@MERedux/authentication/authenticationAction";
import {
  usernameInputLabel,
  passwordInputLabel,
  signInButtonLabel,
} from "@MELocalization/signIn/signInTranslationEn";
import {
  passwordMax,
  passwordMin,
  passwordRequired,
  usernameMax,
  usernameMin,
  usernameRequired,
} from "@MEUtils/validationMessage";

import _ from "lodash";
import * as Yup from "yup";

import MEInput from "@MECommonComponents/form/input/meInput";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const SignInForm = () => {
  const { loader, error } = useSelector((state) => state.authentication);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const passwordInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(signIn(values));
    },
  });

  // Custom change handler for real-time error clearing
  const handleFieldChange = async (event) => {
    const { name, value } = event.target;

    // Update the field value first
    formik.setFieldValue(name, value);

    // If the field currently has an error, validate it to see if we can clear the error
    if (formik.errors[name]) {
      try {
        // Create updated values object for validation
        const updatedValues = { ...formik.values, [name]: value };
        await SignInSchema.validateAt(name, updatedValues);
        // Clear error if validation passes
        formik.setFieldError(name, undefined);
      } catch (error) {
        // Keep the error if validation still fails
        // Don't update error message on every keystroke, just clear when valid
      }
    }
  };

  // Custom blur handler for individual field validation
  const handleFieldBlur = async (fieldName) => {
    // setValidatingField(fieldName);
    try {
      // Validate only the specific field
      await SignInSchema.validateAt(fieldName, formik.values);
      // Clear error for this field if validation passes
      formik.setFieldError(fieldName, undefined);
    } catch (error) {
      // Set error for this specific field if validation fails
      formik.setFieldError(fieldName, error.message);
    }
    // Mark field as touched
    formik.setFieldTouched(fieldName, true);
    // setValidatingField(null);
  };

  // Handle Enter key press on username field to move to password
  const handleUsernameKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      passwordInputRef.current?.focus();
    }
  };

  // Handle Enter key press on password field to hide keyboard on mobile
  const handlePasswordKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur(); // Hide keyboard on mobile
    }
  };

  return (
    <>
      {error && (
        <div className="bg-danger/10 border border-danger/20 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 rounded-lg p-2.5 sm:p-3 md:p-3.5 backdrop-blur-sm">
          <CircleAlertIcon className="text-danger w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <p className="text-danger text-xs sm:text-sm md:text-base font-medium">
            {error}
          </p>
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-3 sm:space-y-4 md:space-y-5"
      >
        <MEInput
          id="username"
          name="username"
          type={"text"}
          message={formik.errors.username}
          value={formik.values.username}
          labelvariant={
            formik.errors.username ? variants.DANGER : variants.PRIMARY
          }
          inputvariant={
            formik.errors.username ? variants.DANGER : variants.PRIMARY
          }
          messagevariant={variants.DANGER}
          onChange={handleFieldChange}
          onBlur={() => handleFieldBlur("username")}
          onKeyDown={handleUsernameKeyDown}
          placeholder={t("usernameInputLabel", {
            defaultValue: usernameInputLabel,
          })}
          label={t("usernameInputLabel", {
            defaultValue: usernameInputLabel,
          })}
        />
        <MEInput
          ref={passwordInputRef}
          id="password"
          name="password"
          type={"password"}
          message={formik.errors.password}
          value={formik.values.password}
          labelvariant={
            formik.errors.password ? variants.DANGER : variants.PRIMARY
          }
          inputvariant={
            formik.errors.password ? variants.DANGER : variants.PRIMARY
          }
          messagevariant={variants.DANGER}
          onChange={handleFieldChange}
          onBlur={() => handleFieldBlur("password")}
          onKeyDown={handlePasswordKeyDown}
          placeholder={t("passwordInputLabel", {
            defaultValue: passwordInputLabel,
          })}
          label={t("passwordInputLabel", {
            defaultValue: passwordInputLabel,
          })}
        />

        <div className="mt-10">
          <MEButton
            type="submit"
            disabled={loader}
            buttonVariant={variants.SUCCESS}
            buttonClassName="w-full"
          >
            {_.toUpper(
              _.toLower(
                t("signInButtonLabel", {
                  defaultValue: signInButtonLabel,
                }),
              ),
            )}
            {loader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </>
  );
};

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, usernameMin)
    .max(100, usernameMax)
    .required(usernameRequired),
  password: Yup.string()
    .min(5, passwordMin)
    .max(50, passwordMax)
    .required(passwordRequired),
});

SignInForm.propTypes = {};

export default SignInForm;
