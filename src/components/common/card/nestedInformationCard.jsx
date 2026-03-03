import _ from "lodash";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";

const MENestedInformationCardComponent = ({ title,  informationList }) => {
  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50 hover:cursor-pointer">
      <CardHeader>
        <CardTitle>{_.upperCase(title)}</CardTitle>
      </CardHeader>
      <CardContent>
        {_.map(informationList, (information, index) => (
          <div className="rounded-md px-5 py-4 mb-2 border border-primary/30">
            <div key={index} className="pb-4">
              <p className="text-sm font-medium text-primary">
                {_.toUpper(information.title)}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {_.map(information.nestedInformationList, (info, subIndex) => (
                <div key={subIndex} className="space-y-1">
                  <p className="text-xs font-medium text-primary/60">
                    {info.label}
                  </p>
                  <p className="text-sm font-semibold text-primary wrap-break-word">
                    {info.value || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MENestedInformationCardComponent;
