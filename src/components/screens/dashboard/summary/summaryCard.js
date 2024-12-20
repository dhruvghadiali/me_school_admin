import { homeScreenSummaryCardTitleClassNameByVariant } from "@MEScreenComponents/dashboard/summary/summaryCardClassNameWrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@MEShadcnComponents/card";

import _ from "lodash";
import PropTypes from "prop-types";

const HomeScreenSummaryCard = ({
  SummaryTitle,
  summaryDescription,
  titleVariant,
}) => {
  return (
    <Card className="h-fit" key={_.uniqueId()}>
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
