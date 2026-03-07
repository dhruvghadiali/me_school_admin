import PropTypes from "prop-types";

import { variants } from "@MEUtils/enums";
import MEInput from "@MECommonComponents/form/input/meInput";
import MESelect from "@MECommonComponents/form/select/meSelect";

// ---------------------------------------------------------------------------
// Fee fields shown when status = FEES_PAID
// ---------------------------------------------------------------------------

const AdmissionFormFeeFields = ({
  values,
  errors,
  paymentMethodItems,
  transactionIdRequired,
  onChange,
  onBlur,
  setFieldValue,
}) => (
  <>
    <div>
      <MEInput
        id="feePaidBy"
        name="feePaidBy"
        type="text"
        label="Fee Paid By"
        placeholder="Enter payer name"
        value={values.feePaidBy}
        message={errors.feePaidBy}
        labelvariant={errors.feePaidBy ? variants.DANGER : variants.PRIMARY}
        inputvariant={errors.feePaidBy ? variants.DANGER : variants.PRIMARY}
        messagevariant={variants.DANGER}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>

    <div>
      <MEInput
        id="feePaidAmount"
        name="feePaidAmount"
        type="number"
        label="Amount Paid"
        placeholder="Enter amount"
        value={values.feePaidAmount}
        message={errors.feePaidAmount}
        labelvariant={errors.feePaidAmount ? variants.DANGER : variants.PRIMARY}
        inputvariant={errors.feePaidAmount ? variants.DANGER : variants.PRIMARY}
        messagevariant={variants.DANGER}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>

    <div>
      <MESelect
        label="Payment Method"
        placeholder="Select Payment Method"
        items={paymentMethodItems}
        selectedValue={values.paymentMethod}
        selectVariant={errors.paymentMethod ? variants.DANGER : variants.DARK}
        selectedVariant={variants.DARK}
        labelvariant={variants.DARK}
        messagevariant={variants.DANGER}
        message={errors.paymentMethod}
        clearable={true}
        onValueChange={(value) => {
          setFieldValue("paymentMethod", value);
          setFieldValue("transactionId", "");
        }}
      />
    </div>

    {transactionIdRequired && (
      <div>
        <MEInput
          id="transactionId"
          name="transactionId"
          type="text"
          label="Transaction ID"
          placeholder="Enter transaction ID"
          value={values.transactionId}
          message={errors.transactionId}
          labelvariant={errors.transactionId ? variants.DANGER : variants.PRIMARY}
          inputvariant={errors.transactionId ? variants.DANGER : variants.PRIMARY}
          messagevariant={variants.DANGER}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    )}
  </>
);

AdmissionFormFeeFields.propTypes = {
  values: PropTypes.shape({
    feePaidBy: PropTypes.string,
    feePaidAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paymentMethod: PropTypes.string,
    transactionId: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    feePaidBy: PropTypes.string,
    feePaidAmount: PropTypes.string,
    paymentMethod: PropTypes.string,
    transactionId: PropTypes.string,
  }),
  paymentMethodItems: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ).isRequired,
  transactionIdRequired: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default AdmissionFormFeeFields;
