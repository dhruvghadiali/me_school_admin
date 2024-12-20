import PropTypes from "prop-types";
import _ from "lodash";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

const MELineChart = (props) => {
  const { xAxisDataKey, YAxisDataKey, chartData, chartConfig, lineConfig } =
    props;
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <LineChart accessibilityLayer data={chartData}>
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
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {_.map(lineConfig, (config) => {
          return (
            <Line
              dataKey={config.dataKey}
              fill={config.fill}
              stroke={config.stroke}
              name={config.name}
              radius={4}
            />
          );
        })}
      </LineChart>
    </ChartContainer>
  );
};

MELineChart.propTypes = {
  xAxisDataKey: PropTypes.string,
  YAxisDataKey: PropTypes.string,
  chartData: PropTypes.array,
  lineConfig: PropTypes.array,
  chartConfig: PropTypes.object,
};

export default MELineChart;
