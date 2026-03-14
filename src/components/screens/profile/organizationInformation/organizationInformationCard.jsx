import { useSelector } from "react-redux";
import { School2Icon, Building2Icon } from "lucide-react";

import _ from "lodash";

import MEInformationCardComponent from "@MECommonComponents/card/informationCard";

const OrganizationInformationCardComponent = () => {
  const { user } = useSelector((state) => state.authentication);

  const organizationInformation = user?.organization || {};

  return (
    <MEInformationCardComponent
      informationList={[
        {
          label: "Organization Name",
          value:
            `${_.startCase(organizationInformation.name)} (${_.upperCase(organizationInformation.shortName)})` ||
            "N/A",
        },
        {
          label: "Email",
          value: organizationInformation.email || "N/A",
        },
        {
          label: "Contact Number",
          value: `+91 ${organizationInformation.phoneNumber}` || "N/A",
        },
        {
          label: "Government Registration Number",
          value:
            _.upperCase(organizationInformation.governmentRegistrationNumber) ||
            "N/A",
        },
        {
          label: "Address",
          value: _.startCase(organizationInformation.address) || "N/A",
        },
        {
          label: "State",
          value: _.upperCase(organizationInformation.state) || "N/A",
        },
        {
          label: "District",
          value: _.upperCase(organizationInformation.district) || "N/A",
        },
        {
          label: "City",
          value: _.upperCase(organizationInformation.city) || "N/A",
        },
        {
          label: "Area Name",
          value: _.upperCase(organizationInformation.areaName) || "N/A",
        },
        {
          label: "Zipcode",
          value: _.upperCase(organizationInformation.zipcode) || "N/A",
        },
      ]}
      titleIcon={<School2Icon className="w-5 h-5" />}
      title={"Basic Information"}
    />
  );
};

export default OrganizationInformationCardComponent;
