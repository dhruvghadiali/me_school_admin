import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import {
  settingPasswordMinChar,
  settingPasswordMaxChar,
} from "@MEUtils/validationConst/settingValidationConst";
import {
  currentPasswordRequired,
  newPasswordRequired,
  newPasswordMin,
  newPasswordMax,
  confirmPasswordRequired,
  confirmPasswordMismatch,
} from "@MEUtils/validationMessage/settingValidationMessage";
import {
  settingChangePasswordTitle,
  settingCurrentPasswordLabel,
  settingNewPasswordLabel,
  settingConfirmPasswordLabel,
  settingChangePasswordButtonLabel,
  settingChangePasswordCancelButtonLabel,
} from "@MELocalization/en";

import { changePassword } from "@MERedux/setting/settingAction";
import { resetChangePasswordStatus } from "@MERedux/setting/settingSlice";

import MEInput from "@MECommonComponents/form/input/meInput";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@MEShadcnComponents/card";

const validationSchema = Yup.object({
  currentPassword: Yup.string().trim().required(currentPasswordRequired),
  newPassword: Yup.string()
    .trim()
    .min(settingPasswordMinChar, newPasswordMin)
    .max(settingPasswordMaxChar, newPasswordMax)
    .required(newPasswordRequired),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword")], confirmPasswordMismatch)
    .required(confirmPasswordRequired),
});

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { changePasswordLoader, changePasswordError, changePasswordSuccess } =
    useSelector((state) => state.setting);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      );
    },
  });

  useEffect(() => {
    if (changePasswordSuccess) {
      formik.resetForm();
      dispatch(resetChangePasswordStatus());
    }
  }, [changePasswordSuccess]);

  const onCancelClick = () => {
    formik.resetForm();
    dispatch(resetChangePasswordStatus());
  };

  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary/70">
          {_.upperCase(
            t("settingChangePasswordTitle", {
              defaultValue: settingChangePasswordTitle,
            }),
          )}
        </CardTitle>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent className="space-y-4">
          {/* {changePasswordError && (
            <p className="text-sm text-danger">{changePasswordError}</p>
          )}
          {changePasswordSuccess && (
            <p className="text-sm text-success">
              Password changed successfully
            </p>
          )} */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MEInput
              id="currentPassword"
              name="currentPassword"
              type="password"
              label={_.upperFirst(
                t("settingCurrentPasswordLabel", {
                  defaultValue: settingCurrentPasswordLabel,
                }),
              )}
              required
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputvariant={
                formik.touched.currentPassword &&
                formik.errors.currentPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.currentPassword &&
                formik.errors.currentPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.currentPassword &&
                formik.errors.currentPassword
                  ? formik.errors.currentPassword
                  : ""
              }
            />

            <MEInput
              id="newPassword"
              name="newPassword"
              type="password"
              label={_.upperFirst(
                t("settingNewPasswordLabel", {
                  defaultValue: settingNewPasswordLabel,
                }),
              )}
              required
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputvariant={
                formik.touched.newPassword && formik.errors.newPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.newPassword && formik.errors.newPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : ""
              }
            />

            <MEInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label={_.upperFirst(
                t("settingConfirmPasswordLabel", {
                  defaultValue: settingConfirmPasswordLabel,
                }),
              )}
              required
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputvariant={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <MEButton
            type="submit"
            buttonVariant={variants.PRIMARY}
            buttonClassName="w-full sm:w-auto"
            disabled={changePasswordLoader}
          >
            {_.upperFirst(
              t("settingChangePasswordButtonLabel", {
                defaultValue: settingChangePasswordButtonLabel,
              }),
            )}
            {changePasswordLoader && <MELoaderIcon />}
          </MEButton>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ChangePasswordForm;
