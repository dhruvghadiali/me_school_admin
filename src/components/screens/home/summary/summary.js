import { useSelector } from "react-redux";
import HomeScreenSummaryCard from "./summaryCard";
import { variants } from "../../../../utils/enums";
import { indianNumberFormate } from "../../../../utils/utilityFunctions";

const defaultValues = {
  admissionForm: 0,
  approvedForm: 0,
  rejectedForm: 0,
  canceledForm: 0,
};

const HomeScreenSummary = () => {
  const { summaryData } = useSelector((state) => state.dashboard);
  const summary =
    summaryData && summaryData.summary ? summaryData.summary : defaultValues;

  return (
    <div className="grid grid-flow-row grid-cols-4 mr-5 gap-4 mt-5 mb-5">
      <HomeScreenSummaryCard
        SummaryTitle={indianNumberFormate(summary.admissionForm)}
        summaryDescription="Admission Form"
        titleVariant={variants.DARK}
      />
      <HomeScreenSummaryCard
        SummaryTitle={indianNumberFormate(summary.approvedForm)}
        summaryDescription="Approved Form"
        titleVariant={variants.SUCCESS}
      />
      <HomeScreenSummaryCard
        SummaryTitle={indianNumberFormate(summary.rejectedForm)}
        summaryDescription="Rejected Form"
        titleVariant={variants.DANGER}
      />
      <HomeScreenSummaryCard
        SummaryTitle={indianNumberFormate(summary.canceledForm)}
        summaryDescription="Canceled Form"
        titleVariant={variants.WARNING}
      />
    </div>
  );
};

export default HomeScreenSummary;
