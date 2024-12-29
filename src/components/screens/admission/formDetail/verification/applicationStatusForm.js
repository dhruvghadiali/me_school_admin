import { useFormik } from "formik";
import { variants } from "@MEUtils/enums";
import { validationMessage } from "@MEUtils/validationMessage";

import * as Yup from "yup";
import _ from "lodash";
import MEButton from "@MECommonComponents/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";
import MESelect from "@MECommonComponents/select/meSelect";
import PropTypes from "prop-types";

const AdmissionScreenFormDetailApplicationStatusForm = ({items}) => {
  const formik = useFormik({
    initialValues: {
        status: "",
    },
    validationSchema: applicationStatusSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <MESelect
          required={true}
          label={`Do you want to update application status?`}
          placeholder={"select option "}
          items={items}
          selectedValue={formik.values.status}
          message={formik.errors.status}
          selectVariant={variants.DARK}
          selectedVariant={variants.PRIMARY}
          labelVariant={variants.DARK}
          messageVariant={variants.WARNING}
          onValueChange={(value) => formik.setFieldValue("status", value)}
        />

        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            Submit <MELoaderIcon />
          </MEButton>
        </div>
      </form>
    </>
  );
};

const applicationStatusSchema = Yup.object().shape({
  status: Yup.string()
    .min(5, validationMessage.usernameMin)
    .max(25, validationMessage.usernameMax)
    .required(validationMessage.usernameRequired),
});

AdmissionScreenFormDetailApplicationStatusForm.prototype = {
  items: PropTypes.array
};

export default AdmissionScreenFormDetailApplicationStatusForm;
