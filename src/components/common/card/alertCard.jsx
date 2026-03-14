import { AlertTriangleIcon } from "lucide-react";
import _ from "lodash";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";

const MEAlertCardComponent = ({ icon, alertText, alertMessage }) => {
  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50 hover:cursor-pointer">
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
            {icon || (<AlertTriangleIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary/50" />)}
          </div>
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 md:mb-1.5">
            {alertText || "Alert!!"}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            {alertMessage || "Something went wrong, please try again later."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MEAlertCardComponent;
