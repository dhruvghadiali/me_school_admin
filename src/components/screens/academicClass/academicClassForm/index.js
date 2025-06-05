import { useFormik } from "formik";
import { CircleAlertIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import { variants } from "@MEUtils/enums";
import { validationMessage } from "@MEUtils/validationMessage";
import { addAcademicClasses } from "@MERedux/academicClass/academicClassAction";
import { addNewAcademicClassAPIPayload } from "@MEUtils/apiPayload/academicClassAPIPayload";

import _ from "lodash";
import * as Yup from "yup";

import MEButton from "@MECommonComponents/button/meButton";
import MESelect from "@MECommonComponents/select/meSelect";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AcademicClassForm = () => {
  const {
    defaultAcademicClasses,
    academicClasses,
    academicClassFormLoader,
    academicClassFormError,
    selectedEducationBoard,
    school,
  } = useSelector((state) => state.academicClass);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      academicClass: "",
    },
    validationSchema: AcademicClassSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(
        addAcademicClasses(
          addNewAcademicClassAPIPayload({
            academicClass: values.academicClass,
            school: school,
            eductionBoard: selectedEducationBoard,
          })
        )
      );
    },
  });

  return (
    <>
      <div className="py-3" />
      {academicClassFormError && (
        <div className="bg-danger mb-2 flex items-center  rounded-md">
          <CircleAlertIcon className="text-accent ml-2" />
          <p className="text-accent p-2 text-left">{academicClassFormError}</p>
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <MESelect
          id="academicClass"
          label="selected academic class"
          items={_.filter(
            defaultAcademicClasses,
            (item) =>
              !_.includes(
                academicClasses.map((item) => item.academicClass),
                item.label
              )
          )}
          placeholder="Select Academic Class"
          selectedValue={formik.values.academicClass}
          message={formik.errors.academicClass}
          selectVariant={variants.DARK}
          selectedVariant={variants.PRIMARY}
          labelvariant={variants.DARK}
          messagevariant={variants.DANGER}
          onValueChange={(value) =>
            formik.setFieldValue("academicClass", value)
          }
        />
        <div className="py-2">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            Submit
            {academicClassFormLoader && <MELoaderIcon />}
          </MEButton>
        </div>
      </form>
    </>
  );
};

const AcademicClassSchema = Yup.object().shape({
  academicClass: Yup.string().required(
    validationMessage.academicClassSelectionRequired
  ),
});

AcademicClassForm.propTypes = {};

export default AcademicClassForm;
