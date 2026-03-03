import { useSelector } from "react-redux";

import _ from "lodash";
import MEInformationCardComponent from "@MECommonComponents/card/informationCard";

const AdmissionBasicDetails = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  const basicInformation = [
    {
      label: "Application Number",
      value: selectedAdmissionApplication.applicationNumber,
    },
    {
      label: "Academic Session",
      value: selectedAdmissionApplication.academicSession,
    },
    {
      label: "Education Board",
      value: selectedAdmissionApplication.educationBoard,
    },
    {
      label: "Academic Class",
      value: selectedAdmissionApplication.academicClass,
    },
    {
      label: "Student Name",
      value: selectedAdmissionApplication.applicantName,
    },
    {
      label: "Email",
      value: _.get(selectedAdmissionApplication, "applicantUser.email", "N/A"),
    },
    {
      label: "Phone Number",
      value: _.get(
        selectedAdmissionApplication,
        "applicantUser.phoneNumber",
        "N/A",
      ),
    },
    { label: "Application Status", value: selectedAdmissionApplication.status },
    { label: "Created Date", value: selectedAdmissionApplication.createdAt },
    {
      label: "Created By",
      value: selectedAdmissionApplication.createdBy || "N/A",
    },
    { label: "Updated Date", value: selectedAdmissionApplication.updatedAt },
    {
      label: "Updated By",
      value: selectedAdmissionApplication.updatedBy || "N/A",
    },
    {
      label: "Payment Method",
      value: selectedAdmissionApplication.paymentMethod || "N/A",
    },
  ];

  return (
    <MEInformationCardComponent
      informationList={basicInformation}
      title={"Application Information"}
    />
  );
};

export default AdmissionBasicDetails;
