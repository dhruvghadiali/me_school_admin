import { CheckCircle2, Circle } from "lucide-react";
import { Label } from "@MEShadcnComponents/label";
import { RadioGroup, RadioGroupItem } from "@MEShadcnComponents/radio-group";

import _ from "lodash";

const ParentDetails = () => {
  const colDefs = [
    { key: "FirstName", header: "first name", type: "string" },
    { key: "middleName", header: "middle name", type: "string" },
    { key: "lastName", header: "last name", type: "string" },
    { key: "dob", header: "date of birth", type: "string" },
    { key: "gender", header: "gender", type: "string" },
    {
      key: "residentialAddress",
      header: "residential address",
      type: "string",
    },
    { key: "city", header: "city", type: "string" },
    { key: "state", header: "state", type: "string" },
    { key: "pincode", header: "pincode", type: "string" },
    { key: "aadharNumber", header: "aadhar number", type: "string" },
    { key: "passportNumber", header: "passport number", type: "string" },
    { key: "panNumber", header: "pan number", type: "string" },
    { key: "visionProblem", header: "vision problem", type: "boolean" },
    { key: "physicalProblem", header: "physical problem", type: "boolean" },
    {
      key: "mentalHealthProblem",
      header: "mental health problem",
      type: "boolean",
    },
  ];

  return (
    <>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-2 mt-5">
        {_.map(colDefs, (column) => {
          return (
            <div className="mb-5">
              {column.type === "string" && (
                <>
                  <div>
                    <Label className="text-xs">
                      {_.startCase(column.header)}
                    </Label>
                  </div>
                  <div>
                    <Label className="text-lg text-dark">
                      {_.startCase(column.header)}
                    </Label>
                  </div>
                </>
              )}

              {column.type === "boolean" && (
                <>
                  <div>
                    <Label className="text-xs">
                      {_.startCase(column.header)}
                    </Label>
                  </div>
                  <RadioGroup
                    defaultValue="r1"
                    className="flex flex-wrap gap-2 "
                    disabled
                    value="r2"
                  >
                    <div className="flex items-center gap-2 text-dark">
                      <RadioGroupItem
                        value="r1"
                        id="radio-03-r1"
                        className="sr-only after:absolute after:inset-0"
                      />
                      <Circle className="h-4 w-4" />
                      <Label
                        className="text-lg text-dark"
                        htmlFor="radio-03-r1"
                      >
                        {_.upperFirst("yes")}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 text-dark">
                      <RadioGroupItem
                        value="r2"
                        id="radio-03-r2"
                        className="sr-only after:absolute after:inset-0"
                      />
                      <CheckCircle2 className="h-4 w-4" />
                      <Label
                        className="text-lg text-dark"
                        htmlFor="radio-03-r2"
                      >
                        {_.upperFirst("no")}
                      </Label>
                    </div>
                  </RadioGroup>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

ParentDetails.prototype = {};

export default ParentDetails;
