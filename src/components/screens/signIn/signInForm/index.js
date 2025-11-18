import { useEffect } from "react";
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
    validateOnBlur: true,
    onSubmit: (values) => {
      // dispatch(validateUser(values));
    },
  });

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
          type={"text"}
          message={formik.errors.username}
          value={formik.values.username}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={formik.handleChange}
          label={t("usernameInputLabel", {
            defaultValue: signInForm.usernameInputLabel,
          })}
        />
        <MEInput
          id="password"
          type={"password"}
          message={formik.errors.password}
          value={formik.values.password}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={formik.handleChange}
          label={t("passwordInputLabel", {
            defaultValue: signInForm.passwordInputLabel,
          })}
        />
        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.DANGER}>
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
