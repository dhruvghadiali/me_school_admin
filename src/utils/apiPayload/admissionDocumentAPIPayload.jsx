import _ from "lodash";

const addAdmissionDocumentAPIPayload = (payload) => {
  const { academicClass, admissionDocument, isRequired, notes } = payload;

  let admissionDocumentPayload = {
    school_academic_class: academicClass,
    admission_document: admissionDocument,
    is_required: isRequired,
  };

  return notes
    ? { ...admissionDocumentPayload, notes: _.trim(notes) }
    : admissionDocumentPayload;
};

const updateAdmissionDocumentAPIPayload = (payload, id) => {
  const { academicClass, admissionDocument, isRequired, notes } = payload;

  let admissionDocumentPayload = {
    school_academic_class: academicClass,
    admission_document: admissionDocument,
    is_required: isRequired,
  };

  admissionDocumentPayload = notes
    ? { ...admissionDocumentPayload, notes: _.trim(notes) }
    : admissionDocumentPayload;

  return {
    id: id,
    data: admissionDocumentPayload,
  };
};

const updateDocumentVerificationAPIPayload = (documentList) => {
  return {
    verified_documents: _.map(documentList, (document) => ({
      school_admission_document: document.schoolAdmissionDocumentId,
      is_verified: document.isSelected,
      notes: document.isSelected
        ? "Document verified via admin"
        : "Document marked as unverified via admin",
      id: document.id,
    })),
  };
};

const documentVerificationAppointmentBookingAPIPayload = (appointmentDetail) => { 
  return {
      remarks: appointmentDetail.remarks,
      scheduled_date: appointmentDetail.scheduledDate,
      scheduled_time_slot: appointmentDetail.scheduledTimeSlot,
    };
};

export {
  addAdmissionDocumentAPIPayload,
  updateAdmissionDocumentAPIPayload,
  updateDocumentVerificationAPIPayload,
  documentVerificationAppointmentBookingAPIPayload, 
};
