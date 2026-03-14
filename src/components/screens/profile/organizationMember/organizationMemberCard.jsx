import { useSelector, useDispatch } from "react-redux";
import { Pencil, UsersIcon, Trash2, Plus } from "lucide-react";
import _ from "lodash";

import { variants } from "@MEUtils/enums";
import {} from "@MERedux/profile/profileSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";

import MEButton from "@MECommonComponents/form/button/meButton";

const MEMBER_FIELDS = [
  { label: "Name", key: "name", format: "startCase" },
  { label: "Email", key: "email" },
  { label: "Contact Number", key: "phoneNumber", format: "phone" },
  { label: "Aadhaar Number", key: "aadhaarNumber" },
  { label: "Position", key: "position", format: "startCase" },
  { label: "Address", key: "address" },
  { label: "State", key: "state", format: "startCase" },
  { label: "District", key: "district", format: "startCase" },
  { label: "City", key: "city", format: "startCase" },
  { label: "Area Name", key: "areaName", format: "startCase" },
  { label: "Zipcode", key: "zipcode" },
];

const formatMemberValue = (member, field) => {
  if (field.key === "name") {
    const fullName = _.trim(
      `${_.get(member, "firstName", "")} ${_.get(member, "lastName", "")}`,
    );
    return _.startCase(fullName) || "N/A";
  }

  const value = _.get(member, field.key, "");

  if (_.isEmpty(value)) return "N/A";

  switch (field.format) {
    case "startCase":
      return _.startCase(value);
    case "phone":
      return `+91 ${value}`;
    default:
      return value;
  }
};

const OrganizationMemberCardComponent = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authentication);

  const handleEditClick = () => {};

  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />
          <CardTitle>Organization Members</CardTitle>
        </div>
        <MEButton
          type="button"
          buttonVariant={variants.PRIMARY}
          buttonClassName="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 h-auto"
          disabled={_.get(user, "organization.members", []).length >= 5}
          onClick={handleEditClick}
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Add</span>
          <span className="xs:hidden">Add</span>
        </MEButton>
      </CardHeader>
      <CardContent>
        {_.map(
          _.get(user, "organization.members", []),
          (member, index) => (
            <div
              key={_.get(member, "id", index)}
              className="rounded-md px-5 py-4 mb-2 border border-primary/30"
            >
              <div className="flex items-center justify-between pb-4">
                <p className="text-sm font-medium text-primary">
                  {_.toUpper(`Member ${index + 1}`)}
                </p>
                <div className="flex items-center gap-1">
                  <MEButton
                    type="button"
                    variant="outline"
                    buttonClassName="flex items-center gap-1 text-xs sm:text-sm px-1 py-1 h-auto"
                    onClick={handleEditClick}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </MEButton>

                  <MEButton
                    type="button"
                    variant="outline"
                    buttonClassName="flex items-center gap-1 text-xs sm:text-sm px-1 py-1 h-auto"
                    onClick={handleEditClick}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </MEButton>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {_.map(MEMBER_FIELDS, (field, subIndex) => (
                  <div key={subIndex} className="space-y-1">
                    <p className="text-xs font-medium text-primary/60">
                      {field.label}
                    </p>
                    <p className="text-sm font-semibold text-primary wrap-break-word">
                      {formatMemberValue(member, field)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );
};

export default OrganizationMemberCardComponent;
