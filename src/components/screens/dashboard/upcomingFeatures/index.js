import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@MEShadcnComponents/card";
import {
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const DashboardScreenUpcomingFeatures = () => {
  const upcomingFeatures = [
    {
      id: 1,
      title: "View Admission Reports",
      description:
        "Analyze new admission data with interactive charts and export to Excel format",
      icon: BarChart3,
      releaseDate: "January 01, 2027",
      features: ["Interactive Charts", "Excel Export", "Data Filtering"],
      status: "In Testing",
      phase: "Q1 2027",
    },
    {
      id: 2,
      title: "Manage Students Records",
      description:
        "View, update, and organize student information and academic records efficiently",
      icon: Users,
      releaseDate: "January 01, 2027",
      features: ["Student Database", "Grade Tracking", "Attendance Management"],
      status: "In Development",
      phase: "Q1 2027",
    },
    {
      id: 3,
      title: "Manage Faculty Records",
      description:
        "Manage teacher and faculty information, qualifications, and assignments",
      icon: BookOpen,
      releaseDate: "January 01, 2027",
      features: [
        "Staff Directory",
        "Qualification Management",
        "Assignment Tracking",
      ],
      status: "In Development",
      phase: "Q1 2027",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 auto-rows-fr">
      {upcomingFeatures.map((feature) => {
        const IconComponent = feature.icon;
        return (
          <Card
            key={feature.id}
            className="group relative overflow-hidden hover:shadow-2xl shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 shadow-lg border flex flex-col h-full"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-linear-to-br  opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Card Header with Icon */}
            <CardHeader className="relative pb-4">
              <div
                className={`w-16 h-16 rounded-lg  bg-primary/5 shadow-2xl border flex items-center justify-center mb-3`}
              >
                <IconComponent className={`w-8 h-8 `} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h2>
            </CardHeader>

            {/* Card Content */}
            <CardContent className="pb-4 grow flex flex-col">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {feature.description}
              </p>

              {/* Key Features */}
              <div className="space-y-2 grow flex flex-col">
                {feature.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Release Date */}
              <div className="mt-5 flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 " />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Available: {feature.releaseDate}
                </span>
              </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="flex flex-col gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              {/* Status and Timeline Info */}
              <div className="w-full space-y-3">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Status
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full">
                    {feature.status}
                  </span>
                </div>

                {/* Release Info */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Phase
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {feature.phase}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardScreenUpcomingFeatures;
