const admissionDocumentAPIResponse = (data) => {
  return {
    label: data && data.admission_document
      ? data.admission_document
      : "",
    value: data && data.id ? data.id : "",
  };
};

export {
admissionDocumentAPIResponse
}