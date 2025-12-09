import moment from "moment";
import _ from "lodash";

const feeTypesAPIResponse = (data) => {
  return _.map(data, (feeType) => ({
    label: feeType.fee_type ? _.upperFirst(feeType.fee_type) : "",
    value: feeType.id ? feeType.id : "",
  }));
};

const feesAPIResponse = (data) => {
  return _.map(data, (fee) => ({
    id: fee && fee.id ? fee.id : "",
    feeType:
      fee && fee.fee_type && fee.fee_type.fee_type
        ? _.upperFirst(fee.fee_type.fee_type)
        : "",
    feeTypeValue:
      fee && fee.fee_type && fee.fee_type.id ? fee.fee_type.id : "",
    feeTypeLabel:
      fee && fee.fee_type && fee.fee_type.fee_type
        ? fee.fee_type.fee_type
        : "",
    monthlyFee: fee && fee.monthly_fee ? fee.monthly_fee : 0,
    quarterlyFee: fee && fee.quarterly_fee ? fee.quarterly_fee : 0,
    halfYearlyFee: fee && fee.half_yearly_fee ? fee.half_yearly_fee : 0,
    yearlyFee: fee && fee.yearly_fee ? fee.yearly_fee : 0,
    createdAt:
      fee && fee.created_at
        ? moment(fee.created_at).format("DD MMM YYYY hh:mm A")
        : "",
    updatedAt:
      fee && fee.updated_at
        ? moment(fee.updated_at).format("DD MMM YYYY hh:mm A")
        : "",
    createdBy: fee && fee.created_by ? _.upperFirst(fee.created_by) : "",
    updatedBy: fee && fee.updated_by ? _.upperFirst(fee.updated_by) : "",
  }));
};

export { feeTypesAPIResponse, feesAPIResponse };
