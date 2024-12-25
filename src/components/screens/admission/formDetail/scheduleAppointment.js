import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { variants } from "@MEUtils/enums";

import _ from "lodash";
import * as Yup from "yup";
import MEButton from "@MECommonComponents/button/meButton";
import MEDatePicker from "@MECommonComponents/input/meDatePicker";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AdmissionScreenScheduleAppointment = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);

  const formik = useFormik({
    initialValues: {
      appointmentDate: "",
    },
    validationSchema: AppointmentFormSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log("values", values, applicationFormDetail);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <MEDatePicker
            id="appointmentDate"
            required
            label={_.startCase("select appointment date")}
            message={formik.errors.appointmentDate}
            selectedDate={formik.values.appointmentDate}
            messageVariant={variants.DANGER}
            inputVariant={variants.DARK}
            labelVariant={variants.DARK}
            onSelect={(date) => {
              formik.setFieldValue("appointmentDate", date);
            }}
          />

          <div className="py-5">
            <MEButton type="submit" buttonVariant={variants.SUCCESS}>
              Submit
              <MELoaderIcon />
            </MEButton>
          </div>
        </div>
      </form>
    </>
  );
};

const AppointmentFormSchema = Yup.object().shape({
  appointmentDate: Yup.date().required("Appointment date required"),
});

AdmissionScreenScheduleAppointment.prototype = {};

export default AdmissionScreenScheduleAppointment;
