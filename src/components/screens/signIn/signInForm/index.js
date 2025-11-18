import { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { useNavigate } from "react-router";
// import { CircleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@MEShadcnComponents/input";
// import { useSelector, useDispatch } from "react-redux";

// import { routeName } from "@MEUtils/routeName";
import { variants } from "@MEUtils/enums";
// import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";
import { signInForm } from "@MELocalization/signIn/signInTranslationEn";
// import { validateUser } from "@/slice/authentication/authenticationAction";
import {
  passwordMax,
  passwordMin,
  passwordRequired,
  usernameMax,
  usernameMin,
  usernameRequired,
} from "@MEUtils/validationMessage";

import * as Yup from "yup";

import MEInput from "@MECommonComponents/form/input/meInput";
import MEButton from "@MECommonComponents/form/button/meButton";
// import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const SignInForm = () => {
  // const { loader, error, isValidUser } = useSelector(
  //   (state) => state.authentication
  // );
  const { t } = useTranslation();
  // const [validatingField, setValidatingField] = useState(null);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isValidUser) {
  //     navigate(routeName.dashboard, { replace: true });
  //     dispatch(changeActiveMenu(sidebarMenuName.DASHBOARD));
  //   }
  // }, [isValidUser]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      // dispatch(validateUser(values));
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

  console.log("formik errors", formik);
  return (
    <>
      <div className="py-3" />
      
      {/* {error && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-center">{error}</p>
        </div>
      )} */}
      <form onSubmit={formik.handleSubmit}>
        <MEInput
          id="username"
          name="username"
          type={"text"}
          message={formik.errors.username}
          value={formik.values.username}
          labelvariant={formik.errors.username ? variants.DANGER : variants.PRIMARY}
          inputvariant={formik.errors.username ? variants.DANGER : variants.PRIMARY}
          messagevariant={variants.DANGER}
          onChange={handleFieldChange}
          onBlur={() => handleFieldBlur('username')}
          placeholder={t("usernameInputLabel", {
            defaultValue: signInForm.usernameInputLabel,
          })}
          label={t("usernameInputLabel", {
            defaultValue: signInForm.usernameInputLabel,
          })}
        />
        <MEInput
          id="password"
          name="password"
          type={"password"}
          message={formik.errors.password}
          value={formik.values.password}
          labelvariant={formik.errors.password ? variants.DANGER : variants.PRIMARY}
          inputvariant={formik.errors.password ? variants.DANGER : variants.PRIMARY}
          messagevariant={variants.DANGER}
          onChange={handleFieldChange}
          onBlur={() => handleFieldBlur('password')}
          placeholder={t("passwordInputLabel", {
            defaultValue: signInForm.passwordInputLabel,
          })}
          label={t("passwordInputLabel", {
            defaultValue: signInForm.passwordInputLabel,
          })}
        />

        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            {t("signInButtonLabel", {
              defaultValue: signInForm.signInButtonLabel,
            })}
            {/* {loader && <MELoaderIcon />} */}
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
