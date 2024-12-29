const applicationDetails = {
  student: {
    firstName: "dhruvkumar",
    middleName: "yogeshkumar",
    lastName: "ghadiali",
    gender: "male",
    dob: "1995-04-21",
    residentialAddress: "7-nilkanth villa, hansot raod",
    city: "ankleshware",
    state: "gujarat",
    pincode: "393001",
    aadharNumber: "2341341234512",
    passport: "",
    religion: "hindu",
    cast: "obc",
    nationality: "indian",
    visionProblem: false,
    physicalHealthProblem: false,
    mentalHealthProblem: false,
  },
  documentVerification: [{ documentId: "1", isDocumentValidated: true }],
};

export const mockAdmissionVerificationDocuments = [
  {
    id: "1",
    title: "student aadhar card",
    status: "required",
    rules: [
      { label: "check student name in english and gujarati" },
      { label: "check father name in english and gujarati" },
      { label: "check surname in english and gujarati" },
      { label: "check address in english and gujarati" },
    ],
  },
];

export const mockAdmissionFormData = [
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "moises rhodes",
    grade: "UKG",
    registrationDate: "2024-01-11",
    appointmentDate: "2025-01-21",
    applicationDetails: applicationDetails,
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Lane Drake",
    grade: "11th com",
    registrationDate: "2024-01-11",
    appointmentDate: "",
    applicationDetails: applicationDetails,
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "approved",
    studentName: "Zack Dorsey",
    grade: "11th com",
    registrationDate: "2024-01-11",
    appointmentDate: "2025-01-21",
    applicationDetails: applicationDetails,
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Latasha Barker",
    grade: "UKG",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Jackie Schmidt",
    grade: "2nd",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Mitchell Floyd",
    grade: "5th",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Mervin Kelly",
    grade: "11th com",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Tamara Dennis",
    grade: "11th com",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Colby Rowland",
    grade: "11th com",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Katy Russo",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Ada Mcdonald",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Hollie Moses",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Todd Hanson",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Juliana Roth",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Johnny Gomez",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Georgia Castillo",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Gerardo Reese",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Nick Watkins",
    grade: "4th",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Jasper Bush",
    grade: "4th",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Luciano Cummings",
    grade: "4th",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Alana Schaefer",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Max Andrews",
    grade: "11th sci",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Shon Todd",
    grade: "UKG",
    registrationDate: "2024-01-11",
  },
  {
    applicationNumber: "AP-1234-ANK-123-10-12-2024",
    applicationStatus: "pending",
    studentName: "Chandra Brewer",
    grade: "UKG",
    registrationDate: "2024-01-11",
  },
];
