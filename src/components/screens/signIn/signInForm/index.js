import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { CircleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { routeName } from "@MEUtils/routeName";
import { validateUser } from "@MERedux/signIn/signInAction";
import { variants, sidebarMenuName } from "@MEUtils/enums";
import { validationMessage } from "@MEUtils/validationMessage";
import { changeActiveMenu } from "@MERedux/sidebar/sidebarSlice";
import { signInForm } from "@MELocalizationEn/signIn/signInTranslationEn";

import * as Yup from "yup";
import MEInput from "@MECommonComponents/input/meInput";
import MEButton from "@MECommonComponents/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const SignInForm = () => {
  const { loader, error, isValidUser } = useSelector((state) => state.signIn);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isValidUser) {
      navigate(routeName.dashboard, { replace: true });
      dispatch(changeActiveMenu(sidebarMenuName.DASHBOARD));
    }
  }, [isValidUser]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(validateUser(values));
    },
  });

  return (
    <>
      <div className="py-3" />
      {error && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-center">{error}</p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <MEInput
          id="username"
          type={"text"}
          label={
            i18n.exists("usernameInputLabel")
              ? t("usernameInputLabel")
              : signInForm.usernameInputLabel
          }
          message={formik.errors.username}
          value={formik.values.username}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={formik.handleChange}
        />
        <MEInput
          id="password"
          type={"password"}
          label={
            i18n.exists("passwordInputLabel")
              ? t("passwordInputLabel")
              : signInForm.passwordInputLabel
          }
          message={formik.errors.password}
          value={formik.values.password}
          labelvariant={variants.DARK}
          inputvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onChange={formik.handleChange}
        />
        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            {i18n.exists("signInButtonLabel")
              ? t("signInButtonLabel")
              : signInForm.signInButtonLabel}
            {loader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </>
  );
};

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, validationMessage.usernameMin)
    .max(100, validationMessage.usernameMax)
    .required(validationMessage.usernameRequired),
  password: Yup.string()
    .min(5, validationMessage.passwordMin)
    .max(50, validationMessage.passwordMax)
    .required(validationMessage.required),
});

SignInForm.propTypes = {};

export default SignInForm;
