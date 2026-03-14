import { useSelector } from "react-redux";

import _ from "lodash";

import OrganizationInformationCardComponent from "@MEScreenComponents/profile/organizationInformation/organizationInformationCard";
import OrganizationInformationNotFoundCardComponent from "@MEScreenComponents/profile/organizationInformation/organizationInformationNotFoundCard";

const OrganizationInformationComponent = () => {
  const { user } = useSelector((state) => state.authentication);

  return _.get(user, "organization", null) ? (
    <OrganizationInformationCardComponent />
  ) : (
    <OrganizationInformationNotFoundCardComponent />
  );
};

export default OrganizationInformationComponent;
