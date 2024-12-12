import PropTypes from "prop-types";
import _ from "lodash";
import { Card, CardHeader, CardTitle, CardDescription } from "../../../ui/card";
import { homeScreenSummaryCardTitleClassNameByVariant } from "./summaryCardClassNameWrapper";

const HomeScreenSummaryCard = ({
  SummaryTitle,
  summaryDescription,
  titleVariant,
}) => {
  return (
    <Card className="h-fit">
      <CardHeader className="items-center">
        <CardTitle
          className={`text-6xl ${homeScreenSummaryCardTitleClassNameByVariant(
            titleVariant
          )}`}
        >
          {SummaryTitle}
        </CardTitle>
        <CardDescription className="mt-2 text-sm font-bold">
          {_.toUpper(summaryDescription)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

HomeScreenSummaryCard.propTypes = {
  SummaryTitle: PropTypes.string,
  summaryDescription: PropTypes.string,
  titleVariant: PropTypes.string,
};

export default HomeScreenSummaryCard;
