import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import OrganizationMemberCardComponent from "@MEScreenComponents/profile/organizationMember/organizationMemberCard";
import AboutSchoolSheetComponet from "@MEScreenComponents/profile/aboutSchool/aboutSchoolSheet";

const OrganizationMemberComponent = () => {
  return (
    <div className="mt-5">
      <OrganizationMemberCardComponent />
      <AboutSchoolSheetComponet />
    </div>
  );
};

export default OrganizationMemberComponent;
