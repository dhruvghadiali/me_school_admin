import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, CircleAlertIcon } from "lucide-react";

import * as Yup from "yup";
import _ from "lodash";

import { variants } from "@MEUtils/enums";
import { updateUsernameAPIPayload } from "@MEUtils/apiPayload";
import { changeUsername } from "@MERedux/setting/settingAction";
import { resetChangeUsernameStatus } from "@MERedux/setting/settingSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@MEShadcnComponents/card";
import {
  settingUsernameMinChar,
  settingUsernameMaxChar,
  settingPasswordMaxChar,
  settingPasswordMinChar,
} from "@MEUtils/validationConst";
import {
  usernameMinLength,
  usernameMaxLength,
  passwordMaxLength,
  passwordMinLength,
  newUsernameRequired,
  currentPasswordRequired,
  confirmUsernameRequired,
  confirmUsernameMismatch,
} from "@MEUtils/validationMessage";
import {
  settingChangeUsernameTitle,
  settingCurrentPasswordLabel,
  settingNewUsernameLabel,
  settingConfirmUsernameLabel,
  settingChangeUsernameButtonLabel,
  settingChangeUsernameCancelButtonLabel,
  settingChangeUsernameConfirmButtonLabel,
  settingChangeUsernameAlertTitle,
  settingChangeUsernameAlertDescription,
} from "@MELocalization/en";

import MEInput from "@MECommonComponents/form/input/meInput";
import MEButton from "@MECommonComponents/form/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import MEActionAlertDialog from "@MECommonComponents/alertDialog/actionAlertDialog";

const ChangeUsernameForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { changeUsernameLoader, changeUsernameError } = useSelector(
    (state) => state.setting,
  );

  const formik = useFormik({
    initialValues: {
      password: "",
      newUsername: "",
      confirmUsername: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(changeUsername(updateUsernameAPIPayload(values)));
    },
  });

  const onCancelClick = () => {
    formik.resetForm();
    dispatch(resetChangeUsernameStatus());
  };

  const alertConfig = {
    icon: <AlertTriangle className="text-primary" size={20} />,
    title: _.upperFirst(
      t("settingChangeUsernameAlertTitle", {
        defaultValue: settingChangeUsernameAlertTitle,
      }),
    ),
    description: (
      <span>
        {_.upperFirst(
          t("settingChangeUsernameAlertDescription", {
            defaultValue: settingChangeUsernameAlertDescription,
          }),
        )}
      </span>
    ),
    actions: [
      {
        label: _.upperFirst(
          t("settingChangeUsernameCancelButtonLabel", {
            defaultValue: settingChangeUsernameCancelButtonLabel,
          }),
        ),
        className: "bg-primary hover:bg-primary/90 text-white",
        onClick: onCancelClick,
      },
      {
        label: _.upperFirst(
          t("settingChangeUsernameConfirmButtonLabel", {
            defaultValue: settingChangeUsernameConfirmButtonLabel,
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
            t("settingChangeUsernameTitle", {
              defaultValue: settingChangeUsernameTitle,
            }),
          )}
        </CardTitle>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent className="space-y-4">
          {changeUsernameError && (
            <div className="bg-danger mb-2 flex items-center  rounded-md">
              <CircleAlertIcon className="text-accent ml-2" />
              <p className="text-accent p-2 text-left">
                {_.toLower(_.upperFirst(changeUsernameError))}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MEInput
              id="newUsername"
              name="newUsername"
              type="text"
              label={_.upperFirst(
                t("settingNewUsernameLabel", {
                  defaultValue: settingNewUsernameLabel,
                }),
              )}
              required
              value={formik.values.newUsername}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputvariant={
                formik.touched.newUsername && formik.errors.newUsername
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.newUsername && formik.errors.newUsername
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.newUsername && formik.errors.newUsername
                  ? formik.errors.newUsername
                  : ""
              }
            />

            <MEInput
              id="confirmUsername"
              name="confirmUsername"
              type="text"
              label={_.upperFirst(
                t("settingConfirmUsernameLabel", {
                  defaultValue: settingConfirmUsernameLabel,
                }),
              )}
              required
              value={formik.values.confirmUsername}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputvariant={
                formik.touched.confirmUsername && formik.errors.confirmUsername
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.confirmUsername && formik.errors.confirmUsername
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.confirmUsername && formik.errors.confirmUsername
                  ? formik.errors.confirmUsername
                  : ""
              }
            />

            <MEInput
              id="password"
              name="password"
              type="password"
              label={_.upperFirst(
                t("settingCurrentPasswordLabel", {
                  defaultValue: settingCurrentPasswordLabel,
                }),
              )}
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputvariant={
                formik.touched.password && formik.errors.password
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.password && formik.errors.password
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
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
            disabled={changeUsernameLoader}
            onClick={onCancelClick}
          >
            {_.upperFirst(
              t("settingChangeUsernameCancelButtonLabel", {
                defaultValue: settingChangeUsernameCancelButtonLabel,
              }),
            )}
          </MEButton>

          <MEActionAlertDialog {...alertConfig}>
            <MEButton
              type="button"
              buttonVariant={variants.PRIMARY}
              buttonClassName="w-full sm:w-auto"
              disabled={changeUsernameLoader}
            >
              {_.upperFirst(
                t("settingChangeUsernameButtonLabel", {
                  defaultValue: settingChangeUsernameButtonLabel,
                }),
              )}
              {changeUsernameLoader && <MELoaderIcon />}
            </MEButton>
          </MEActionAlertDialog>
        </CardFooter>
      </form>
    </Card>
  );
};

const validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(settingPasswordMinChar, passwordMinLength)
    .max(settingPasswordMaxChar, passwordMaxLength)
    .required(currentPasswordRequired),
  newUsername: Yup.string()
    .trim()
    .min(settingUsernameMinChar, usernameMinLength)
    .max(settingUsernameMaxChar, usernameMaxLength)
    .required(newUsernameRequired),
  confirmUsername: Yup.string()
    .trim()
    .oneOf([Yup.ref("newUsername")], confirmUsernameMismatch)
    .required(confirmUsernameRequired),
});

export default ChangeUsernameForm;
