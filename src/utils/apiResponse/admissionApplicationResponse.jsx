import _ from "lodash";
import moment from "moment";

const formatApplicantUser = (applicantUser) => {
  if (!applicantUser || !_.isObject(applicantUser)) {
    return null;
  }

  const studentProfile = _.get(applicantUser, "student_profile", {});
  const parentProfiles = _.get(applicantUser, "parent_profile", []);
  const addresses = _.get(applicantUser, "address", []);
  const emergencyContacts = _.get(applicantUser, "emergency_contact", []);
  const siblingProfiles = _.get(applicantUser, "sibling_profile", []);

  return {
    id: _.get(applicantUser, "_id", ""),
    firstName: _.get(applicantUser, "first_name", ""),
    lastName: _.get(applicantUser, "last_name", ""),
    email: _.get(applicantUser, "email", ""),
    phoneNumber: _.get(applicantUser, "phone_number", ""),
    username: _.get(applicantUser, "username", ""),
    studentProfile: {
      id: _.get(studentProfile, "_id", ""),
      dateOfBirth: _.isString(_.get(studentProfile, "date_of_birth"))
        ? moment(_.get(studentProfile, "date_of_birth")).format("DD MMMM YYYY")
        : "",
      gender: _.get(studentProfile, "gender", ""),
      bloodGroup: _.get(studentProfile, "blood_group", ""),
      aadhaarNumber: _.get(studentProfile, "aadhaar_number", ""),
      nationality: _.get(studentProfile, "nationality", ""),
      medicalInfo: {
        hasHearingIssue: _.get(
          studentProfile,
          "medical_info.has_hearing_issue",
          false,
        ),
        hasVisionIssue: _.get(
          studentProfile,
          "medical_info.has_vision_issue",
          false,
        ),
        hasPhysicalIssue: _.get(
          studentProfile,
          "medical_info.has_physical_issue",
          false,
        ),
        hasMentalIssue: _.get(
          studentProfile,
          "medical_info.has_mental_issue",
          false,
        ),
        hasAllergies: _.get(
          studentProfile,
          "medical_info.has_allergies",
          false,
        ),
        allergies: _.get(studentProfile, "medical_info.allergies", []),
      },
    },
    parentProfiles: _.map(parentProfiles, (parent) => ({
      id: _.get(parent, "_id", ""),
      firstName: _.get(parent, "first_name", ""),
      lastName: _.get(parent, "last_name", ""),
      phoneNumber: _.get(parent, "phone_number", ""),
      email: _.get(parent, "email", ""),
      aadhaarNumber: _.get(parent, "aadhaar_number", ""),
      occupation: _.get(parent, "occupation", ""),
      education: _.get(parent, "education", ""),
      parentType: _.get(parent, "parent_type", ""),
      annualIncome: _.get(parent, "annual_income", 0),
      sameAddressAsStudent: _.get(parent, "same_address_as_student", false),
      alive: {
        status: _.get(parent, "alive.status", true),
        dateOfDeath: _.isString(_.get(parent, "alive.date_of_death"))
          ? moment(_.get(parent, "alive.date_of_death")).format("DD MMMM YYYY")
          : null,
        caringChildBy: _.get(parent, "alive.caring_child_by", null),
      },
    })),
    addresses: _.map(addresses, (address) => ({
      id: _.get(address, "_id", ""),
      userType: _.get(address, "user_type", ""),
      address: _.get(address, "address", ""),
      state: _.get(address, "state", ""),
      district: _.get(address, "district", ""),
      city: _.get(address, "city", ""),
      areaName: _.get(address, "area_name", ""),
      zipcode: _.get(address, "zipcode", ""),
    })),
    emergencyContacts: _.map(emergencyContacts, (contact) => ({
      id: _.get(contact, "_id", ""),
      name: _.get(contact, "name", ""),
      relation: _.get(contact, "relation", ""),
      phoneNumber: _.get(contact, "phone_number", ""),
      alternatePhone: _.get(contact, "alternate_phone", null),
      email: _.get(contact, "email", null),
      address: _.get(contact, "address", ""),
    })),
    siblingProfiles: _.map(siblingProfiles, (sibling) => ({
      id: _.get(sibling, "_id", ""),
      firstName: _.get(sibling, "first_name", ""),
      lastName: _.get(sibling, "last_name", ""),
      gender: _.get(sibling, "gender", ""),
      dateOfBirth: _.isString(_.get(sibling, "date_of_birth"))
        ? moment(_.get(sibling, "date_of_birth")).format("DD MMMM YYYY")
        : "",
      studyingInClass: _.get(sibling, "studying_in_class", ""),
      sameSchool: _.get(sibling, "same_school", false),
      schoolName: _.get(sibling, "school_name", ""),
      admissionNumber: _.get(sibling, "admission_number", ""),
    })),
  };
};

const admissionApplicationsAPIResponse = (admissionApplications) => {
  // Validate input
  if (!admissionApplications) {
    return [];
  }

  if (!_.isArray(admissionApplications)) {
    return [];
  }

  // Transform array of objects
  return _.map(admissionApplications, (application) => {
    // Validate individual application object
    if (!_.isObject(application)) {
      return null;
    }

    // Transform and return only required fields
    const formattedApplicantUser = formatApplicantUser(
      _.get(application, "applicant_user", {}),
    );

    const transformedApplication = {
      id: _.get(application, "id", ""),
      academicSession: _.get(application, "academic_session", ""),
      applicationNumber: _.get(application, "application_number", ""),
      status: _.upperCase(_.get(application, "status", "")),
      applicationStatus: _.get(application, "status", ""),
      createdBy: _.get(application, "created_by", ""),
      updatedBy: _.get(application, "updated_by", ""),
      createdAt: _.isString(_.get(application, "created_at", null))
        ? moment(_.get(application, "created_at")).format(
            "DD MMMM YYYY hh:mm A",
          )
        : "",
      updatedAt: _.isString(_.get(application, "updated_at", null))
        ? moment(_.get(application, "updated_at")).format(
            "DD MMMM YYYY hh:mm A",
          )
        : "",
      applicantUser: formattedApplicantUser,
      applicantName: formattedApplicantUser
        ? _.truncate(
            _.trim(
              `${_.startCase(
                _.get(formattedApplicantUser, "firstName", ""),
              )} ${_.startCase(_.get(formattedApplicantUser, "lastName", ""))}`,
            ),
            { length: 50, omission: "..." },
          )
        : "",
      academicClass:
        _.isObject(_.get(application, "school_academic_class")) &&
        _.isObject(_.get(application, "school_academic_class.academic_class"))
          ? _.upperCase(
              _.get(
                application,
                "school_academic_class.academic_class.academic_class",
                "",
              ),
            )
          : "",
      educationBoard:
        _.isObject(_.get(application, "school_academic_class")) &&
        _.isObject(_.get(application, "school_academic_class.education_board"))
          ? _.upperCase(
              _.get(
                application,
                "school_academic_class.education_board.education_board",
                "",
              ),
            )
          : "",
      statusHistory: _.map(
        _.orderBy(
          _.get(application, "status_history", []),
          [(history) => _.get(history, "changed_at")],
          ["desc"],
        ),
        (history) => ({
          id: _.get(history, "_id", ""),
          status: _.upperCase(_.get(history, "status", "")),
          changedBy: {
            id: _.get(history, "changed_by.id", ""),
            firstName: _.get(history, "changed_by.first_name", ""),
            lastName: _.get(history, "changed_by.last_name", ""),
            username: _.get(history, "changed_by.username", ""),
          },
          changedAt: _.isString(_.get(history, "changed_at"))
            ? moment(_.get(history, "changed_at")).format(
                "DD MMMM YYYY hh:mm A",
              )
            : "",
          remarks: _.get(history, "remarks", ""),
        }),
      ),
      documents: _.map(
        _.get(application, "verified_documents", []),
        (doc) => ({
          id: _.get(doc, "school_admission_document.admission_document._id", ""),
          admissionDocument: _.get(doc, "school_admission_document.admission_document.admission_document", ""),
          isRequired: _.get(doc, "school_admission_document.is_required", false),
          isVerified: _.get(doc, "is_verified", false),
          notes: _.get(doc, "notes", ""),
        }),
      ),
    };

    // Validate required fields
    if (!transformedApplication.id) {
      return null;
    }

    return transformedApplication;
  }).filter((app) => app !== null); // Remove null entries from invalid objects
};

const updatedAdmissionApplicationStatusAPIResponse = (application) => {
  return {
    id: _.get(application, "id", ""),
    status: _.upperCase(_.get(application, "status", "")),
    applicationStatus: _.get(application, "status", ""),
    statusHistory: _.map(
      _.orderBy(
        _.get(application, "status_history", []),
        [(history) => _.get(history, "changed_at")],
        ["desc"],
      ),
      (history) => ({
        id: _.get(history, "_id", ""),
        status: _.upperCase(_.get(history, "status", "")),
        changedBy: {
          id: _.get(history, "changed_by.id", ""),
          firstName: _.get(history, "changed_by.first_name", ""),
          lastName: _.get(history, "changed_by.last_name", ""),
          username: _.get(history, "changed_by.username", ""),
        },
        changedAt: _.isString(_.get(history, "changed_at"))
          ? moment(_.get(history, "changed_at")).format(
              "DD MMMM YYYY hh:mm A",
            )
          : "",
        remarks: _.get(history, "remarks", ""),
      }),
    ),
  };
};

export { admissionApplicationsAPIResponse, formatApplicantUser, updatedAdmissionApplicationStatusAPIResponse };
