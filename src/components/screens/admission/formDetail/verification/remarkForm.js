import { useFormik } from "formik";
import { variants } from "@MEUtils/enums";
import { validationMessage } from "@MEUtils/validationMessage";

import * as Yup from "yup";
import MEInput from "@MECommonComponents/input/meInput";
import MEButton from "@MECommonComponents/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AdmissionScreenFormDetailDocumentRemarkForm = () => {
  const formik = useFormik({
    initialValues: {
      remark: "",
    },
    validationSchema: remarkSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <MEInput
          id="remark"
          type={"text"}
          label={"remark"}
          message={formik.errors.remark}
          value={formik.values.remark}
          labelVariant={variants.DARK}
          inputVariant={variants.DARK}
          messageVariant={variants.DANGER}
          onChange={formik.handleChange}
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

const remarkSchema = Yup.object().shape({
  remark: Yup.string()
    .min(5, validationMessage.usernameMin)
    .max(25, validationMessage.usernameMax)
    .required(validationMessage.usernameRequired),
});

AdmissionScreenFormDetailDocumentRemarkForm.propTypes = {};

export default AdmissionScreenFormDetailDocumentRemarkForm;
