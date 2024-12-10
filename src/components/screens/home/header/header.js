import { FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

const HomeScreenHeader = () => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 mr-5 ">
      <h1 className="text-3xl"> Report </h1>
      <div className="content-center justify-self-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FilterIcon size={15} className="text-dark" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel>Reports</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Summary</DropdownMenuItem>
            <DropdownMenuItem>Classes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HomeScreenHeader;
