import { variants } from "@MEUtils/enums";  

export const inputClassNameByVariant = (inputVariant) => {
  switch (inputVariant) {
    case variants.PRIMARY:
      return "border-primary/80 text-primary focus-visible:border-primary/80 focus-visible:ring-primary/20";
    case variants.SECONDARY:
      return "border-secondary/80 text-secondary focus-visible:border-secondary/80 focus-visible:ring-secondary/20";
    case variants.SUCCESS:
      return "border-success/80 text-success focus-visible:border-success/80 focus-visible:ring-success/20";
    case variants.WARNING:
      return "border-warning/80 text-warning focus-visible:border-warning/80 focus-visible:ring-warning/20";
    case variants.DANGER:
      return "border-danger/80 text-danger focus-visible:border-danger/80 focus-visible:ring-danger/20";
    case variants.DARK:
      return "border-dark/80 text-dark focus-visible:border-dark/80 focus-visible:ring-dark/20";
    default:
      return "border-primary/80 text-primary focus-visible:border-primary/80 focus-visible:ring-primary/20";
  }
};

export const inputMessageClassNameByVariant = (messageVariant) => {
  switch (messageVariant) {
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

export const inputLabelClassNameByVariant = (labelVariant) => {
    switch (labelVariant) {
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
