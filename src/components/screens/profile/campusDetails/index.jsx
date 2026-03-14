import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Pencil, School } from "lucide-react";
import _ from "lodash";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@MEShadcnComponents/sheet";

import MEButton from "@MECommonComponents/form/button/meButton";
import MEInput from "@MECommonComponents/form/input/meInput";
import MESelect from "@MECommonComponents/form/select/meSelect";

import { updateSchoolProfile } from "@MERedux/profile/profileAction";
import { variants } from "@MEUtils/enums";

const CAMPUS_TYPE_OPTIONS = [
  { label: "Main Campus", value: "main" },
  { label: "Branch Campus", value: "branch" },
  { label: "Satellite Center", value: "satellite" },
];

const LIBRARY_OPTIONS = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const validationSchema = Yup.object({
  campusName: Yup.string()
    .min(2, "Campus name must be at least 2 characters")
    .required("Campus name is required"),
  campusType: Yup.string().required("Campus type is required"),
  totalArea: Yup.number()
    .positive("Total area must be a positive number")
    .required("Total area is required"),
  totalClassrooms: Yup.number()
    .integer("Must be a whole number")
    .min(1, "Must have at least 1 classroom")
    .required("Total classrooms is required"),
  totalCapacity: Yup.number()
    .integer("Must be a whole number")
    .positive("Capacity must be a positive number")
    .required("Total capacity is required"),
  hasLibrary: Yup.string().required("Please indicate if library is available"),
  labCount: Yup.number()
    .integer("Must be a whole number")
    .min(0, "Cannot be negative"),
  sportsFacilities: Yup.string().max(
    300,
    "Cannot exceed 300 characters"
  ),
});

const CampusDetailsSection = () => {
  const dispatch = useDispatch();
  const [showSheet, setShowSheet] = useState(false);

  const { profile, updateLoader } = useSelector((state) => state.profile);

  const infrastructureList = [
    { label: "Campus Name", value: profile.campusName },
    { label: "Campus Type", value: _.startCase(profile.campusType) },
    {
      label: "Total Area (sq ft)",
      value: profile.totalArea
        ? `${Number(profile.totalArea).toLocaleString()} sq ft`
        : null,
    },
    { label: "Total Classrooms", value: profile.totalClassrooms },
    {
      label: "Student Capacity",
      value: profile.totalCapacity
        ? Number(profile.totalCapacity).toLocaleString()
        : null,
    },
  ];

  const facilitiesList = [
    {
      label: "Library Available",
      value:
        profile.hasLibrary === true || profile.hasLibrary === "true"
          ? "Yes"
          : profile.hasLibrary === false || profile.hasLibrary === "false"
          ? "No"
          : null,
    },
    { label: "Number of Labs", value: profile.labCount },
    { label: "Sports Facilities", value: profile.sportsFacilities },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      campusName: profile.campusName || "",
      campusType: profile.campusType || "",
      totalArea: profile.totalArea || "",
      totalClassrooms: profile.totalClassrooms || "",
      totalCapacity: profile.totalCapacity || "",
      hasLibrary:
        profile.hasLibrary === true || profile.hasLibrary === "true"
          ? "true"
          : profile.hasLibrary === false || profile.hasLibrary === "false"
          ? "false"
          : "",
      labCount: profile.labCount || "",
      sportsFacilities: profile.sportsFacilities || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(updateSchoolProfile(values));
      setShowSheet(false);
    },
  });

  const inputProps = (field) => ({
    id: field,
    name: field,
    value: formik.values[field],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    inputvariant:
      formik.touched[field] && formik.errors[field]
        ? variants.DANGER
        : variants.PRIMARY,
    messagevariant:
      formik.touched[field] && formik.errors[field]
        ? variants.DANGER
        : variants.PRIMARY,
    message:
      formik.touched[field] && formik.errors[field]
        ? formik.errors[field]
        : "",
  });

  return (
    <>
      <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-primary/60" />
            <CardTitle className="text-base sm:text-lg">
              SCHOOL CAMPUS DETAILS
            </CardTitle>
          </div>
          <MEButton
            type="button"
            buttonVariant={variants.PRIMARY}
            buttonClassName="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 h-auto"
            onClick={() => setShowSheet(true)}
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </MEButton>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Infrastructure */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/40 mb-3">
              Infrastructure
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {_.map(infrastructureList, (info, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs font-medium text-primary/60">
                    {info.label}
                  </p>
                  <p className="text-sm font-semibold text-primary wrap-break-word">
                    {info.value || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-primary/10" />

          {/* Facilities */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/40 mb-3">
              Facilities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {_.map(facilitiesList, (info, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs font-medium text-primary/60">
                    {info.label}
                  </p>
                  <p className="text-sm font-semibold text-primary wrap-break-word">
                    {info.value || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Sheet */}
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent
          side="bottom"
          className="h-[90vh] w-full overflow-hidden flex flex-col p-0"
        >
          <div className="border-b border-primary/50 px-4 sm:px-6 md:px-8 shadow-lg shadow-primary/80 shrink-0">
            <SheetHeader className="space-y-1 p-3">
              <SheetTitle className="text-base sm:text-lg md:text-xl font-semibold text-left">
                Edit Campus Details
              </SheetTitle>
              <SheetDescription className="text-xs sm:text-sm text-left">
                Update physical campus and facility information
              </SheetDescription>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
            <form onSubmit={formik.handleSubmit}>
              {/* Infrastructure Section */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/50 mb-4">
                  Infrastructure
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  <MEInput
                    label="Campus Name"
                    required
                    placeholder="Enter campus name"
                    {...inputProps("campusName")}
                  />

                  <MESelect
                    label="Campus Type"
                    required
                    placeholder="Select campus type"
                    items={CAMPUS_TYPE_OPTIONS}
                    selectedValue={formik.values.campusType}
                    onValueChange={(value) =>
                      formik.setFieldValue("campusType", value)
                    }
                    selectVariant={
                      formik.touched.campusType && formik.errors.campusType
                        ? variants.DANGER
                        : variants.PRIMARY
                    }
                    messagevariant={
                      formik.touched.campusType && formik.errors.campusType
                        ? variants.DANGER
                        : variants.PRIMARY
                    }
                    message={
                      formik.touched.campusType && formik.errors.campusType
                        ? formik.errors.campusType
                        : ""
                    }
                    clearable
                  />

                  <MEInput
                    label="Total Area (sq ft)"
                    required
                    type="number"
                    placeholder="e.g. 25000"
                    {...inputProps("totalArea")}
                  />

                  <MEInput
                    label="Total Classrooms"
                    required
                    type="number"
                    placeholder="e.g. 30"
                    {...inputProps("totalClassrooms")}
                  />

                  <MEInput
                    label="Student Capacity"
                    required
                    type="number"
                    placeholder="e.g. 1200"
                    {...inputProps("totalCapacity")}
                  />
                </div>
              </div>

              <div className="border-t border-primary/10 mb-6" />

              {/* Facilities Section */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/50 mb-4">
                  Facilities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  <MESelect
                    label="Library Available"
                    required
                    placeholder="Select option"
                    items={LIBRARY_OPTIONS}
                    selectedValue={formik.values.hasLibrary}
                    onValueChange={(value) =>
                      formik.setFieldValue("hasLibrary", value)
                    }
                    selectVariant={
                      formik.touched.hasLibrary && formik.errors.hasLibrary
                        ? variants.DANGER
                        : variants.PRIMARY
                    }
                    messagevariant={
                      formik.touched.hasLibrary && formik.errors.hasLibrary
                        ? variants.DANGER
                        : variants.PRIMARY
                    }
                    message={
                      formik.touched.hasLibrary && formik.errors.hasLibrary
                        ? formik.errors.hasLibrary
                        : ""
                    }
                    clearable
                  />

                  <MEInput
                    label="Number of Labs"
                    type="number"
                    placeholder="e.g. 5"
                    {...inputProps("labCount")}
                  />

                  <div className="sm:col-span-2 xl:col-span-1 space-y-2">
                    <label className="text-sm font-medium text-primary">
                      Sports Facilities
                    </label>
                    <textarea
                      id="sportsFacilities"
                      name="sportsFacilities"
                      rows={3}
                      placeholder="e.g. Cricket ground, Basketball court, Swimming pool..."
                      value={formik.values.sportsFacilities}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full rounded-md border border-primary/80 bg-transparent px-3 py-2 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                    {formik.touched.sportsFacilities &&
                      formik.errors.sportsFacilities && (
                        <p className="text-xs text-danger">
                          {formik.errors.sportsFacilities}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-4 border-t border-primary/20">
                <MEButton
                  type="button"
                  buttonVariant={variants.SECONDARY}
                  buttonClassName="w-full sm:w-auto"
                  onClick={() => {
                    formik.resetForm();
                    setShowSheet(false);
                  }}
                  disabled={updateLoader}
                >
                  Cancel
                </MEButton>
                <MEButton
                  type="submit"
                  buttonVariant={variants.PRIMARY}
                  buttonClassName="w-full sm:w-auto"
                  disabled={updateLoader || !formik.isValid}
                >
                  {updateLoader ? "Saving..." : "Save Changes"}
                </MEButton>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CampusDetailsSection;
