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

import AdmissionBasicDetails from "./basicDetails";
import ProfileTab from "./profileTab";
import StatusHistoryTab from "./statusHistoryTab";
import DocumentsTab from "./documentsTab";
import AppointmentsTab from "./appointmentsTab";
import FeePaymentsTab from "./feePaymentsTab";

const AdmissionScreenAdmissionFormSheet = (props) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");

  const { showAdmissionApplicationSheet, selectedAdmissionApplication } =
    useSelector((state) => state.admissionApplication);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "status-history", label: "Status History" },
    { id: "documents", label: "Documents" },
    { id: "appointments", label: "Appointments" },
    { id: "fee-payments", label: "Fee Payments" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "status-history":
        return <StatusHistoryTab application={selectedAdmissionApplication} />;
      case "documents":
        return <DocumentsTab application={selectedAdmissionApplication} />;
      case "appointments":
        return <AppointmentsTab application={selectedAdmissionApplication} />;
      case "fee-payments":
        return <FeePaymentsTab application={selectedAdmissionApplication} />;
      default:
        return <ProfileTab application={selectedAdmissionApplication} />;
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
        className="h-screen w-full overflow-hidden flex flex-col p-0"
      >
        <div className="border-b border-primary/50 px-8 shadow-sm shadow-primary/10">
          <SheetHeader>
            <SheetTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
              Application Details
            </SheetTitle>
            <SheetDescription className="text-xs sm:text-sm mt-1">
              View detailed information about the admission application
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Basic Details */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-6">
            <AdmissionBasicDetails />
          </div>

          {/* Sticky Tabs Navigation */}
          <div className="sticky top-0 z-10 bg-primary/90 shadow-lg shadow-primary/50 mt-4 sm:mt-6 mx-5 rounded">
            <div className="overflow-x-auto px-4 sm:px-6">
              <nav className="flex min-w-max sm:min-w-0" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 sm:flex-none whitespace-nowrap px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
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
          <div className="px-4 sm:px-6 py-4 sm:py-6">{renderTabContent()}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdmissionScreenAdmissionFormSheet;
