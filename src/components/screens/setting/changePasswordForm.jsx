import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, CircleAlertIcon } from "lucide-react";

import _ from "lodash";
import * as Yup from "yup";

import { variants } from "@MEUtils/enums";
import { updatePasswordAPIPayload } from "@MEUtils/apiPayload";
import { changePassword } from "@MERedux/setting/settingAction";
import { resetChangePasswordStatus } from "@MERedux/setting/settingSlice";
import {
  settingPasswordMinChar,
  settingPasswordMaxChar,
} from "@MEUtils/validationConst";
import {
  passwordMinLength,
  passwordMaxLength,
  newPasswordRequired,
  currentPasswordRequired,
  confirmPasswordRequired,
  confirmPasswordMismatch,
} from "@MEUtils/validationMessage/settingValidationMessage";
import {
  settingNewPasswordLabel,
  settingChangePasswordTitle,
  settingCurrentPasswordLabel,
  settingConfirmPasswordLabel,
  settingChangePasswordAlertTitle,
  settingChangePasswordButtonLabel,
  settingChangePasswordAlertDescription,
  settingChangePasswordCancelButtonLabel,
  settingChangePasswordConfirmButtonLabel,
} from "@MELocalization/en";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@MEShadcnComponents/card";

import MEInput from "@MECommonComponents/form/input/meInput";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import MEActionAlertDialog from "@MECommonComponents/alertDialog/actionAlertDialog";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { changePasswordLoader, changePasswordError } = useSelector(
    (state) => state.setting,
  );

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(changePassword(updatePasswordAPIPayload(values)));
    },
  });

  const onCancelClick = () => {
    formik.resetForm();
    dispatch(resetChangePasswordStatus());
  };

  const alertConfig = {
    icon: <AlertTriangle className="text-primary" size={20} />,
    title: _.upperFirst(
      t("settingChangePasswordAlertTitle", {
        defaultValue: settingChangePasswordAlertTitle,
      }),
    ),
    description: (
      <span>
        {_.upperFirst(
          t("settingChangePasswordAlertDescription", {
            defaultValue: settingChangePasswordAlertDescription,
          }),
        )}
      </span>
    ),
    actions: [
      {
        label: _.upperFirst(
          t("settingChangePasswordCancelButtonLabel", {
            defaultValue: settingChangePasswordCancelButtonLabel,
          }),
        ),
        className: "bg-primary hover:bg-primary/90 text-white",
        onClick: onCancelClick,
      },
      {
        label: _.upperFirst(
          t("settingChangePasswordConfirmButtonLabel", {
            defaultValue: settingChangePasswordConfirmButtonLabel,
          }),
        ),
        className: "bg-success hover:bg-success/90 text-white",
        onClick: () => formik.handleSubmit(),
      },
    ],
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
          {changePasswordError && (
            <div className="bg-danger mb-2 flex items-center  rounded-md">
              <CircleAlertIcon className="text-accent ml-2" />
              <p className="text-accent p-2 text-left">
                {_.toLower(_.upperFirst(changePasswordError))}
              </p>
            </div>
          )}

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
                formik.touched.currentPassword && formik.errors.currentPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.currentPassword && formik.errors.currentPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.currentPassword && formik.errors.currentPassword
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
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <MEButton
            type="button"
            variant="outline"
            buttonClassName="w-full sm:w-auto"
            disabled={changePasswordLoader}
            onClick={onCancelClick}
          >
            {_.upperFirst(
              t("settingChangePasswordCancelButtonLabel", {
                defaultValue: settingChangePasswordCancelButtonLabel,
              }),
            )}
          </MEButton>

          <MEActionAlertDialog {...alertConfig}>
            <MEButton
              type="button"
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
          </MEActionAlertDialog>
        </CardFooter>
      </form>
    </Card>
  );
};

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .trim()
    .min(settingPasswordMinChar, passwordMinLength)
    .max(settingPasswordMaxChar, passwordMaxLength)
    .required(currentPasswordRequired),
  newPassword: Yup.string()
    .trim()
    .min(settingPasswordMinChar, passwordMinLength)
    .max(settingPasswordMaxChar, passwordMaxLength)
    .required(newPasswordRequired),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword")], confirmPasswordMismatch)
    .required(confirmPasswordRequired),
});

export default ChangePasswordForm;
