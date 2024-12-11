import { homeScreenStaticValue } from "../../../../utils/staticValues";
const HomeScreenHeader = () => {
  return (
    <div>
      <p className="text-3xl font-semibold"> {homeScreenStaticValue.header} </p>
      <p className="text-sm mt-1"> {homeScreenStaticValue.subtitle} </p>
    </div>
  );
};

export default HomeScreenHeader;
