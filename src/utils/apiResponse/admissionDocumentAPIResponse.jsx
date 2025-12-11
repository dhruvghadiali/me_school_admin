import moment from "moment";

import _ from "lodash";

const admissionDocumentsAPIResponse = (data) => {
  return _.map(data, (item) => {
    return {
      label: item && item.admission_document ? item.admission_document : "",
      value: item && item.id ? item.id : "",
    };
  });
};

const schoolAdmissionDocumentsAPIResponse = (response) => {
  return _.sortBy(
    _.map(response, (data) => {
      return {
        id: data && data.id ? data.id : "",
        admissionDocument:
          data &&
          data.admission_document &&
          data.admission_document.admission_document
            ? _.upperFirst(data.admission_document.admission_document)
            : "",
        admissionDocumentValue:
          data && data.admission_document && data.admission_document.id
            ? data.admission_document.id
            : "",
        admissionDocumentLabel:
          data &&
          data.admission_document &&
          data.admission_document.admission_document
            ? data.admission_document.admission_document
            : "",
        isRequired: data && data.is_required ? "Required" : "Optional",
        notes: data && data.notes ? data.notes : "",
        createdAt:
          data && data.created_at
            ? moment(data.created_at).format("DD MMM YYYY hh:mm A")
            : "",
        updatedAt:
          data && data.updated_at
            ? moment(data.updated_at).format("DD MMM YYYY hh:mm A")
            : "",
        createdBy: data && data.created_by ? _.upperFirst(data.created_by) : "",
        updatedBy: data && data.updated_by ? _.upperFirst(data.updated_by) : "",
      };
    }),
    ["admissionDocument"]
  );
};

export { admissionDocumentsAPIResponse, schoolAdmissionDocumentsAPIResponse };
