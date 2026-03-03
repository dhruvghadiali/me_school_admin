import _ from "lodash";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@MEShadcnComponents/card";

const METimeLineCardComponent = ({ title, informationList }) => {
  return (
    <Card className="bg-secondary/50 shadow-lg shadow-primary/50">
      <CardHeader>
        <CardTitle>{_.upperCase(title)}</CardTitle>
      </CardHeader>
      <CardContent>
        {_.map(informationList, (information, index) => (
          <div key={index} className="flex gap-3 sm:gap-4 hover:cursor-pointer">
            <div className="flex flex-col items-center pt-1">
              <div className={`w-3 h-3 rounded-full border-2 border-primary`} />
              <div className="w-0.5 h-10 sm:h-16 bg-linear-to-b from-primary/40 to-primary/20 mt-2" />
            </div>
            <div className="flex-1 pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1.5">
                <span
                  className={`inline-flex py-0.5 rounded-full text-xs font-bold w-fit`}
                >
                  {_.upperCase(information?.status) || "N/A"}
                </span>
                <span className="text-xs text-primary/50 font-medium">
                  {information?.time || "N/A"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1.5">
                  By:{" "}
                  <span className="font-bold text-foreground">
                    {_.upperFirst(information?.username) || ""}{" "}
                  </span>
                </p>
              {information?.remarks && (
                  <p className="text-xs p-3 bg-secondary/50 rounded-lg border border-primary/30 italic">
                    "{information?.remarks || ""}"
                  </p>
                )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default METimeLineCardComponent;
