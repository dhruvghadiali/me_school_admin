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

  return{
    id: id,
    data: admissionDocumentPayload
  }
};

export { addAdmissionDocumentAPIPayload, updateAdmissionDocumentAPIPayload };
