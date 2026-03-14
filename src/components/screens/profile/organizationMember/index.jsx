import OrganizationMemberCardComponent from "@MEScreenComponents/profile/organizationMember/organizationMemberCard";
import OrganizationMemberSheetComponent from "@MEScreenComponents/profile/organizationMember/organizationMemberSheet";

const OrganizationMemberComponent = () => {
  return (
    <div className="mt-5">
      <OrganizationMemberCardComponent />
      <OrganizationMemberSheetComponent />
    </div>
  );
};

export default OrganizationMemberComponent;
