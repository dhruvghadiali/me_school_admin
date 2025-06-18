const addFeeAPIPayload = (payload) => {
    const {academicClass, feeType, monthlyFee, quarterlyFee, halfYearlyFee, yearlyFee} = payload;
    return{
        school_academic_class: academicClass,
        fee_type: feeType,
        monthly_fee: monthlyFee,
        quarterly_fee: quarterlyFee,
        half_yearly_fee: halfYearlyFee,
        yearly_fee: yearlyFee,
    }
}

export {
    addFeeAPIPayload,
}