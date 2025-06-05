import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { variants } from "@MEUtils/enums";

import _ from "lodash";
import * as Yup from "yup";
import MEButton from "@MECommonComponents/button/meButton";
import MEDatePicker from "@MECommonComponents/input/meDatePicker";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AdmissionScreenFormDetailScheduleAppointment = () => {
  const { applicationFormDetail } = useSelector((state) => state.admission);

  const formik = useFormik({
    initialValues: {
      appointmentDate: "",
    },
    validationSchema: AppointmentFormSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
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
            messagevariant={variants.DANGER}
            inputvariant={variants.DARK}
            labelvariant={variants.DARK}
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

AdmissionScreenFormDetailScheduleAppointment.prototype = {};

export default AdmissionScreenFormDetailScheduleAppointment;
