const addNewAcademicClassAPIPayload = ({academicClass, school, eductionBoard}) => {
    return{
        school: school,
        education_board: eductionBoard,
        academic_class: academicClass,
    }
}

export {
    addNewAcademicClassAPIPayload,
}