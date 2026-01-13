import { TrendingUp, Users, BookOpen, Layers } from "lucide-react";
import { CartesianGrid, XAxis, Line, LineChart, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@MEShadcnComponents/chart";

const DashboardScreenAdmissionSummaryByMonth = () => {
  const lineChartData = [
    { month: "January", approved: 12, pending: 8, rejected: 2, withdrawn: 1 },
    { month: "February", approved: 28, pending: 15, rejected: 4, withdrawn: 2 },
    { month: "March", approved: 45, pending: 22, rejected: 6, withdrawn: 3 },
    { month: "April", approved: 68, pending: 35, rejected: 10, withdrawn: 4 },
    { month: "May", approved: 89, pending: 45, rejected: 14, withdrawn: 5 },
    { month: "June", approved: 156, pending: 52, rejected: 18, withdrawn: 6 },
    { month: "July", approved: 178, pending: 60, rejected: 20, withdrawn: 7 },
    { month: "August", approved: 190, pending: 70, rejected: 22, withdrawn: 8 },
    {
      month: "September",
      approved: 210,
      pending: 80,
      rejected: 25,
      withdrawn: 9,
    },
    {
      month: "October",
      approved: 230,
      pending: 90,
      rejected: 28,
      withdrawn: 10,
    },
    {
      month: "November",
      approved: 250,
      pending: 100,
      rejected: 30,
      withdrawn: 11,
    },
    {
      month: "December",
      approved: 270,
      pending: 110,
      rejected: 32,
      withdrawn: 12,
    },
  ];

  const chartConfig = {
    approved: {
      label: "Approved",
    },
    pending: {
      label: "Pending",
    },
    rejected: {
      label: "Rejected",
    },
    withdrawn: {
      label: "Withdrawn",
    },
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Application Status Trend</CardTitle>
          <CardDescription>
            Monthly Application Status Over Time
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={lineChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis stroke="#64748b" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Line
                type="monotone"
                dataKey="approved"
                stroke="#31694E"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#658C58"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="rejected"
                stroke="#662549"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="withdrawn"
                stroke="#872341"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Applications growing steadily
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing application trends by status over last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DashboardScreenAdmissionSummaryByMonth;
