/**
 * Profile Tabs enumeration
 */
const PROFILE_TABS_ID = Object.freeze({
  SCHOOL: "school",
  ORGANIZATION: "organization",
  ADDRESS: "address",
});

/**
 * Form sheet modes enumeration
 */
const PROFILE_FORM_SHEET_MODES = Object.freeze({
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
});

/**
 * organization member position enumeration
 */
const ORGANIZATION_MEMBER_POSITION = Object.freeze({
  PRESIDENT: "president",
  VICE_PRESIDENT: "vice president",
  SECRETARY: "secretary",
  JOINT_SECRETARY: "joint secretary",
  TREASURER: "treasurer",
  MEMBER: "member",
  PRINCIPAL: "principal",
  OTHER: "other",
});

export {
  PROFILE_TABS_ID,
  PROFILE_FORM_SHEET_MODES,
  ORGANIZATION_MEMBER_POSITION,
};
