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
  profileAddressFormAddressMinChar,
  profileAddressFormAddressMaxChar,
  profileAddressFormLatitudeMinChar,
  profileAddressFormLatitudeMaxChar,
  profileAddressFormLongitudeMinChar,
  profileAddressFormLongitudeMaxChar,
  profileAddressFormCampusAreaMinChar,
  profileAddressFormCampusAreaMaxChar,
  profileAddressFormBuildingAreaMinChar,
  profileAddressFormBuildingAreaMaxChar,
  profileAddressFormOutdoorAreaMinChar,
  profileAddressFormOutdoorAreaMaxChar,
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
const profileAddressFormAddressRequired = `Address is required`;
const profileAddressFormAddressMinLength = `Address must be at least ${profileAddressFormAddressMinChar} characters`;
const profileAddressFormAddressMaxLength = `Address cannot exceed ${profileAddressFormAddressMaxChar} characters`;
const profileAddressFormStateRequired = `State is required`;
const profileAddressFormStateInvalid = `Please select a valid state`;
const profileAddressFormDistrictRequired = `District is required`;
const profileAddressFormDistrictInvalid = `Please select a valid district`;
const profileAddressFormCityRequired = `City is required`;
const profileAddressFormCityInvalid = `Please select a valid city`;
const profileAddressFormAreaNameRequired = `Area name is required`;
const profileAddressFormAreaNameInvalid = `Please select a valid area`;
const profileAddressFormZipcodeRequired = `Zipcode is required`;
const profileAddressFormZipcodeInvalid = `Please select a valid zipcode`;
const profileAddressFormLatitudeMinLength = `Latitude must be at least ${profileAddressFormLatitudeMinChar}`;
const profileAddressFormLatitudeMaxLength = `Latitude cannot exceed ${profileAddressFormLatitudeMaxChar}`;
const profileAddressFormLatitudeInvalid = `Please enter a valid number for latitude`;
const profileAddressFormLongitudeMinLength = `Longitude must be at least ${profileAddressFormLongitudeMinChar}`;
const profileAddressFormLongitudeMaxLength = `Longitude cannot exceed ${profileAddressFormLongitudeMaxChar}`;
const profileAddressFormLongitudeInvalid = `Please enter a valid number for longitude`;
const profileAddressFormCampusAreaMinLength = `Campus area must be at least ${profileAddressFormCampusAreaMinChar}`;
const profileAddressFormCampusAreaMaxLength = `Campus area cannot exceed ${profileAddressFormCampusAreaMaxChar}`;
const profileAddressFormCampusAreaInvalid = `Please enter a valid number for campus area`;
const profileAddressFormBuildingAreaMinLength = `Building area must be at least ${profileAddressFormBuildingAreaMinChar}`;
const profileAddressFormBuildingAreaMaxLength = `Building area cannot exceed ${profileAddressFormBuildingAreaMaxChar}`;
const profileAddressFormBuildingAreaInvalid = `Please enter a valid number for building area`;
const profileAddressFormOutdoorAreaMinLength = `Outdoor area must be at least ${profileAddressFormOutdoorAreaMinChar}`;
const profileAddressFormOutdoorAreaMaxLength = `Outdoor area cannot exceed ${profileAddressFormOutdoorAreaMaxChar}`;
const profileAddressFormOutdoorAreaInvalid = `Please enter a valid number for outdoor area`;
const profileAddressFormTimeInvalid = `Please enter a valid time (e.g. 08:00)`;

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
  profileAddressFormAddressRequired,
  profileAddressFormAddressMinLength,
  profileAddressFormAddressMaxLength,
  profileAddressFormStateRequired,
  profileAddressFormStateInvalid,
  profileAddressFormDistrictRequired,
  profileAddressFormDistrictInvalid,
  profileAddressFormCityRequired,
  profileAddressFormCityInvalid,
  profileAddressFormAreaNameRequired,
  profileAddressFormAreaNameInvalid,
  profileAddressFormZipcodeRequired,
  profileAddressFormZipcodeInvalid,
  profileAddressFormLatitudeMinLength,
  profileAddressFormLatitudeMaxLength,
  profileAddressFormLongitudeMinLength,
  profileAddressFormLongitudeMaxLength,
  profileAddressFormCampusAreaMinLength,
  profileAddressFormCampusAreaMaxLength,
  profileAddressFormBuildingAreaMinLength,
  profileAddressFormBuildingAreaMaxLength,
  profileAddressFormOutdoorAreaMinLength,
  profileAddressFormOutdoorAreaMaxLength,
  profileAddressFormLatitudeInvalid,
  profileAddressFormLongitudeInvalid,
  profileAddressFormCampusAreaInvalid,
  profileAddressFormBuildingAreaInvalid,
  profileAddressFormOutdoorAreaInvalid,
  profileAddressFormTimeInvalid,
};
