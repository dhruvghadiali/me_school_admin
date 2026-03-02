import _ from "lodash";
import moment from "moment";

// ---------------------------------------------------------------------------
// Shared formatters
// ---------------------------------------------------------------------------

const formatDate = (value, fmt = "DD MMMM YYYY") =>
  _.isString(value) ? moment(value).format(fmt) : "";

const formatDateTime = (value) => formatDate(value, "DD MMMM YYYY hh:mm A");

const formatFullName = (obj, firstKey = "first_name", lastKey = "last_name") =>
  _.trim(
    `${_.startCase(_.get(obj, firstKey, ""))} ${_.startCase(_.get(obj, lastKey, ""))}`,
  );

const formatUserRef = (user) => {
  if (!user) return "";
  return _.trim(
    `${formatFullName(user)} (${_.get(user, "username", "")})`,
  );
};

const formatStatusHistory = (raw) =>
  _.map(
    _.orderBy(raw, [(h) => _.get(h, "changed_at")], ["desc"]),
    (history) => ({
      id: _.get(history, "_id", ""),
      status: _.upperCase(_.get(history, "status", "")),
      changedBy: {
        id: _.get(history, "changed_by.id", ""),
        firstName: _.get(history, "changed_by.first_name", ""),
        lastName: _.get(history, "changed_by.last_name", ""),
        username: _.get(history, "changed_by.username", ""),
      },
      changedAt: formatDateTime(_.get(history, "changed_at")),
      remarks: _.get(history, "remarks", ""),
    }),
  );

const formatDocument = (doc) => ({
  id: _.get(doc, "school_admission_document.admission_document._id", ""),
  admissionDocument: _.get(
    doc,
    "school_admission_document.admission_document.admission_document",
    "",
  ),
  isRequired: _.get(doc, "school_admission_document.is_required", false),
  isVerified: _.get(doc, "is_verified", false),
  notes: _.get(doc, "notes", ""),
});

const formatDocumentVerificationItem = (doc) => ({
  id: _.get(doc, "school_admission_document.admission_document._id", ""),
  schoolAdmissionDocumentId: _.get(doc, "school_admission_document._id", ""),
  isRequired: _.get(doc, "school_admission_document.is_required", false),
  isSelected: _.get(doc, "is_verified", false),
  label: `${_.upperFirst(_.get(doc, "school_admission_document.admission_document.admission_document", ""))} - (${_.get(doc, "school_admission_document.is_required", false) ? "Required" : "Optional"})`,
});

const formatAppointment = (appointment, dateFormat = "DD MMMM YYYY hh:mm A") => ({
  id: _.get(appointment, "_id", ""),
  scheduledDate: formatDate(_.get(appointment, "scheduled_date"), dateFormat),
  scheduledTimeSlot: _.get(appointment, "scheduled_time_slot", ""),
  bookedAt: formatDateTime(_.get(appointment, "booked_at")),
  bookedBy: formatUserRef(_.get(appointment, "booked_by")),
  remarks: _.get(appointment, "remarks", ""),
});

const formatAppointmentList = (raw, dateFormat) =>
  _.map(
    _.orderBy(raw, [(a) => _.get(a, "booked_at")], ["desc"]),
    (a) => formatAppointment(a, dateFormat),
  );

// ---------------------------------------------------------------------------
// formatApplicantUser
// ---------------------------------------------------------------------------

const formatApplicantUser = (applicantUser) => {
  if (!applicantUser || !_.isObject(applicantUser)) return null;

  const studentProfile = _.get(applicantUser, "student_profile", {});
  const parentProfiles  = _.get(applicantUser, "parent_profile", []);
  const addresses       = _.get(applicantUser, "address", []);
  const emergencyContacts = _.get(applicantUser, "emergency_contact", []);
  const siblingProfiles = _.get(applicantUser, "sibling_profile", []);

  return {
    id:          _.get(applicantUser, "_id", ""),
    firstName:   _.get(applicantUser, "first_name", ""),
    lastName:    _.get(applicantUser, "last_name", ""),
    email:       _.get(applicantUser, "email", ""),
    phoneNumber: _.get(applicantUser, "phone_number", ""),
    username:    _.get(applicantUser, "username", ""),

    studentProfile: {
      id:            _.get(studentProfile, "_id", ""),
      dateOfBirth:   formatDate(_.get(studentProfile, "date_of_birth")),
      gender:        _.get(studentProfile, "gender", ""),
      bloodGroup:    _.get(studentProfile, "blood_group", ""),
      aadhaarNumber: _.get(studentProfile, "aadhaar_number", ""),
      nationality:   _.get(studentProfile, "nationality", ""),
      medicalInfo: {
        hasHearingIssue:  _.get(studentProfile, "medical_info.has_hearing_issue", false),
        hasVisionIssue:   _.get(studentProfile, "medical_info.has_vision_issue", false),
        hasPhysicalIssue: _.get(studentProfile, "medical_info.has_physical_issue", false),
        hasMentalIssue:   _.get(studentProfile, "medical_info.has_mental_issue", false),
        hasAllergies:     _.get(studentProfile, "medical_info.has_allergies", false),
        allergies:        _.get(studentProfile, "medical_info.allergies", []),
      },
    },

    parentProfiles: _.map(parentProfiles, (parent) => ({
      id:                   _.get(parent, "_id", ""),
      firstName:            _.get(parent, "first_name", ""),
      lastName:             _.get(parent, "last_name", ""),
      phoneNumber:          _.get(parent, "phone_number", ""),
      email:                _.get(parent, "email", ""),
      aadhaarNumber:        _.get(parent, "aadhaar_number", ""),
      occupation:           _.get(parent, "occupation", ""),
      education:            _.get(parent, "education", ""),
      parentType:           _.get(parent, "parent_type", ""),
      annualIncome:         _.get(parent, "annual_income", 0),
      sameAddressAsStudent: _.get(parent, "same_address_as_student", false),
      alive: {
        status:       _.get(parent, "alive.status", true),
        dateOfDeath:  formatDate(_.get(parent, "alive.date_of_death")) || null,
        caringChildBy: _.get(parent, "alive.caring_child_by", null),
      },
    })),

    addresses: _.map(addresses, (address) => ({
      id:        _.get(address, "_id", ""),
      userType:  _.get(address, "user_type", ""),
      address:   _.get(address, "address", ""),
      state:     _.get(address, "state", ""),
      district:  _.get(address, "district", ""),
      city:      _.get(address, "city", ""),
      areaName:  _.get(address, "area_name", ""),
      zipcode:   _.get(address, "zipcode", ""),
    })),

    emergencyContacts: _.map(emergencyContacts, (contact) => ({
      id:             _.get(contact, "_id", ""),
      name:           _.get(contact, "name", ""),
      relation:       _.get(contact, "relation", ""),
      phoneNumber:    _.get(contact, "phone_number", ""),
      alternatePhone: _.get(contact, "alternate_phone", null),
      email:          _.get(contact, "email", null),
      address:        _.get(contact, "address", ""),
    })),

    siblingProfiles: _.map(siblingProfiles, (sibling) => ({
      id:              _.get(sibling, "_id", ""),
      firstName:       _.get(sibling, "first_name", ""),
      lastName:        _.get(sibling, "last_name", ""),
      gender:          _.get(sibling, "gender", ""),
      dateOfBirth:     formatDate(_.get(sibling, "date_of_birth")),
      studyingInClass: _.get(sibling, "studying_in_class", ""),
      sameSchool:      _.get(sibling, "same_school", false),
      schoolName:      _.get(sibling, "school_name", ""),
      admissionNumber: _.get(sibling, "admission_number", ""),
    })),
  };
};

// ---------------------------------------------------------------------------
// admissionApplicationsAPIResponse
// ---------------------------------------------------------------------------

const admissionApplicationsAPIResponse = (admissionApplications) => {
  if (!admissionApplications || !_.isArray(admissionApplications)) return [];

  return _.filter(
    _.map(admissionApplications, (application) => {
      if (!_.isObject(application)) return null;

      const formattedApplicantUser = formatApplicantUser(
        _.get(application, "applicant_user", {}),
      );

      const verifiedDocuments = _.get(application, "verified_documents", []);

      const transformed = {
        id:                _.get(application, "id", ""),
        academicSession:   _.get(application, "academic_session", ""),
        applicationNumber: _.get(application, "application_number", ""),
        status:            _.upperCase(_.get(application, "status", "")),
        applicationStatus: _.get(application, "status", ""),
        createdBy:         _.get(application, "created_by", ""),
        updatedBy:         _.get(application, "updated_by", ""),
        createdAt:         formatDateTime(_.get(application, "created_at")),
        updatedAt:         formatDateTime(_.get(application, "updated_at")),

        applicantUser: formattedApplicantUser,
        applicantName: formattedApplicantUser
          ? _.truncate(
              formatFullName(formattedApplicantUser, "firstName", "lastName"),
              { length: 50, omission: "..." },
            )
          : "",

        academicClass:
          _.isObject(_.get(application, "school_academic_class")) &&
          _.isObject(_.get(application, "school_academic_class.academic_class"))
            ? _.upperCase(_.get(application, "school_academic_class.academic_class.academic_class", ""))
            : "",

        educationBoard:
          _.isObject(_.get(application, "school_academic_class")) &&
          _.isObject(_.get(application, "school_academic_class.education_board"))
            ? _.upperCase(_.get(application, "school_academic_class.education_board.education_board", ""))
            : "",

        statusHistory: formatStatusHistory(_.get(application, "status_history", [])),

        documents:                     _.map(verifiedDocuments, formatDocument),
        documentVerificationList:      _.map(verifiedDocuments, formatDocumentVerificationItem),
        documentVerificationAppointments: formatAppointmentList(_.get(application, "document_verification_appointment", [])),
        feePaymentAppointments:           formatAppointmentList(_.get(application, "fee_payment_appointment", []), "DD MMMM YYYY"),
      };

      return transformed.id ? transformed : null;
    }),
    (app) => app !== null,
  );
};

// ---------------------------------------------------------------------------
// updatedAdmissionApplicationStatusAPIResponse
// ---------------------------------------------------------------------------

const updatedAdmissionApplicationStatusAPIResponse = (application) => ({
  id:                _.get(application, "id", ""),
  status:            _.upperCase(_.get(application, "status", "")),
  applicationStatus: _.get(application, "status", ""),
  statusHistory:     formatStatusHistory(_.get(application, "status_history", [])),
});

// ---------------------------------------------------------------------------
// updateDocumentVerificationAppointmentBookingAPIResponse
// ---------------------------------------------------------------------------

const updateDocumentVerificationAppointmentBookingAPIResponse = (application) => ({
  id:                _.get(application, "id", ""),
  status:            _.upperCase(_.get(application, "status", "")),
  applicationStatus: _.get(application, "status", ""),
  statusHistory:     formatStatusHistory(_.get(application, "status_history", [])),
  documents:         _.map(
    _.orderBy(
      _.get(application, "document_verification_appointment", []),
      [(a) => _.get(a, "booked_at")],
      ["desc"],
    ),
    formatDocument,
  ),
  documentVerificationAppointments: formatAppointmentList(
    _.get(application, "document_verification_appointment", []),
  ),
});

// ---------------------------------------------------------------------------
// UpdateDocumentVerificationAPIResponse
// ---------------------------------------------------------------------------
const updateDocumentVerificationAPIResponse = (application) => ({
  id:                _.get(application, "id", ""),
  status:            _.upperCase(_.get(application, "status", "")),
  applicationStatus: _.get(application, "status", ""),
  statusHistory:     formatStatusHistory(_.get(application, "status_history", [])),
  documents:         _.map(
    _.orderBy(
      _.get(application, "verified_documents", []),
      [(d) => _.get(d, "updated_at")],
      ["desc"],
    ),
    formatDocument,
  ),
});

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  formatApplicantUser,
  admissionApplicationsAPIResponse,
  updateDocumentVerificationAPIResponse,
  updatedAdmissionApplicationStatusAPIResponse,
  updateDocumentVerificationAppointmentBookingAPIResponse,
};
