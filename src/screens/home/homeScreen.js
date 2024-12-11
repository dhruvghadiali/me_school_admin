import AuthHoc from "../../components/common/authHoc/authHoc";
import MESidebar from "../../components/common/sidebar/meSidebar";
import HomeScreenHeader from "../../components/screens/home/header/header";
import MEBarChart from "../../components/common/chart/barChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FilterIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import HomeScreenSummary from "../../components/screens/home/summary/summary";

const HomeScreen = () => {
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <HomeScreenHeader />
          <HomeScreenSummary />
          <div className="grid grid-flow-row grid-cols-2 mr-5 gap-4 mt-10">
            <Card className="">
              <CardHeader>
                <div className="grid grid-cols-[auto_50px] gap-1 ">
                  <div>
                    <CardTitle>Report Summary</CardTitle>
                    <CardDescription className="mt-2">
                      Deploy your new project in one-click. Deploy your new
                      project in one-click. Deploy your new project in
                      one-click. Deploy your new project in one-click. Deploy
                      your new project in one-click.
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
              <CardContent>
                <MEBarChart />
              </CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <div className="grid grid-cols-[auto_50px] gap-1 ">
                  <div>
                    <CardTitle>Report Summary</CardTitle>
                    <CardDescription>
                      Deploy your new project in one-click. Deploy your new
                      project in one-click. Deploy your new project in
                      one-click. Deploy your new project in one-click. Deploy
                      your new project in one-click.
                    </CardDescription>
                  </div>
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
              </CardHeader>
              <CardContent>
                <MEBarChart />
              </CardContent>
              <CardFooter className="flex justify-between">
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default HomeScreen;
