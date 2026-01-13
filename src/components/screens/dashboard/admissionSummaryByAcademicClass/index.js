import { useSelector } from "react-redux";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import _ from "lodash";

import { ChartContainer, ChartTooltip } from "@MEShadcnComponents/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@MEShadcnComponents/card";

const CustomTooltip = ({ active, payload, label, chartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-primary rounded-lg p-2 sm:p-3 md:p-4 shadow-lg max-w-xs">
        <p className="font-semibold text-primary mb-1 sm:mb-2 text-xs capitalize">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{ color: entry.color }}
            className="text-xs mt-1"
          >
            {chartConfig[entry.dataKey]?.label}:{" "}
            <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardScreenAdmissionSummaryByAcademicClass = () => {
  const { dashboardSummary } = useSelector((state) => state.dashboard);

  const chartData = dashboardSummary?.admissionByAcademicClass || [];

  // Calculate sums using lodash
  const calculateSum = (key) => {
    return _.sumBy(chartData, key);
  };

  const totalApproved = calculateSum("approvedApplication");
  const totalUnderReview = calculateSum("underReviewApplication");
  const totalRejected = calculateSum("rejectedApplication");
  const totalWithdrawn = calculateSum("withdrawnApplication");
  const totalAdmissions = calculateSum("admissionApplication");

  const chartConfig = {
    approvedApplication: {
      label: "Approved",
    },
    underReviewApplication: {
      label: "Under Review",
    },
    rejectedApplication: {
      label: "Rejected",
    },
    withdrawnApplication: {
      label: "Withdrawn",
    },
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Admission by Academic Class</CardTitle>
          <CardDescription>Application Status Distribution</CardDescription>
        </CardHeader>

        <CardContent>
          {!chartData || chartData.length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center bg-danger/10  border border-danger/50  rounded-lg">
              <p className="text-danger  font-medium">
                Admission summary chart data is not available at the moment.
              </p>
            </div>
          ) : (
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="academicClass"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 8)}
                />
                <ChartTooltip
                  cursor={true}
                  content={<CustomTooltip chartConfig={chartConfig} />}
                />
                <Bar
                  dataKey="approvedApplication"
                  fill="#31694E"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="underReviewApplication"
                  fill="#658C58"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="rejectedApplication"
                  fill="#662549"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="withdrawnApplication"
                  fill="#872341"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Total Admissions: {totalAdmissions}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none text-xs">
            Approved: {totalApproved} | Under Review: {totalUnderReview} |
            Rejected: {totalRejected} | Withdrawn: {totalWithdrawn}
          </div>
          <div className="text-muted-foreground leading-none">
            Showing admission application status across all academic classes.
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DashboardScreenAdmissionSummaryByAcademicClass;
