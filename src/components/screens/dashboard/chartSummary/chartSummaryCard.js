import { FilterIcon } from "lucide-react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

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
            <CardTitle>{summaryHeader}</CardTitle>
            <CardDescription className="mt-2">
              {summarySubtitle}
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
