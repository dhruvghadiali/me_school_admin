import MEAuthHoc from "@MECommonComponents/hoc/meAuthHoc";

const FacilityScreen = () => {
  //   const dispatch = useDispatch();
  //   const { feeLoader } = useSelector((state) => state.fee);

  //   useEffect(() => {
  //     dispatch(getFeeTypes());
  //     dispatch(getAcademicClasses());
  //   }, [dispatch]);

  return (
    <>
      <MEAuthHoc>
        <div className="mr-10">
          <h1> Facility Screen </h1>
          {/* <FeeScreenHeader/>
          {feeLoader ? <FeeScreenAGGridLoader /> : <FeeScreenAGGridTable />} */}
        </div>
      </MEAuthHoc>
    </>
  );
};

export default FacilityScreen;
