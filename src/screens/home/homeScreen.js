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

const HomeScreen = () => {
  return (
    <>
      <AuthHoc>
        <MESidebar>
          <HomeScreenHeader />
          <Card className="w-4/6 justify-self-center m-5">
            <CardHeader>
              <CardTitle>Report Summary</CardTitle>
              <CardDescription>
                Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click. Deploy your new project in one-click.
              </CardDescription>
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
        </MESidebar>
      </AuthHoc>
    </>
  );
};

export default HomeScreen;
