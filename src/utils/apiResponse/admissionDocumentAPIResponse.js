import _ from "lodash";
import moment from "moment";

const admissionDocumentAPIResponse = (data) => {
  return {
    label: data && data.admission_document ? data.admission_document : "",
    value: data && data.id ? data.id : "",
  };
};

const admissionDocumentsAPIResponse = (response) => {
  return _.sortBy(
    _.map(response, (data) => {
      return {
        id: data && data.id ? data.id : "",
        admissionDocument:
          data &&
          data.admission_document &&
          data.admission_document.admission_document
            ? data.admission_document.admission_document
            : "",
        isRequired: data && data.is_required ? 'Required' : 'Optional',
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

export { admissionDocumentAPIResponse, admissionDocumentsAPIResponse };
