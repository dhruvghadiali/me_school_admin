import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

const ProfileTab = () => {
  const { selectedAdmissionApplication } = useSelector(
    (state) => state.admissionApplication,
  );


  const applicantUser = _.get(selectedAdmissionApplication, "applicantUser", {});
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
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Student Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Full Name
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {`${applicantUser?.firstName || "-"} ${applicantUser?.lastName || "-"}`}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Date of Birth
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {studentProfile.dateOfBirth || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Gender
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {_.startCase(studentProfile.gender) || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Blood Group
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {studentProfile.bloodGroup || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Aadhaar Number
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {studentProfile.aadhaarNumber || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
              Nationality
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              {studentProfile.nationality || "N/A"}
            </p>
          </div>
        </div>

        {/* Medical Information */}
        {studentProfile.medicalInfo && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
              Medical Information
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={studentProfile.medicalInfo.hasHearingIssue}
                  disabled
                  className="cursor-not-allowed"
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Has Hearing Issue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={studentProfile.medicalInfo.hasVisionIssue}
                  disabled
                  className="cursor-not-allowed"
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Has Vision Issue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={studentProfile.medicalInfo.hasPhysicalIssue}
                  disabled
                  className="cursor-not-allowed"
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Has Physical Issue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={studentProfile.medicalInfo.hasMentalIssue}
                  disabled
                  className="cursor-not-allowed"
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Has Mental Issue
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={studentProfile.medicalInfo.hasAllergies}
                  disabled
                  className="cursor-not-allowed"
                />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Has Allergies
                </span>
              </div>
              {studentProfile.medicalInfo.hasAllergies &&
                studentProfile.medicalInfo.allergies?.length > 0 && (
                  <div className="ml-6 mt-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Allergies:
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {studentProfile.medicalInfo.allergies.join(", ")}
                    </p>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      {/* Father Information */}
      {fatherProfile && (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Father Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {`${fatherProfile.firstName} ${fatherProfile.lastName}`}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Phone Number
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {fatherProfile.phoneNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white break-all">
                {fatherProfile.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Aadhaar Number
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {fatherProfile.aadhaarNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Occupation
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {fatherProfile.occupation || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Education
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {fatherProfile.education || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Annual Income
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {fatherProfile.annualIncome
                  ? `₹${fatherProfile.annualIncome.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mother Information */}
      {motherProfile && (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Mother Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {`${motherProfile.firstName} ${motherProfile.lastName}`}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Phone Number
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {motherProfile.phoneNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white break-all">
                {motherProfile.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Aadhaar Number
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {motherProfile.aadhaarNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Occupation
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {motherProfile.occupation || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Education
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {motherProfile.education || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                Annual Income
              </p>
              <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                {motherProfile.annualIncome
                  ? `₹${motherProfile.annualIncome.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sibling Profiles */}
      {siblingProfiles && siblingProfiles.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sibling Information
          </h4>
          <div className="space-y-4">
            {siblingProfiles.map((sibling, index) => (
              <div
                key={sibling.id || index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Name
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {`${sibling.firstName} ${sibling.lastName}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Gender
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {_.startCase(sibling.gender) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Date of Birth
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {sibling.dateOfBirth || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Studying In Class
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {sibling.studyingInClass || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Same School
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {sibling.sameSchool ? "Yes" : "No"}
                    </p>
                  </div>
                  {!sibling.sameSchool && (
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        School Name
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        {sibling.schoolName || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Addresses */}
      {addresses && addresses.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Address Information
          </h4>
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <div
                key={address.id || index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <p className="text-sm font-medium text-primary mb-2">
                  {_.startCase(address.userType)} Address
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Address
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {address.address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      State
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {address.state || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      District
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {address.district || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      City
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {address.city || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Area Name
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {address.areaName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Zipcode
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {address.zipcode || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      {emergencyContacts && emergencyContacts.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Emergency Contacts
          </h4>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div
                key={contact.id || index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Name
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {contact.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Relation
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {_.startCase(contact.relation) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone Number
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {contact.phoneNumber || "N/A"}
                    </p>
                  </div>
                  {contact.alternatePhone && (
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        Alternate Phone
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        {contact.alternatePhone}
                      </p>
                    </div>
                  )}
                  {contact.email && (
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white break-all">
                        {contact.email}
                      </p>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Address
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {contact.address || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
