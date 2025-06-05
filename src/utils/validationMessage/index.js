import { academicClassValidationMessage } from "@MEUtils/validationMessage/academicClassValidationMessage";
import { signInvalidationMessage } from "@MEUtils/validationMessage/signInvalidationMessage";

export const validationMessage = {
  ...academicClassValidationMessage,
  ...signInvalidationMessage,
};
