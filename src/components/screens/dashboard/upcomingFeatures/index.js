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
  Zap,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {upcomingFeatures.map((feature) => {
        const IconComponent = feature.icon;
        return (
          <Card
            key={feature.id}
            className="border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h2>
            </CardHeader>

            <CardContent className="pb-3 grow">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {feature.description}
              </p>

              {/* Key Features */}
              <div className="space-y-1 mb-4">
                {feature.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Release Date */}
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Calendar className="w-3 h-3" />
                <span>{feature.releaseDate}</span>
              </div>
            </CardContent>

            <CardFooter className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="w-full space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Status:</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {feature.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Phase:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
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
