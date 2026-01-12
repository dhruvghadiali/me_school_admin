import DashboardScreenHeader from "@MEScreenComponents/dashboard/header";
import DashboardScreenUpcomingFeatures from "@MEScreenComponents/dashboard/upcomingFeatures";

import { TrendingUp, FileCheck, CheckCircle2, XCircle, Clock, Users, BookOpen, Layers } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, YAxis, PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@MEShadcnComponents/table";

export const description = "A multiple bar chart";

const chartData = [
  { class: "Class 1", approved: 14, pending: 8, rejected: 2 },
  { class: "Class 2", approved: 19, pending: 10, rejected: 3 },
  { class: "Class 3", approved: 17, pending: 9, rejected: 2 },
  { class: "Class 4", approved: 21, pending: 11, rejected: 3 },
  { class: "Class 5", approved: 13, pending: 7, rejected: 2 },
  { class: "Class 6", approved: 5, pending: 8, rejected: 2 },
];

const lineChartData = [
  { month: "January", approved: 12, pending: 8, rejected: 2 },
  { month: "February", approved: 28, pending: 15, rejected: 4 },
  { month: "March", approved: 45, pending: 22, rejected: 6 },
  { month: "April", approved: 68, pending: 35, rejected: 10 },
  { month: "May", approved: 89, pending: 45, rejected: 14 },
  { month: "June", approved: 156, pending: 52, rejected: 18 },
];

const chartConfig = {
  approved: {
    label: "Approved",
    color: "hsl(142 71% 45%)", // success
  },
  pending: {
    label: "Pending",
    color: "hsl(221 83% 53%)", // primary
  },
  rejected: {
    label: "Rejected",
    color: "hsl(0 84% 60%)", // danger
  },
};

const statsData = [
  {
    id: 1,
    label: "Total Application Submitted",
    value: "156",
    icon: FileCheck,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    id: 2,
    label: "Total Selected Application",
    value: "89",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    id: 3,
    label: "Total Rejected Application",
    value: "18",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    id: 4,
    label: "Total In Progress Application",
    value: "49",
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
  },
];

const academicYearData = [
  {
    year: "2023-2024",
    total: 128,
    approved: 72,
    rejected: 12,
    pending: 44,
  },
  {
    year: "2022-2023",
    total: 95,
    approved: 58,
    rejected: 8,
    pending: 29,
  },
  {
    year: "2021-2022",
    total: 87,
    approved: 52,
    rejected: 10,
    pending: 25,
  },
  {
    year: "2020-2021",
    total: 76,
    approved: 48,
    rejected: 9,
    pending: 19,
  },
];

const applicationStatusPieData = [
  { name: "Approved", value: 89, fill: "hsl(142 71% 45%)" },
  { name: "Pending", value: 49, fill: "hsl(221 83% 53%)" },
  { name: "Rejected", value: 18, fill: "hsl(0 84% 60%)" },
];

const schoolSummary = [
  {
    id: 1,
    label: "Total Students",
    value: "1,240",
    description: "Enrolled students",
    icon: Users,
  },
  {
    id: 2,
    label: "Total Faculty",
    value: "85",
    description: "Teaching staff",
    icon: BookOpen,
  },
  {
    id: 3,
    label: "Total Classes",
    value: "42",
    description: "Active classes",
    icon: Layers,
  },
];

const getBarSize = (width) => {
  if (width < 640) return 10; // mobile
  if (width < 1024) return 15; // tablet
  if (width < 1536) return 20; // laptop
  return 25; // large screen
};

const DashboardPage = () => {
  const [barSize, setBarSize] = useState(150);

  useEffect(() => {
    const handleResize = () => {
      setBarSize(getBarSize(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <DashboardScreenHeader />

      {/* Stats Grid */}
      <div className="mt-8 mb-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {statsData.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.id} className="border border-slate-200 dark:border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <IconComponent className={`${stat.color} w-6 h-6`} />
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="mt-8 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
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
                <Bar dataKey="approved" fill="hsl(142 71% 45%)" radius={4} />
                <Bar dataKey="pending" fill="hsl(221 83% 53%)" radius={4} />
                <Bar dataKey="rejected" fill="hsl(0 84% 60%)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Total Admissions: 156
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing admission application status across all classes
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status Trend</CardTitle>
            <CardDescription>Monthly Application Status Over Time</CardDescription>
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
                  stroke="hsl(142 71% 45%)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="hsl(221 83% 53%)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="hsl(0 84% 60%)"
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
      </div>

      {/* Academic Year Summary */}
      <div className="mt-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Admission Application Summary by Academic Year</CardTitle>
            <CardDescription>Year-wise application statistics</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="w-full overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-900">
                      <TableHead className="text-slate-900 dark:text-white font-semibold whitespace-nowrap">Academic Year</TableHead>
                      <TableHead className="text-slate-900 dark:text-white font-semibold whitespace-nowrap">Total Applications</TableHead>
                      <TableHead className="text-slate-900 dark:text-white font-semibold whitespace-nowrap">Approved</TableHead>
                      <TableHead className="text-slate-900 dark:text-white font-semibold whitespace-nowrap">Rejected</TableHead>
                      <TableHead className="text-slate-900 dark:text-white font-semibold whitespace-nowrap">Pending</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {academicYearData.map((row, idx) => (
                      <TableRow key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                        <TableCell className="font-medium text-slate-900 dark:text-white whitespace-nowrap">
                          {row.year}
                        </TableCell>
                        <TableCell className="text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          {row.total}
                        </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 text-sm font-medium">
                          {row.approved}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm font-medium">
                          {row.rejected}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 text-sm font-medium">
                          {row.pending}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Historical admission data
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing admission application summary across academic years
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* School Summary & Pie Chart Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {/* School Summary Cards - 80% on desktop, full width on mobile/tablet */}
        <div className="md:col-span-1 lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {schoolSummary.map((item, idx) => (
            <Card key={idx} className="border border-slate-200 dark:border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    <item.icon className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pie Chart - 20% on desktop, full width on mobile/tablet */}
        <div className="md:col-span-1 lg:col-span-1">
          <Card className="h-full border border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg">Application Status</CardTitle>
              <CardDescription>Distribution overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationStatusPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {applicationStatusPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => [`${value} apps`, "Count"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="w-full space-y-2">
                {applicationStatusPieData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.fill }}
                      ></div>
                      <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* <DashboardScreenUpcomingFeatures /> */}
    </>
  );
};

export default DashboardPage;
