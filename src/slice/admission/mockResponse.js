const applicationDetails = {
  student: {
    firstName: "dhruvkumar",
    middleName: "yogeshkumar",
    lastName: "ghadiali",
    gender: "male",
    dob: "1995-04-21",
    residentialAddress: "7-nilkanth villa, hansot raod, need madhav socity",
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
  father: {
    firstName: "yogeshkumar",
    middleName: "natvarlal",
    lastName: "ghadiali",
    gender: "male",
    dob: "1970-08-18",
    residentialAddress: "7-nilkanth villa, hansot raod, need madhav socity",
    city: "ankleshware",
    state: "gujarat",
    pincode: "393001",
    aadharNumber: "2341341234512",
    passport: "",
    pancard: "BPJPG8253E",
    religion: "hindu",
    cast: "obc",
    nationality: "indian",
    maritalStatus: "married",
    ParentsStillMarried: true,
    qualification: "Enginerring",
    incomeSource: "salary",
    employmentStatus: "Employed", // Employed, Self-employed, Unemployed
    employerName: "TCS",
    annualIncome: "1000000",
    visionProblem: false,
    physicalHealthProblem: false,
    mentalHealthProblem: false,
  },
  mother: {
    firstName: "sunitaben",
    middleName: "yogeshkumar",
    lastName: "ghadiali",
    gender: "female",
    dob: "1978-05-02",
    residentialAddress: "7-nilkanth villa, hansot raod, need madhav socity",
    city: "ankleshware",
    state: "gujarat",
    pincode: "393001",
    aadharNumber: "2341341234512",
    pancard: "BPJPG8253E",
    passport: "",
    religion: "hindu",
    cast: "obc",
    nationality: "indian",
    maritalStatus: "married",
    ParentsStillMarried: true,
    qualification: "5th",
    incomeSource: "",
    employmentStatus: "", // Employed, Self-employed, Unemployed
    employerName: "",
    annualIncome: "",
    visionProblem: false,
    physicalHealthProblem: false,
    mentalHealthProblem: false,
  },
  emergencyContact: [
    {
      name: "chitrang modi",
      relationShip: "friend",
      contactNumber: "+919033264696",
    },
    {
      name: "abhi gandhi",
      relationShip: "friend",
      contactNumber: "+918578952474",
    },
  ],
  previousSchool:{
    schoolName: "s.v.e.m (g.m) school",
    address: "44-b block-d sector224, diva road",
    city: "ankleshwar",
    state: "gujarat",
    pincode: "393001",
    grade: "5",
    result: "78%",
  },
  admissionDetail:{
    grade: "6",
  },
  remarks:[
    {
      remark: "application submitted from student at 01 December 2024",
      createdAt: "2024-12-01",
    },
    {
      remark: "appointment scheduled on 10 December 2024",
      createdAt: "2024-12-05",
    },
    {
      remark: "required document verified",
      createdAt: "2024-12-10",
    },
    {
      remark: "parents aadhar card and student aadhar card is invalid",
      createdAt: "2024-12-10",
    },
    {
      remark: "appointment scheduled on 15 December 2024",
      createdAt: "2024-12-10",
    },
    {
      remark: "students previous school proof not provided by parents",
      createdAt: "2024-12-15",
    },
  ],
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
  {
    id: "2",
    title: "student aadhar card",
    status: "required",
    rules: [
      { label: "check student name in english and gujarati" },
      { label: "check father name in english and gujarati" },
      { label: "check surname in english and gujarati" },
      { label: "check address in english and gujarati" },
    ],
  },
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
    registrationDate: "2024-12-01",
    appointmentDate: "2024-12-10",
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
    applicationStatus: "canceled",
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
