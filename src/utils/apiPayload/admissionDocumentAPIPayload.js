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

export { addAdmissionDocumentAPIPayload };
