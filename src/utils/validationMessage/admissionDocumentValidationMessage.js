const admissionDocumentSelectionRequired = "admission document selection is required";
const admissionDocumentVerificationStatusRequired= `The document verification status is required and must be one of the following: 'required' or 'optional'`;
const admissionDocumentNotesMaxLength = `Notes must be less then 500 characters`;
const admissionDocumentNotesMinLength= `Notes must be greater then 10 characters`;

export {
  admissionDocumentNotesMinLength,
  admissionDocumentNotesMaxLength,
  admissionDocumentSelectionRequired,
  admissionDocumentVerificationStatusRequired
};