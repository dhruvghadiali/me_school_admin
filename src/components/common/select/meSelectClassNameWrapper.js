import { variants } from "@MEUtils/enums";  

export const selectClassNameByVariant = (inputVariant) => {
  switch (inputVariant) {
    case variants.PRIMARY:
      return "text-primary border-primary/80 focus-visible:border-primary/80 focus-visible:ring-primary/20 focus:ring-0";
    case variants.SECONDARY:
      return "text-secondary border-secondary/80 focus-visible:border-secondary/80 focus-visible:ring-secondary/20 focus:ring-0";
    case variants.SUCCESS:
      return "text-success border-success/80 focus-visible:border-success/80 focus-visible:ring-success/20 focus:ring-0";
    case variants.WARNING:
      return "text-warning border-warning/80 focus-visible:border-warning/80 focus-visible:ring-warning/20 focus:ring-0";
    case variants.DANGER:
      return "text-danger border-danger/80 focus-visible:border-danger/80 focus-visible:ring-danger/20 focus:ring-0";
    case variants.DARK:
      return "text-dark border-dark/80 focus-visible:border-dark/80 focus-visible:ring-dark/20 focus:ring-0";
    default:
      return "border-primary/80 text-primary focus-visible:border-primary/80 focus-visible:ring-primary/20";
  }
};

export const selectedValueClassNameByVariant = (inputVariant) => {
  switch (inputVariant) {
    case variants.PRIMARY:
      return "focus:bg-primary focus:text-dark text-primary";
    case variants.SECONDARY:
      return "focus:bg-secondary focus:text-dark text-secondary";
    case variants.SUCCESS:
      return "focus:bg-success focus:text-dark text-success";
    case variants.WARNING:
      return "focus:bg-warning focus:text-dark text-warning";
    case variants.DANGER:
      return "focus:bg-danger focus:text-dark text-danger";
    case variants.DARK:
      return "focus:bg-dark focus:text-secondary text-dark";
    default:
      return "focus:bg-primary text-primary";
  }
};

export const selectMessageClassNameByVariant = (messageVariant) => {
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

export const selectLabelClassNameByVariant = (labelVariant) => {
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
