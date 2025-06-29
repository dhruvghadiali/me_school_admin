const admissionDocumentSelectionRequired = "admission document selection is required";
const admissionDocumentVerificationStatusRequired= `The document verification status is required and must be one of the following: 'required' or 'optional'`;
const admissionDocumentNotesMinLength = `Notes must be less then 10 characters`;
const admissionDocumentNotesMaxLength= `Notes must be greater then 500 characters`;

export {
  admissionDocumentNotesMinLength,
  admissionDocumentNotesMaxLength,
  admissionDocumentSelectionRequired,
  admissionDocumentVerificationStatusRequired
};