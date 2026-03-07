import { variants } from "@MEUtils/enums";
import { Card } from "@MEShadcnComponents/card";

import MEInput from "@MECommonComponents/form/input/meInput";
import MESelect from "@MECommonComponents/form/select/meSelect";
import MEDatePicker from "@MECommonComponents/form/input/meDatePicker";
import useAdmissionForm from "@MEScreenComponents/admission/admissionFormSheet/admissionForm/useAdmissionForm";
import AdmissionFormActions from "@MEScreenComponents/admission/admissionFormSheet/admissionForm/admissionFormActions";
import AdmissionFormFeeFields from "@MEScreenComponents/admission/admissionFormSheet/admissionForm/admissionFormFeeFields";
import AdmissionFormErrorBanner from "@MEScreenComponents/admission/admissionFormSheet/admissionForm/admissionFormErrorBanner";
import DocumentVerificationFieldComponent from "@MEScreenComponents/admission/admissionFormSheet/admissionForm/documentVerificationField";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const AdmissionScreenAdmissionForm = () => {
  const {
    formik,
    admissionFormError,
    admissionFormLoader,
    nextStatus,
    showAppointmentDateField,
    showFeeFields,
    transactionIdRequired,
    paymentMethodItems,
    showDocumentVerification,
    statusSelectItems,
  } = useAdmissionForm();

  return (
    <div className="w-full h-full flex items-start justify-center">
      <div className="w-full mx-auto">
        <Card className="bg-secondary/50 shadow-lg shadow-primary/50 py-6 px-10">
          <AdmissionFormErrorBanner error={admissionFormError} />

          <form onSubmit={formik.handleSubmit}>
            {/* Heading */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">
                Update Application Status
              </h3>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 xl:grid-cols-5">
              <div>
                <MESelect
                  label="Application Status"
                  placeholder="Select Application Status"
                  items={statusSelectItems}
                  selectedValue={nextStatus}
                  selectVariant={
                    formik.errors.status ? variants.DANGER : variants.DARK
                  }
                  selectedVariant={variants.DARK}
                  labelvariant={variants.DARK}
                  messagevariant={variants.DANGER}
                  message={formik.errors.status}
                  clearable={true}
                  onValueChange={(value) =>
                    formik.setFieldValue("status", value)
                  }
                />
              </div>

              {showAppointmentDateField && (
                <div>
                  <MEDatePicker
                    label="Appointment Date & Time"
                    popoverTriggerClassName="border-primary"
                    messagevariant={variants.DANGER}
                    message={formik.errors.appointmentDate}
                    selectedDate={formik.values.appointmentDate}
                    showTime={true}
                    enableTime={true}
                    dateFormat="MMM dd, yyyy h:mm aa"
                    onSelect={(date) =>
                      formik.setFieldValue("appointmentDate", date)
                    }
                  />
                </div>
              )}

              <MEInput
                id="remarks"
                name="remarks"
                type="text"
                label="Remarks"
                placeholder="Enter remarks (optional)"
                value={formik.values.remarks}
                message={formik.errors.remarks}
                labelvariant={
                  formik.errors.remarks ? variants.DANGER : variants.PRIMARY
                }
                inputvariant={
                  formik.errors.remarks ? variants.DANGER : variants.PRIMARY
                }
                messagevariant={variants.DANGER}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {showFeeFields && (
                <AdmissionFormFeeFields
                  values={formik.values}
                  errors={formik.errors}
                  paymentMethodItems={paymentMethodItems}
                  transactionIdRequired={transactionIdRequired}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  setFieldValue={formik.setFieldValue}
                />
              )}

              {showDocumentVerification && (
                <div className="col-span-2">
                  <DocumentVerificationFieldComponent
                    documentList={formik.values.documentList}
                    onDocumentListChange={(updated) => {
                      formik.setFieldValue("documentList", updated);
                      formik.setFieldError("documentList", undefined);
                    }}
                    disabled={admissionFormLoader}
                    error={formik.errors.documentList}
                  />
                </div>
              )}
            </div>

            <AdmissionFormActions
              nextStatus={nextStatus}
              admissionFormLoader={admissionFormLoader}
              onConfirm={formik.handleSubmit}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdmissionScreenAdmissionForm;
