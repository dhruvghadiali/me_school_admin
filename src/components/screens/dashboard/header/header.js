import { dashboardScreenStaticValue } from "../../../../utils/staticValues";
const DashboardScreenHeader = () => {
  return (
    <div>
      <p className="text-3xl font-semibold"> {dashboardScreenStaticValue.header} </p>
      <p className="text-sm mt-1"> {dashboardScreenStaticValue.subtitle} </p>
    </div>
  );
};

export default DashboardScreenHeader;
