import { variants } from "@MEUtils/enums";  

export const badgeClassNameByVariant = (badgeVariant) => {
  switch (badgeVariant) {
    case variants.PRIMARY:
      return "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80";
    case variants.SECONDARY:
      return "border-transparent bg-secondary text-secondary-foreground shadow hover:bg-secondary/80";
    case variants.SUCCESS:
      return "border-transparent bg-success text-success-foreground shadow hover:bg-success/80";
    case variants.WARNING:
      return "border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80";
    case variants.DANGER:
      return "border-transparent bg-danger text-danger-foreground shadow hover:bg-danger/80";
    case variants.DARK:
      return "border-transparent bg-dark text-dark-foreground shadow hover:bg-dark/80";
    default:
      return "";
  }
};