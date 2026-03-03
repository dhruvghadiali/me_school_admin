import _ from "lodash";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";

const MEInformationCardComponent = ({ title, informationList, children }) => {
  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50 hover:cursor-pointer">
      <CardHeader>
        <CardTitle>{_.upperCase(title)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {_.map(informationList, (information, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs font-medium text-primary/60">
                {information.label}
              </p>
              <p className="text-sm font-semibold text-primary wrap-break-word">
                {information.value || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MEInformationCardComponent;
