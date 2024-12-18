import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import PropTypes from "prop-types";

const MEBarChart = (props) => {
  const { xAxisDataKey, YAxisDataKey, barColor, chartData, chartConfig } = props;
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} strokeWidth={0.2} stroke="#000000" />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          dataKey={YAxisDataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          max={1000}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={YAxisDataKey} fill={barColor} radius={20} barSize={20}  />
      </BarChart>
    </ChartContainer>
  );
};

MEBarChart.propTypes = {
  xAxisDataKey: PropTypes.string,
  YAxisDataKey: PropTypes.string,
  barColor: PropTypes.string,
  chartData: PropTypes.array,
  chartConfig: PropTypes.object,
};

export default MEBarChart;
