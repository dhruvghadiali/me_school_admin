import { FilterIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@MEShadcnComponents/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@MEShadcnComponents/dropdown-menu";

import _ from "lodash";
import PropTypes from "prop-types";

const DashboardScreenChartSummaryCard = (props) => {
  const {
    summaryHeader,
    summarySubtitle,
    summaryNotes,
    dropdownList,
    activeDropdown,
    dropdownTitle,
    onDropdownSelection,
    children,
  } = props;

  return (
    <Card className="">
      <CardHeader>
        <div className="grid grid-cols-[auto_50px] gap-1 ">
          <div>
            <CardTitle>{_.upperFirst(summaryHeader)}</CardTitle>
            <CardDescription className="mt-2">
              {_.upperFirst(summarySubtitle)}
            </CardDescription>
          </div>
          <div className="content-center justify-self-end">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FilterIcon size={15} className="text-dark" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2">
                <DropdownMenuLabel className="text-dark text-xs font-semibold">
                  {_.startCase(dropdownTitle)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {_.map(dropdownList, (dropdownLabel, index) => (
                  <DropdownMenuItem
                    className={
                      activeDropdown === dropdownLabel
                        ? "text-primary"
                        : "text-dark"
                    }
                    key={dropdownLabel}
                    onClick={() => onDropdownSelection(dropdownLabel, index)}
                  >
                    {_.startCase(dropdownLabel)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent> {children} </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>{summaryNotes}</CardDescription>
      </CardFooter>
    </Card>
  );
};

DashboardScreenChartSummaryCard.propTypes = {
  summaryHeader: PropTypes.string,
  summarySubtitle: PropTypes.string,
  summaryNotes: PropTypes.string,
  dropdownTitle: PropTypes.string,
  activeDropdown: PropTypes.string,
  dropdownList: PropTypes.array,
  onDropdownSelection: PropTypes.func,
};

export default DashboardScreenChartSummaryCard;
