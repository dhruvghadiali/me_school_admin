const academicClassAPIResponse = (academicClass) => {
  return {
    id: academicClass.id || "",
    academicClass: academicClass.academic_class || "",
  };
};

export { academicClassAPIResponse };
