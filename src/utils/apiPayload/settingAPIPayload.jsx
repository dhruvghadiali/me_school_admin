const updateUsernameAPIPayload = (formPayload) => {
  return {
    new_username: formPayload.newUsername,
    password: formPayload.password,
  };
};

const updatePasswordAPIPayload = (formPayload) => {
  return {
    new_password: formPayload.newPassword,
    existing_password: formPayload.currentPassword,
  };
};

export {
    updateUsernameAPIPayload,
    updatePasswordAPIPayload,
};