import moment from "moment";
import _ from "lodash";

const feeTypesAPIResponse = (data) => {
  return _.map(data, (feeType) => ({
    label: feeType.fee_type ? _.upperFirst(feeType.fee_type) : "",
    value: feeType.id ? feeType.id : "",
  }));
};

const feesAPIResponse = (data) => {
  return {
    id: data && data.id ? data.id : "",
    feeType:
      data && data.fee_type && data.fee_type.fee_type
        ? _.upperFirst(data.fee_type.fee_type)
        : "",
    feeTypeValue:
      data && data.fee_type && data.fee_type.id ? data.fee_type.id : "",
    feeTypeLabel:
      data && data.fee_type && data.fee_type.fee_type ? data.fee_type.fee_type : "",
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
  feeTypesAPIResponse,
  feesAPIResponse,
};
