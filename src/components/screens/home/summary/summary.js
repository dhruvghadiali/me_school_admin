import HomeScreenSummaryCard from "./summaryCard";
import {variants} from '../../../../utils/enums';


const HomeScreenSummary = () => {
  return (
    <div className="grid grid-flow-row grid-cols-4 mr-5 gap-4 mt-5 mb-5">
      <HomeScreenSummaryCard
        SummaryTitle="781K"
        summaryDescription="Admission Form"
        titleVariant={variants.DARK}
      />
      <HomeScreenSummaryCard
        SummaryTitle="58K"
        summaryDescription="Approved Form"
        titleVariant={variants.SUCCESS}
      />
      <HomeScreenSummaryCard
        SummaryTitle="2200"
        summaryDescription="Rejected Form"
        titleVariant={variants.DANGER}
      />
      <HomeScreenSummaryCard
        SummaryTitle="92"
        summaryDescription="Canceled Form"
        titleVariant={variants.WARNING}
      />
    </div>
  );
};

export default HomeScreenSummary;
