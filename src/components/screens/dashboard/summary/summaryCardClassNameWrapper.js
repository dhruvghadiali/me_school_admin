import {variants} from '@MEUtils/enums';

export const homeScreenSummaryCardTitleClassNameByVariant = (titleVariant) => {
    switch (titleVariant) {
      case variants.PRIMARY:
        return "text-primary";
      case variants.SECONDARY:
        return "text-secondary";
      case variants.SUCCESS:
        return "text-success";
      case variants.WARNING:
        return "text-warning";
      case variants.DANGER:
        return "text-danger";
      case variants.DARK:
        return "text-dark";
      default:
        return "text-primary";
    }
  };