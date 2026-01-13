import DashboardScreenHeader from "@MEScreenComponents/dashboard/header";
import DashboardScreenStatsData from "@MEScreenComponents/dashboard/statsData";
import DashboardScreenAdmissionSummaryByMonth from "@MEScreenComponents/dashboard/admissionSummaryByMonth";
import DashboardScreenAdmissionSummaryByAcademicClass from "@MEScreenComponents/dashboard/admissionSummaryByAcademicClass";
import DashboardScreenAdmissionSummaryByAcademicYear from "@MEScreenComponents/dashboard/admissionSummaryByAcademicYear";

const DashboardPage = () => {
  return (
    <>
      <DashboardScreenHeader />
      <DashboardScreenStatsData />

      {/* Charts Grid */}
      <div className="mt-8 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <DashboardScreenAdmissionSummaryByAcademicClass />
        <DashboardScreenAdmissionSummaryByMonth />
      </div>
      
      {/* Academic Year Summary */}
      <DashboardScreenAdmissionSummaryByAcademicYear />
    </>
  );
};

export default DashboardPage;
