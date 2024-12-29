import { variants } from "@MEUtils/enums";
import { Label } from "@MEShadcnComponents/label";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle2Icon, FileWarningIcon, CircleX } from "lucide-react";
import { setDocumentVerificationStatus } from "@MERedux/admission/admissionSlice";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@MEShadcnComponents/sheet";

import _ from "lodash";
import PropTypes from "prop-types";
import MESelect from "@MECommonComponents/select/meSelect";
import MEButton from "@MECommonComponents/button/meButton";
import MELoaderIcon from "@MECommonComponents/loader/meLoaderIcon";

const AdmissionScreenFormDetailDocumentVerification = ({ status }) => {
  const dispatch = useDispatch();
  const { documentVerificationList, applicationFormDetail } = useSelector(
    (state) => state.admission
  );

  const setDocumentVerificationDetail = (docId) => {
    if (
      applicationFormDetail &&
      applicationFormDetail.applicationDetails &&
      applicationFormDetail.applicationDetails.documentVerification
    ) {
      let documentVerificationDetail = _.find(
        applicationFormDetail.applicationDetails.documentVerification,
        (document) => document.documentId == docId
      );

      if (documentVerificationDetail) {
        if (documentVerificationDetail.isDocumentValidated) {
          return {
            value: "yes",
            icon: <CheckCircle2Icon className="text-success" />,
          };
        } else {
          return {
            value: "no",
            icon: <CircleX className="text-danger" />,
          };
        }
      } else {
        return {
          value: "",
          icon: <FileWarningIcon className="text-warning" />,
        };
      }
    } else {
      return {
        value: "",
        icon: <FileWarningIcon className="text-warning" />,
      };
    }
  };

  const onValueChange = (value, docId) => {
    if (_.toLower(value) == "yes") {
      dispatch(setDocumentVerificationStatus({ status: true, docId: docId }));
    } else {
      dispatch(setDocumentVerificationStatus({ status: false, docId: docId }));
    }
  };

  return (
    <>
      {_.map(
        _.filter(documentVerificationList, { status: status }),
        (document) => (
          <div>
            <Sheet>
              <SheetTrigger>
                <div className="inline-flex  justify-center items-center">
                  {setDocumentVerificationDetail(document.id).icon}
                  <MEButton variant="link">
                    {_.startCase(document.title)}
                  </MEButton>
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <MESelect
                      required={true}
                      label={`Is ${document.title} validated?`}
                      placeholder={"select option (Yes/No)"}
                      items={[
                        { value: _.toLower("yes"), label: _.toUpper("yes") },
                        { value: _.toLower("no"), label: _.toUpper("no") },
                      ]}
                      selectedValue={_.toLower(
                        setDocumentVerificationDetail(document.id).value
                      )}
                      selectVariant={variants.DARK}
                      selectedVariant={variants.PRIMARY}
                      labelVariant={variants.DARK}
                      messageVariant={variants.WARNING}
                      onValueChange={(value) =>
                        onValueChange(value, document.id)
                      }
                    />
                  </SheetTitle>
                  <SheetDescription>
                    <Label className="text-dark font-bold"> Rules: </Label>
                    {_.map(document.rules, (rule, index) => (
                      <div>
                        <Label className=" text-xs">
                          {`${index + 1}. ${_.upperFirst(rule.label)}`}
                        </Label>
                      </div>
                    ))}
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        )
      )}

      {_.filter(documentVerificationList, { status: status }).length > 0 && (
        <div className="py-5">
          <MEButton type="submit" buttonVariant={variants.SUCCESS}>
            Submit
            <MELoaderIcon />
          </MEButton>
        </div>
      )}
    </>
  );
};

AdmissionScreenFormDetailDocumentVerification.prototype = {
  status: PropTypes.string,
};

export default AdmissionScreenFormDetailDocumentVerification;
