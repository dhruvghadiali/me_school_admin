import moment from "moment";
import _ from "lodash";

const eductionBoardsWithAcademicClassesAPIResponse = (data) => {
  const grouped = _.groupBy(data, (item) => item.education_board._id);

  if (!grouped || Object.keys(grouped).length === 0) {
    return [];
  } else {
    return _.map(grouped, (items) => {
      return {
        label: items[0].education_board.education_board,
        value: items[0].education_board._id,
        children: _.map(items, (item) => {
          return {
            label: item.academic_class.academic_class,
            value: item._id,
          };
        }),
      };
    });
  }
};

const feeTypesAPIResponse = (data) => {
  return {
    label: data.fee_type,
    value: data._id,
  };
};

const feesAPIResponse = (data) => {
  return {
    feeType: data && data.fee_type && data.fee_type.fee_type ? _.upperFirst(data.fee_type.fee_type) : "",
    monthlyFee: data && data.monthly_fee ? data.monthly_fee : 0,
    quarterlyFee: data && data.quarterly_fee ? data.quarterly_fee : 0,
    halfYearlyFee: data && data.half_yearly_fee ? data.half_yearly_fee : 0,
    yearlyFee: data && data.yearly_fee ? data.yearly_fee : 0,
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

export {
  eductionBoardsWithAcademicClassesAPIResponse,
  feeTypesAPIResponse,
  feesAPIResponse,
};
