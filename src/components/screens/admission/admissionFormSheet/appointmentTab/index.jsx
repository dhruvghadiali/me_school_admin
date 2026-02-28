import DocumentVerificationAppointmentComponent from "@MEScreenComponents/admission/admissionFormSheet/appointmentTab/documentVerificationAppointment";
import FeePaymentAppointmentComponent from "@MEScreenComponents/admission/admissionFormSheet/appointmentTab/feePaymentAppointment";


const AppointmentsTab = () => {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      {/* Document Verification Appointments */}
      <DocumentVerificationAppointmentComponent/>

      {/* Fee Payment Appointments */}
      <FeePaymentAppointmentComponent/>
    </div>
  );
};

export default AppointmentsTab;
