import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

const DashboardScreenAdmissionSummaryByAcademicClass = () => {
  const chartData = [
    { class: "Class 1", approved: 14, pending: 8, rejected: 2, withdrawn: 1 },
    { class: "Class 2", approved: 19, pending: 10, rejected: 3, withdrawn: 2 },
    { class: "Class 3", approved: 17, pending: 9, rejected: 2, withdrawn: 1 },
    { class: "Class 4", approved: 21, pending: 11, rejected: 3, withdrawn: 8 },
    { class: "Class 5", approved: 13, pending: 7, rejected: 2, withdrawn: 10 },
    { class: "Class 6", approved: 5, pending: 8, rejected: 2, withdrawn: 5 },
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
          <CardTitle>Admission by Academic Class</CardTitle>
          <CardDescription>Application Status Distribution</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="class"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 8)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="approved" fill="#31694E" radius={[5, 5, 0, 0]} />
              <Bar dataKey="pending" fill="#658C58" radius={[5, 5, 0, 0]} />
              <Bar dataKey="rejected" fill="#662549" radius={[5, 5, 0, 0]} />
              <Bar dataKey="withdrawn" fill="#872341" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Total Admissions: 158
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing admission application status across all classes
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default DashboardScreenAdmissionSummaryByAcademicClass;
