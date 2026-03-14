import { useSelector } from "react-redux";

import _ from "lodash";

import SchoolInformationCardComponent from "@MEScreenComponents/profile/schoolInformation/schoolInformationCard";
import SchoolInformationNotFoundCardComponent from "@MEScreenComponents/profile/schoolInformation/schoolInformationNotFoundCard";

const SchoolInformationComponent = () => {
  const { user } = useSelector((state) => state.authentication);

  return _.get(user, "school", null) ? (
    <SchoolInformationCardComponent />
  ) : (
    <SchoolInformationNotFoundCardComponent />
  );
};

export default SchoolInformationComponent;
