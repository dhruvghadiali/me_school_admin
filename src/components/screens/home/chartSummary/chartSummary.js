import HomeScreenChartSummaryCard from "./chartSummaryCard";
import MEBarChart from "../../../common/chart/barChart";
import MELineChart from "../../../common/chart/lineChart";

const HomeScreenChartSummary = () => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 mr-5">
      <HomeScreenChartSummaryCard
        summaryHeader="Summary by Year"
        summarySubtitle="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
        summaryNotes="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click.">
        <MEBarChart />
      </HomeScreenChartSummaryCard>
      <HomeScreenChartSummaryCard
        summaryHeader="Summary by Classes"
        summarySubtitle="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click."
        summaryNotes="Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click.">
        <MELineChart />
      </HomeScreenChartSummaryCard>
    </div>
  );
};

export default HomeScreenChartSummary;
