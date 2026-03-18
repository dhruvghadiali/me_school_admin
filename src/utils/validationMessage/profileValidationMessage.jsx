import {
  profileSchoolAboutMaxChar,
  profileSchoolAboutMinChar,
  profileOrganizationMemberEmailMaxChar,
  profileOrganizationMemberEmailMinChar,
  profileOrganizationMemberAddressMaxChar,
  profileOrganizationMemberAddressMinChar,
  profileOrganizationMemberLastNameMaxChar,
  profileOrganizationMemberLastNameMinChar,
  profileOrganizationMemberPhoneNumberChar,
  profileOrganizationMemberPositionMaxChar,
  profileOrganizationMemberPositionMinChar,
  profileOrganizationMemberFirstNameMaxChar,
  profileOrganizationMemberFirstNameMinChar,
  profileOrganizationMemberAadhaarNumberChar,
} from "@MEUtils/validationConst";

const profileSchoolAboutRequired = "About section is required";
const profileSchoolAboutMaxLength = `About section cannot exceed ${profileSchoolAboutMaxChar} characters`;
const profileSchoolAboutMinLength = `About section must be at least ${profileSchoolAboutMinChar} characters`;
const profileOrganizationMemberFirstNameRequired = "First name is required";
const profileOrganizationMemberFirstNameMaxLength = `First name cannot exceed ${profileOrganizationMemberFirstNameMaxChar} characters`;
const profileOrganizationMemberFirstNameMinLength = `First name must be at least ${profileOrganizationMemberFirstNameMinChar} characters`;
const profileOrganizationMemberLastNameRequired = "Last name is required";
const profileOrganizationMemberLastNameMaxLength = `Last name cannot exceed ${profileOrganizationMemberLastNameMaxChar} characters`;
const profileOrganizationMemberLastNameMinLength = `Last name must be at least ${profileOrganizationMemberLastNameMinChar} characters`;
const profileOrganizationMemberEmailRequired = "Email is required";
const profileOrganizationMemberEmailInvalid = `Please enter a valid email address`;
const profileOrganizationMemberEmailMaxLength = `Email cannot exceed ${profileOrganizationMemberEmailMaxChar} characters`;
const profileOrganizationMemberEmailMinLength = `Email must be at least ${profileOrganizationMemberEmailMinChar} characters`;
const profileOrganizationMemberPhoneNumberRequired = `Contact number is required`;
const profileOrganizationMemberPhoneNumberInvalid = `Please enter a valid contact number`;
const profileOrganizationMemberPhoneNumberMinLength = `Contact number must be exactly ${profileOrganizationMemberPhoneNumberChar} digits`;
const profileOrganizationMemberPhoneNumberMaxLength = `Contact number must be exactly ${profileOrganizationMemberPhoneNumberChar} digits`;
const profileOrganizationMemberPositionRequired = "Position is required";
const profileOrganizationMemberPositionMaxLength = `Position cannot exceed ${profileOrganizationMemberPositionMaxChar} characters`;
const profileOrganizationMemberPositionMinLength = `Position must be at least ${profileOrganizationMemberPositionMinChar} characters`;
const profileOrganizationMemberAadhaarNumberRequired = `Aadhaar number is required`;
const profileOrganizationMemberAadhaarNumberMinLength = `Aadhaar number must be exactly ${profileOrganizationMemberAadhaarNumberChar} digits`;
const profileOrganizationMemberAadhaarNumberMaxLength = `Aadhaar number must be exactly ${profileOrganizationMemberAadhaarNumberChar} digits`;
const profileOrganizationMemberAddressRequired = `Address is required`;
const profileOrganizationMemberAddressMaxLength = ` Address cannot exceed ${profileOrganizationMemberAddressMaxChar} characters`;
const profileOrganizationMemberAddressMinLength = ` Address must be at least ${profileOrganizationMemberAddressMinChar} characters`;
const profileOrganizationMemberStateRequired = `State is required`;
const profileOrganizationMemberStateInvalid = `Please select a valid state`;
const profileOrganizationMemberDistrictRequired = `District is required`;
const profileOrganizationMemberDistrictInvalid = `Please select a valid district`;
const profileOrganizationMemberCityRequired = `City is required`;
const profileOrganizationMemberCityInvalid = `Please select a valid city`;
const profileOrganizationMemberAreaNameRequired = `Area name is required`;
const profileOrganizationMemberAreaNameInvalid = `Please select a valid area`;
const profileOrganizationMemberZipcodeRequired = `Zipcode is required`;
const profileOrganizationMemberZipcodeInvalid = `Please select a valid zipcode`;

export {
  profileSchoolAboutRequired,
  profileSchoolAboutMinLength,
  profileSchoolAboutMaxLength,
  profileOrganizationMemberStateRequired,
  profileOrganizationMemberDistrictRequired,
  profileOrganizationMemberCityRequired,
  profileOrganizationMemberAreaNameRequired,
  profileOrganizationMemberZipcodeRequired,
  profileOrganizationMemberStateInvalid,
  profileOrganizationMemberDistrictInvalid,
  profileOrganizationMemberCityInvalid,
  profileOrganizationMemberAreaNameInvalid,
  profileOrganizationMemberZipcodeInvalid,
  profileOrganizationMemberFirstNameRequired,
  profileOrganizationMemberFirstNameMinLength,
  profileOrganizationMemberFirstNameMaxLength,
  profileOrganizationMemberLastNameRequired,
  profileOrganizationMemberLastNameMinLength,
  profileOrganizationMemberLastNameMaxLength,
  profileOrganizationMemberEmailRequired,
  profileOrganizationMemberEmailInvalid,
  profileOrganizationMemberEmailMinLength,
  profileOrganizationMemberEmailMaxLength,
  profileOrganizationMemberPhoneNumberRequired,
  profileOrganizationMemberPhoneNumberInvalid,
  profileOrganizationMemberPhoneNumberMinLength,
  profileOrganizationMemberPhoneNumberMaxLength,
  profileOrganizationMemberPositionRequired,
  profileOrganizationMemberPositionMinLength,
  profileOrganizationMemberPositionMaxLength,
  profileOrganizationMemberAadhaarNumberRequired,
  profileOrganizationMemberAadhaarNumberMinLength,
  profileOrganizationMemberAadhaarNumberMaxLength,
  profileOrganizationMemberAddressRequired,
  profileOrganizationMemberAddressMinLength,
  profileOrganizationMemberAddressMaxLength,
};
