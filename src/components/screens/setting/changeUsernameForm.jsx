import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

import _ from "lodash";

import { variants } from "@MEUtils/enums";
import {
  settingUsernameMinChar,
  settingUsernameMaxChar,
} from "@MEUtils/validationConst/settingValidationConst";
import {
  currentUsernameRequired,
  newUsernameRequired,
  newUsernameMin,
  newUsernameMax,
  confirmUsernameRequired,
  confirmUsernameMismatch,
} from "@MEUtils/validationMessage/settingValidationMessage";
import {
  settingChangeUsernameTitle,
  settingCurrentUsernameLabel,
  settingNewUsernameLabel,
  settingConfirmUsernameLabel,
  settingChangeUsernameButtonLabel,
  settingChangeUsernameCancelButtonLabel,
} from "@MELocalization/en";

import { changeUsername } from "@MERedux/setting/settingAction";
import { resetChangeUsernameStatus } from "@MERedux/setting/settingSlice";

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
  currentUsername: Yup.string().trim().required(currentUsernameRequired),
  newUsername: Yup.string()
    .trim()
    .min(settingUsernameMinChar, newUsernameMin)
    .max(settingUsernameMaxChar, newUsernameMax)
    .required(newUsernameRequired),
  confirmUsername: Yup.string()
    .trim()
    .oneOf([Yup.ref("newUsername")], confirmUsernameMismatch)
    .required(confirmUsernameRequired),
});

const ChangeUsernameForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { changeUsernameLoader, changeUsernameError, changeUsernameSuccess } =
    useSelector((state) => state.setting);

  const formik = useFormik({
    initialValues: {
      currentUsername: "",
      newUsername: "",
      confirmUsername: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        changeUsername({
          currentUsername: values.currentUsername,
          newUsername: values.newUsername,
        }),
      );
    },
  });

  useEffect(() => {
    if (changeUsernameSuccess) {
      formik.resetForm();
      dispatch(resetChangeUsernameStatus());
    }
  }, [changeUsernameSuccess]);

  const onCancelClick = () => {
    formik.resetForm();
    dispatch(resetChangeUsernameStatus());
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
            <p className="text-sm text-danger">{changeUsernameError}</p>
          )}
          {changeUsernameSuccess && (
            <p className="text-sm text-success">
              Username changed successfully
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MEInput
              id="currentUsername"
              name="currentUsername"
              type="text"
              label={_.upperFirst(
                t("settingCurrentUsernameLabel", {
                  defaultValue: settingCurrentUsernameLabel,
                }),
              )}
              required
              value={formik.values.currentUsername}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputvariant={
                formik.touched.currentUsername && formik.errors.currentUsername
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              messagevariant={
                formik.touched.currentUsername && formik.errors.currentUsername
                  ? variants.DANGER
                  : variants.PRIMARY
              }
              message={
                formik.touched.currentUsername && formik.errors.currentUsername
                  ? formik.errors.currentUsername
                  : ""
              }
            />

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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <MEButton
            type="submit"
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
        </CardFooter>
      </form>
    </Card>
  );
};

export default ChangeUsernameForm;
