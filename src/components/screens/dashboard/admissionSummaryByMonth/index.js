import { useSelector } from "react-redux";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import _ from "lodash";
import moment from "moment";

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
    // Format label using moment
    const formatLabel = () => {
      if (typeof label === 'number') {
        return moment().month(label - 1).format('MMMM');
      }
      return moment(label).format('MMMM');
    };

    return (
      <div className="bg-white border border-primary rounded-lg p-2 sm:p-3 md:p-4 shadow-lg max-w-xs">
        <p className="font-semibold text-primary mb-1 sm:mb-2 text-xs capitalize">
          {formatLabel()}
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

const DashboardScreenAdmissionSummaryByMonth = () => {
  const { dashboardSummary } = useSelector((state) => state.dashboard);

  const chartData = dashboardSummary?.admissionByMonth || [];

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
          <CardTitle>Admission by Month</CardTitle>
          <CardDescription>Monthly Application Status Distribution</CardDescription>
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
              <LineChart accessibilityLayer data={chartData} margin={{ bottom: 30 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    // If value is a number (1-12), convert to month name
                    if (typeof value === 'number') {
                      return moment().month(value - 1).format('MMM');
                    }
                    // If value is a string, try to parse it
                    return moment(value).format('MMM');
                  }}
                />
                <YAxis stroke="#64748b" />
                <ChartTooltip
                  cursor={false}
                  content={<CustomTooltip chartConfig={chartConfig} />}
                />
                <Line
                  type="monotone"
                  dataKey="approvedApplication"
                  stroke="#31694E"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="underReviewApplication"
                  stroke="#658C58"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="rejectedApplication"
                  stroke="#662549"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="withdrawnApplication"
                  stroke="#872341"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Total Admissions: {totalAdmissions}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none text-xs">
            Approved: {totalApproved} | Under Review: {totalUnderReview} | Rejected: {totalRejected} | Withdrawn: {totalWithdrawn}
          </div>
          <div className="text-muted-foreground leading-none">
            Showing admission application status across all months.
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DashboardScreenAdmissionSummaryByMonth;
