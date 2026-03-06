import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@MEShadcnComponents/sheet";
import {
  setSelectedAdmissionApplication,
  toggleAdmissionApplicationSheet,
} from "@MERedux/admission/admissionSlice";

import ProfileTab from "@MEScreenComponents/admission/admissionFormSheet/profileTab";
import DocumentsTab from "@MEScreenComponents/admission/admissionFormSheet/documentsTab";
import FeePaymentsTab from "@MEScreenComponents/admission/admissionFormSheet/feePaymentsTab";
import AppointmentsTab from "@MEScreenComponents/admission/admissionFormSheet/appointmentTab";
import StatusHistoryTab from "@MEScreenComponents/admission/admissionFormSheet/statusHistoryTab";
import AdmissionBasicDetails from "@MEScreenComponents/admission/admissionFormSheet/basicDetails";
import AdmissionScreenAdmissionForm from "@MEScreenComponents/admission/admissionFormSheet/admissionForm";

const AdmissionScreenAdmissionFormSheet = (props) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("basic");

  const { showAdmissionApplicationSheet, selectedAdmissionApplication } =
    useSelector((state) => state.admissionApplication);

  const tabs = [
    { id: "basic", label: "Form Details" },
    { id: "profile", label: "Profile" },
    { id: "status-history", label: "Status History" },
    { id: "documents", label: "Documents" },
    { id: "appointments", label: "Appointments" },
    { id: "fee-payments", label: "Fee Payments" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return <AdmissionBasicDetails />;
      case "profile":
        return <ProfileTab />;
      case "status-history":
        return <StatusHistoryTab />;
      case "documents":
        return <DocumentsTab />;
      case "appointments":
        return <AppointmentsTab />;
      case "fee-payments":
        return <FeePaymentsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <Sheet
      open={showAdmissionApplicationSheet}
      onOpenChange={() => {
        dispatch(toggleAdmissionApplicationSheet());
        dispatch(setSelectedAdmissionApplication({}));
      }}
    >
      <SheetContent
        side="bottom"
        className="h-full w-full overflow-hidden flex flex-col p-0"
      >
        <div className="border-b border-primary/50 px-4 sm:px-6 md:px-8 shadow-lg shadow-primary/80">
          <SheetHeader className="space-y-1 sm:space-y-1.5 p-1 m-2">
            <SheetTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-left m-0 p-0">
              Application Details
            </SheetTitle>
            <SheetDescription className="text-xs sm:text-sm text-left">
              View detailed information about the admission application
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-2">
            <AdmissionScreenAdmissionForm />
          </div>

          {/* Sticky Tabs Navigation */}
          <div className="sticky top-0 z-10 bg-primary shadow-lg shadow-primary/50 mt-2 mx-5 rounded">
            <div className="overflow-x-auto px-2 sm:px-4 md:px-6">
              <nav className="flex min-w-max sm:min-w-0" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none whitespace-nowrap px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-white text-white bg-white/10"
                        : "border-transparent text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
            {renderTabContent()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdmissionScreenAdmissionFormSheet;
