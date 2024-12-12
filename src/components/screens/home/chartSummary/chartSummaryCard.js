import { FilterIcon } from "lucide-react";
import PropTypes from 'prop-types';
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

const HomeScreenChartSummaryCard = ({
  summaryHeader,
  summarySubtitle,
  summaryNotes,
  children,
}) => {
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
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Admission Form</DropdownMenuItem>
                <DropdownMenuItem>Approved Form</DropdownMenuItem>
                <DropdownMenuItem>Rejected Form</DropdownMenuItem>
                <DropdownMenuItem>Canceled Form</DropdownMenuItem>
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

HomeScreenChartSummaryCard.propTypes = {
    summaryHeader: PropTypes.string,
    summarySubtitle: PropTypes.string,
    summaryNotes: PropTypes.string,
  };

export default HomeScreenChartSummaryCard;
