import _ from "lodash";
import moment from "moment";

const educationBoardsInfo = (data) => {
  return {
    id: data && data.id ? data.id : "",
    educationBoard: data && data.education_board ? data.education_board : "",
  };
};

const schoolAcademicClassAPIResponse = (data) => {
  return {
    id: data && data.id ? data.id : "",
    eductionBoard:
      data && data.education_board
        ? educationBoardsInfo(data.education_board)
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

const academicClassAPIResponse = (data) => {
  return {
    id: data && data.id ? data.id : "",
    academicClass:
      data && data.academic_class && data.academic_class
        ? data.academic_class
        : "",
  };
};

export {
  schoolAcademicClassAPIResponse,
  academicClassAPIResponse,
};
