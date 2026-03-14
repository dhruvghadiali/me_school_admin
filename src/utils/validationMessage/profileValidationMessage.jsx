import {
  profileSchoolAboutMaxChar,
  profileSchoolAboutMinChar,
} from "@MEUtils/validationConst";

const profileSchoolAboutRequired = "About section is required";
const profileSchoolAboutMaxLength = `About section cannot exceed ${profileSchoolAboutMaxChar} characters`;
const profileSchoolAboutMinLength = `About section must be at least ${profileSchoolAboutMinChar} characters`;

export {
  profileSchoolAboutRequired,
  profileSchoolAboutMinLength,
  profileSchoolAboutMaxLength,
};
