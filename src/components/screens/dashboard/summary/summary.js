import { useSelector } from "react-redux";
import { variants } from "@MEUtils/enums";
import { isUndefinedOrNull, indianNumberFormate } from "@MEUtils/utilityFunctions";

import _ from 'lodash';
import HomeScreenSummaryCard from "@MEScreenComponents/dashboard/summary/summaryCard";

const HomeScreenSummary = () => {
  const { summaryData } = useSelector((state) => state.dashboard);
  const summary = summaryData && summaryData.summary ? summaryData.summary : {};

  return (
    <div className="grid grid-flow-row grid-cols-4 mr-5 gap-4 mt-5 mb-5">
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.admissionForm)
            ? _.toString(indianNumberFormate(summary.admissionForm)) 
            : "-"
        }
        summaryDescription="Admission Form"
        titleVariant={variants.PRIMARY}
      />
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.approvedForm)
            ? _.toString(indianNumberFormate(summary.approvedForm))  
            : "-"
        }
        summaryDescription="Approved Form"
        titleVariant={variants.SUCCESS}
      />
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.rejectedForm)
            ? _.toString(indianNumberFormate(summary.rejectedForm))  
            : "-"
        }
        summaryDescription="Rejected Form"
        titleVariant={variants.DANGER}
      />
      <HomeScreenSummaryCard
        SummaryTitle={
          !isUndefinedOrNull(summary.canceledForm)
            ? _.toString(indianNumberFormate(summary.canceledForm))   
            : "-"
        }
        summaryDescription="Canceled Form"
        titleVariant={variants.WARNING}
      />
    </div>
  );
};

HomeScreenSummary.propTypes = {};

export default HomeScreenSummary;
