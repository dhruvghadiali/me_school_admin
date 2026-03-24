import {
    settingPasswordMaxChar,
    settingPasswordMinChar,
    settingUsernameMaxChar,
    settingUsernameMinChar, 
} from "@MEUtils/validationConst";

// Setting - Change Password Validation Messages
const newPasswordRequired = "New password is required";
const confirmPasswordMismatch = "Passwords do not match";
const currentPasswordRequired = "Current password is required";
const confirmPasswordRequired = "Confirm password is required";
const passwordMaxLength = `Maximum ${settingPasswordMaxChar} characters allowed`;
const passwordMinLength = `Minimum ${settingPasswordMinChar} characters required`;

// Setting - Change Username Validation Messages
const newUsernameRequired = "New username is required";
const confirmUsernameMismatch = "Usernames do not match";
const currentUsernameRequired = "Current username is required";
const confirmUsernameRequired = "Confirm username is required";
const usernameMaxLength = `Maximum ${settingUsernameMaxChar} characters allowed`;
const usernameMinLength = `Minimum ${settingUsernameMinChar} characters required`;

export {
  passwordMinLength,
  passwordMaxLength,
  newPasswordRequired,
  currentPasswordRequired,
  confirmPasswordRequired,
  confirmPasswordMismatch,
  usernameMinLength,
  usernameMaxLength,
  newUsernameRequired,
  confirmUsernameRequired,
  confirmUsernameMismatch,
  currentUsernameRequired,
};
