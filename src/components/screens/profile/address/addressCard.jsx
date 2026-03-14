import { useSelector, useDispatch } from "react-redux";
import { Pencil, Trash2, Plus, MapPinnedIcon } from "lucide-react";
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

const AddressCardComponent = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);

  const handleEditClick = () => {};

  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <MapPinnedIcon className="w-5 h-5" />
          <CardTitle>Address</CardTitle>
        </div>
        <MEButton
          type="button"
          buttonVariant={variants.PRIMARY}
          buttonClassName="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 h-auto"
          onClick={handleEditClick}
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Add</span>
          <span className="xs:hidden">Add</span>
        </MEButton>
      </CardHeader>
      <CardContent>
        {_.map(
          [
            {
              title: "location",
              nestedInformationList: [
                {
                  label: "Admin Name",
                  value: "John Doe (232ddsfsd)",
                },
                {
                  label: "Address",
                  value: "  123 Main St, City, Country",
                },
                {
                  label: "Latitude",
                  value: "12.9716° N",
                },
                {
                  label: "Longitude",
                  value: "77.5946° E",
                },
                {
                  label: "Email",
                  value: "info@greenwoodhigh.com",
                },
                {
                  label: "Phone number",
                  value: "+91 9876543210",
                },
                {
                  label: "Campus Area",
                  value: "5000 sq ft",
                },
                {
                  label: "Building Area",
                  value: "3000 sq ft",
                },
                {
                  label: "Outdoor Area",
                  value: "2000 sq ft",
                },
              ],
            },
          ],
          (information, index) => (
            <div className="rounded-md px-5 py-4 mb-2 border border-primary/30">
              <div
                key={index}
                className="flex items-center justify-between pb-4"
              >
                <p className="text-sm font-medium text-primary">
                  {_.toUpper(`${information.title} ${index + 1}`)}
                </p>
                <div className="flex items-center gap-1">
                  <MEButton
                    type="button"
                    variant="outline"
                    // buttonVariant={variants.PRIMARY}
                    buttonClassName="flex items-center gap-1 text-xs sm:text-sm px-1 py-1 h-auto"
                    onClick={handleEditClick}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </MEButton>

                  <MEButton
                    type="button"
                    variant="outline"
                    // buttonVariant={variants.PRIMARY}
                    buttonClassName="flex items-center gap-1 text-xs sm:text-sm px-1 py-1 h-auto"
                    onClick={handleEditClick}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </MEButton>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {_.map(information.nestedInformationList, (info, subIndex) => (
                  <div key={subIndex} className="space-y-1">
                    <p className="text-xs font-medium text-primary/60">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold text-primary wrap-break-word">
                      {info.value || "N/A"}
                    </p>
                  </div>
                ))}
              </div>

              {/* School Hours */}
              <div className="mt-5 pt-4 border-t border-primary/15">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/50 mb-3">
                  School Hours
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2">
                  {_.map(
                    [
                      { label: "Monday", value: "7:30 AM – 3:00 PM" },
                      { label: "Tuesday", value: "7:30 AM – 3:00 PM" },
                      { label: "Wednesday", value: "7:30 AM – 3:00 PM" },
                      { label: "Thursday", value: "7:30 AM – 3:00 PM" },
                      { label: "Friday", value: "7:30 AM – 3:00 PM" },
                      { label: "Saturday", value: "7:30 AM – 12:00 PM" },
                      { label: "Sunday", value: "Closed" },
                    ],
                    (hour, i) => (
                      <div
                        key={i}
                        className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 rounded-md border border-primary/15 px-3 py-2.5"
                      >
                        <p className="text-xs font-semibold text-primary/60 shrink-0">
                          {hour.label}
                        </p>
                        <p
                          className={`text-xs font-semibold ${
                            hour.value === "Closed"
                              ? "text-danger"
                              : "text-primary"
                          }`}
                        >
                          {hour.value}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Administrative Hours */}
              <div className="mt-5 pt-4 border-t border-primary/15">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/50 mb-3">
                  Administrative Hours
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2">
                  {_.map(
                    [
                      { label: "Monday", value: "8:00 AM – 4:30 PM" },
                      { label: "Tuesday", value: "8:00 AM – 4:30 PM" },
                      { label: "Wednesday", value: "8:00 AM – 4:30 PM" },
                      { label: "Thursday", value: "8:00 AM – 4:30 PM" },
                      { label: "Friday", value: "8:00 AM – 4:30 PM" },
                      { label: "Saturday", value: "9:00 AM – 1:00 PM" },
                      { label: "Sunday", value: "Closed" },
                    ],
                    (hour, i) => (
                      <div
                        key={i}
                        className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1 rounded-md border border-primary/15 px-3 py-2.5"
                      >
                        <p className="text-xs font-semibold text-primary/60 shrink-0">
                          {hour.label}
                        </p>
                        <p
                          className={`text-xs font-semibold ${
                            hour.value === "Closed"
                              ? "text-danger"
                              : "text-primary"
                          }`}
                        >
                          {hour.value}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          ),
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCardComponent;
