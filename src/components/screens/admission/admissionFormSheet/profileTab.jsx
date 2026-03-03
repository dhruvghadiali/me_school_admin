import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import MEInformationCardComponent from "@MECommonComponents/card/informationCard";
import MENestedInformationCardComponent from "@MECommonComponents/card/nestedInformationCard";

const ProfileTab = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  const applicantUser = _.get(
    selectedAdmissionApplication,
    "applicantUser",
    {},
  );
  const studentProfile = _.get(applicantUser, "studentProfile", {});
  const parentProfiles = _.get(applicantUser, "parentProfiles", []);
  const siblingProfiles = _.get(applicantUser, "siblingProfiles", []);
  const addresses = _.get(applicantUser, "addresses", []);
  const emergencyContacts = _.get(applicantUser, "emergencyContacts", []);

  const fatherProfile = _.find(
    parentProfiles,
    (parent) => _.toLower(parent.parentType) === "father",
  );
  const motherProfile = _.find(
    parentProfiles,
    (parent) => _.toLower(parent.parentType) === "mother",
  );

  return (
    <div className="space-y-6">
      {/* Student Information */}
      <MEInformationCardComponent
        title={"Student Information"}
        informationList={[
          {
            label: "Full Name",
            value: `${applicantUser.firstName || "-"} ${applicantUser.lastName || "-"}`,
          },
          {
            label: "Date of Birth",
            value: studentProfile.dateOfBirth || "N/A",
          },
          {
            label: "Gender",
            value: _.startCase(studentProfile.gender) || "N/A",
          },
          { label: "Blood Group", value: studentProfile.bloodGroup || "N/A" },
          {
            label: "Aadhaar Number",
            value: studentProfile.aadhaarNumber || "N/A",
          },
          { label: "Nationality", value: studentProfile.nationality || "N/A" },
        ]}
      />

      {/* Student Medical Information */}
      <MEInformationCardComponent
        title={"Student Medical Information"}
        informationList={[
          {
            label: "Has Hearing Issue",
            value: studentProfile.medicalInfo?.hasHearingIssue ? "Yes" : "No",
          },
          {
            label: "Has Vision Issue",
            value: studentProfile.medicalInfo?.hasVisionIssue ? "Yes" : "No",
          },
          {
            label: "Has Physical Issue",
            value: studentProfile.medicalInfo?.hasPhysicalIssue ? "Yes" : "No",
          },
          {
            label: "Has Mental Issue",
            value: studentProfile.medicalInfo?.hasMentalIssue ? "Yes" : "No",
          },
          {
            label: "Has Allergies",
            value: studentProfile.medicalInfo?.hasAllergies ? "Yes" : "No",
          },
          ...(studentProfile.medicalInfo?.hasAllergies &&
          studentProfile.medicalInfo.allergies
            ? [
                {
                  label: "Allergies",
                  value: studentProfile.medicalInfo.allergies.join(", "),
                },
              ]
            : []),
        ]}
      />

      {/* Father Information */}
      {fatherProfile && (
        <MEInformationCardComponent
          title={"Father Information"}
          informationList={[
            {
              label: "Full Name",
              value: `${fatherProfile.firstName || "-"} ${
                fatherProfile.lastName || "-"
              }`,
            },
            {
              label: "Phone Number",
              value: fatherProfile.phoneNumber || "N/A",
            },
            { label: "Email", value: fatherProfile.email || "N/A" },
            {
              label: "Aadhaar Number",
              value: fatherProfile.aadhaarNumber || "N/A",
            },
            { label: "Occupation", value: fatherProfile.occupation || "N/A" },
            { label: "Education", value: fatherProfile.education || "N/A" },
            {
              label: "Annual Income",
              value: fatherProfile.annualIncome
                ? `₹${fatherProfile.annualIncome.toLocaleString()}`
                : "N/A",
            },
          ]}
        />
      )}

      {/* Mother Information */}
      {motherProfile && (
        <MEInformationCardComponent
          title={"Mother Information"}
          informationList={[
            {
              label: "Full Name",
              value: `${motherProfile.firstName || "-"} ${
                motherProfile.lastName || "-"
              }`,
            },
            {
              label: "Phone Number",
              value: motherProfile.phoneNumber || "N/A",
            },
            { label: "Email", value: motherProfile.email || "N/A" },
            {
              label: "Aadhaar Number",
              value: motherProfile.aadhaarNumber || "N/A",
            },
            { label: "Occupation", value: motherProfile.occupation || "N/A" },
            { label: "Education", value: motherProfile.education || "N/A" },
            {
              label: "Annual Income",
              value: motherProfile.annualIncome
                ? `₹${motherProfile.annualIncome.toLocaleString()}`
                : "N/A",
            },
          ]}
        />
      )}

      {/* Sibling Profiles */}
      {siblingProfiles && siblingProfiles.length > 0 && (
        <MENestedInformationCardComponent
          title={"Sibling Information"}
          informationList={_.map(siblingProfiles, (sibling, index) => {
            return {
              title: "Sibling " + (index + 1),
              nestedInformationList: [
                {
                  label: "Full Name",
                  value: `${sibling.firstName || "-"} ${sibling.lastName || "-"}`,
                },
                {
                  label: "Gender",
                  value: _.startCase(sibling.gender) || "N/A",
                },
                {
                  label: "Date of Birth",
                  value: sibling.dateOfBirth || "N/A",
                },
                {
                  label: "Studying In Class",
                  value: sibling.studyingInClass || "N/A",
                },
                {
                  label: "Same School",
                  value: sibling.sameSchool ? "Yes" : "No",
                },
                ...(!sibling.sameSchool
                  ? [
                      {
                        label: "School Name",
                        value: sibling.schoolName || "N/A",
                      },
                    ]
                  : []),
              ],
            };
          })}
        />
      )}

      {/* Addresses */}
      {addresses && addresses.length > 0 && (
        <MENestedInformationCardComponent
          title={"Address Information"}
          informationList={_.map(addresses, (address, index) => {
            return {
              title: `${_.startCase(address.userType)} Address`,
              nestedInformationList: [
                {
                  label: "Address",
                  value: address.address || "N/A",
                },
                {
                  label: "State",
                  value: address.state || "N/A",
                },
                {
                  label: "District",
                  value: address.district || "N/A",
                },
                {
                  label: "City",
                  value: address.city || "N/A",
                },
                {
                  label: "Area Name",
                  value: address.areaName || "N/A",
                },
                {
                  label: "Zipcode",
                  value: address.zipcode || "N/A",
                },
              ],
            };
          })}
        />
      )}

      {/* Emergency Contacts */}
      {emergencyContacts && emergencyContacts.length > 0 && (
        <MENestedInformationCardComponent
          title={"Emergency Contact Information"}
          informationList={_.map(emergencyContacts, (contact, index) => {
            return {
              title: `Contact ${index + 1}`,
              nestedInformationList: [
                {
                  label: "Name",
                  value: contact.name || "N/A",
                },
                {
                  label: "Relation",
                  value: _.startCase(contact.relation) || "N/A",
                },
                {
                  label: "Phone Number",
                  value: contact.phoneNumber || "N/A",
                },
                ...(contact.alternatePhone
                  ? [
                      {
                        label: "Alternate Phone",
                        value: contact.alternatePhone,
                      },
                    ]
                  : []),
                ...(contact.email
                  ? [
                      {
                        label: "Email",
                        value: contact.email,
                      },
                    ]
                  : []),
                {
                  label: "Address",
                  value: contact.address || "N/A",
                },  
              ],
            };
          })}
        />
      )}
    </div>
  );
};

export default ProfileTab;
