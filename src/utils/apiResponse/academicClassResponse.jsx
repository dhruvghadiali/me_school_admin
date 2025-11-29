import moment  from "moment";
import _  from "lodash";

const academicClassAPIResponse = (academicClass) => {
  return {
    id: academicClass.id || "",
    academicClass: academicClass.academic_class || "",
  };
};

const schoolAcademicClassAPIResponse = (data) => {
  return {
    id: data && data.id ? data.id : "",
    eductionBoard:
      data && data.education_board
        ? data.education_board
        : "",
    academicClass:
      data && data.academic_class && data.academic_class.academic_class
        ? _.startCase(data.academic_class.academic_class)
        : "",
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
};

export { academicClassAPIResponse, schoolAcademicClassAPIResponse };
