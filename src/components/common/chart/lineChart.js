import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

const chartData = [
  { month: "January", desktop: 500, mobile: 80, tab: 100, },
  { month: "February", desktop: 305, mobile: 200, tab: 190, },
  { month: "March", desktop: 237, mobile: 120, tab: 80, },
  { month: "April", desktop: 73, mobile: 190, tab: 200, },
  { month: "May", desktop: 209, mobile: 130, tab: 120, },
  { month: "June", desktop: 214, mobile: 140, tab: 305, },
  { month: "January", desktop: 186, mobile: 80, tab: 209, },
  { month: "February", desktop: 305, mobile: 200, tab: 100, },
  { month: "March", desktop: 237, mobile: 120, tab: 186, },
  { month: "April", desktop: 73, mobile: 190, tab: 100, },
  { month: "May", desktop: 209, mobile: 130, tab: 237, },
  { month: "June", desktop: 214, mobile: 140, tab: 100, },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

const MELineChart = ({ buttonVariant, ...props }) => {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false}  strokeWidth={.2} stroke="#000000" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          dataKey="desktop"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        //   tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Line dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        <Line dataKey="tab" fill="var(--color-mobile)" radius={4} />
      </LineChart>
    </ChartContainer>
  );
};

MELineChart.propTypes = {};

export default MELineChart;
