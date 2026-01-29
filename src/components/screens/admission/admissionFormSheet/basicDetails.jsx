import { useSelector } from "react-redux";

import _ from "lodash";

const AdmissionBasicDetails = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );

  console.log("selectedAdmissionApplication", selectedAdmissionApplication);

  const detailsData = [
    { label: "Application Number", value: selectedAdmissionApplication.applicationNumber },
    { label: "Academic Session", value: selectedAdmissionApplication.academicSession },
    { label: "Education Board", value: selectedAdmissionApplication.educationBoard },
    { label: "Academic Class", value: selectedAdmissionApplication.academicClass },
    { label: "Student Name", value: selectedAdmissionApplication.applicantName },
    {
      label: "Email",
      value: _.get(selectedAdmissionApplication, "applicantUser.email", "N/A"),
    },
    {
      label: "Phone Number",
      value: _.get(selectedAdmissionApplication, "applicantUser.phoneNumber", "N/A"),
    },
    { label: "Application Status", value: selectedAdmissionApplication.status },
    { label: "Created Date", value: selectedAdmissionApplication.createdAt },
    { label: "Created By", value: selectedAdmissionApplication.createdBy || "N/A" },
    { label: "Updated Date", value: selectedAdmissionApplication.updatedAt },
    { label: "Updated By", value: selectedAdmissionApplication.updatedBy || "N/A" },
    { label: "Payment Method", value: selectedAdmissionApplication.paymentMethod || "N/A" },
  ];

  return (
    <div className="bg-secondary/10 rounded-lg p-4 sm:p-6 border border-primary/50 shadow-lg shadow-primary/50">
      <h3 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">
        Application Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {detailsData.map((detail, index) => (
          <div key={index} className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-primary/90">
              {detail.label}
            </p>
            <p className="text-sm sm:text-base font-semibold text-primary/70 wrap-break-word">
              {detail.value || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionBasicDetails;
