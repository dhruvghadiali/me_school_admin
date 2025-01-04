import { useTranslation } from "react-i18next";
import { Label } from "@MEShadcnComponents/label";
import { CheckCircle2, Circle } from "lucide-react";
import { formateStringWithLodash } from "@MEUtils/utilityFunctions";
import { RadioGroup, RadioGroupItem } from "@MEShadcnComponents/radio-group";

import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";

const AdmissionScreenFormDetailHistoryItem = ({ informationObj, colDefs }) => {
  const { t, i18n } = useTranslation();

  return _.map(colDefs, (column) => {
    return (
      <div className="mb-5">
        {column.type === "string" && (
          <>
            <div>
              <Label className="text-xs">
                {i18n.exists(column.header)
                  ? formateStringWithLodash(t(column.header), _.startCase)
                  : formateStringWithLodash(column.defaultHeader, _.startCase)}
              </Label>
            </div>
            <div>
              <Label className="text-base text-dark">
                {formateStringWithLodash(
                  informationObj[column.key] ? informationObj[column.key] : "-",
                  _.startCase
                )}
              </Label>
            </div>
          </>
        )}

        {column.type === "date" && (
          <>
            <div>
              <Label className="text-xs">
                {i18n.exists(column.header)
                  ? formateStringWithLodash(t(column.header), _.startCase)
                  : formateStringWithLodash(column.defaultHeader, _.startCase)}
              </Label>
            </div>
            <div>
              <Label className="text-base text-dark">
                {formateStringWithLodash(
                  informationObj[column.key]
                    ? moment(informationObj[column.key]).isValid()
                      ? moment(informationObj[column.key]).format("DD-MMM-YYYY")
                      : "-"
                    : "-",
                  _.startCase
                )}
              </Label>
            </div>
          </>
        )}

        {column.type === "boolean" && (
          <>
            <div>
              <Label className="text-xs">
                {i18n.exists(column.header)
                  ? formateStringWithLodash(t(column.header), _.startCase)
                  : formateStringWithLodash(column.defaultHeader, _.startCase)}
              </Label>
            </div>
            <RadioGroup
              defaultValue={informationObj[column.key]}
              className="flex flex-wrap gap-2 "
              disabled
              value={informationObj[column.key]}
            >
              <div className="flex items-center gap-2 text-dark">
                <RadioGroupItem
                  value={true}
                  id="radio-03-r1"
                  className="sr-only after:absolute after:inset-0"
                />
                {informationObj[column.key] ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
                <Label className="text-base text-dark" htmlFor="radio-03-r1">
                  {_.upperFirst("yes")}
                </Label>
              </div>
              <div className="flex items-center gap-2 text-dark">
                <RadioGroupItem
                  value={false}
                  id="radio-03-r2"
                  className="sr-only after:absolute after:inset-0"
                />
                {informationObj[column.key] ? (
                  <Circle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                <Label className="text-base text-dark" htmlFor="radio-03-r2">
                  {_.upperFirst("no")}
                </Label>
              </div>
            </RadioGroup>
          </>
        )}
      </div>
    );
  });
};

AdmissionScreenFormDetailHistoryItem.prototype = {
  informationObj: PropTypes.object,
  colDefs: PropTypes.array,
};

export default AdmissionScreenFormDetailHistoryItem;
