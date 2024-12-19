import { useSelector } from "react-redux";
import HomeScreenSummaryCard from "./summaryCard";
import { variants } from "../../../../utils/enums";
import { isUndefinedOrNull } from "../../../../utils/utilityFunctions";
import { indianNumberFormate } from "../../../../utils/utilityFunctions";

const HomeScreenSummary = () => {
  const { summaryData } = useSelector((state) => state.dashboard);
  const summary = summaryData && summaryData.summary ? summaryData.summary : {};

  return (
    <div className="grid grid-flow-row grid-cols-4 mr-5 gap-4 mt-5 mb-5">
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.admissionForm)
            ? indianNumberFormate(summary.admissionForm)
            : "-"
        }
        summaryDescription="Admission Form"
        titleVariant={variants.PRIMARY}
      />
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.approvedForm)
            ? indianNumberFormate(summary.approvedForm)
            : "-"
        }
        summaryDescription="Approved Form"
        titleVariant={variants.SUCCESS}
      />
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.rejectedForm)
            ? indianNumberFormate(summary.rejectedForm)
            : "-"
        }
        summaryDescription="Rejected Form"
        titleVariant={variants.DANGER}
      />
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.canceledForm)
            ? indianNumberFormate(summary.canceledForm)
            : "-"
        }
        summaryDescription="Canceled Form"
        titleVariant={variants.WARNING}
      />
    </div>
  );
};

export default HomeScreenSummary;
