import { Badge } from "@MEShadcnComponents/badge";
import { badgeClassNameByVariant } from "@MECommonComponents/badge/meBadgeClassNameWrapper";

import PropTypes from "prop-types";

const MEBadge = ({ badgeVariant, ...props }) => {
  return (
    <Badge
      className={`${badgeClassNameByVariant(badgeVariant)}`}
      {...props}
    />
  );
};

MEBadge.propTypes = {
  badgeVariant: PropTypes.string,
};

export default MEBadge;
