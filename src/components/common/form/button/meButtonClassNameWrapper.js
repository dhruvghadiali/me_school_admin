import { variants } from "@MEUtils/enums";  

export const buttonClassNameByVariant = (buttonVariant) => {
  switch (buttonVariant) {
    case variants.PRIMARY:
      return "bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-primary/50";
    case variants.SECONDARY:
      return "bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 focus-visible:ring-secondary/50";
    case variants.SUCCESS:
      return "bg-success text-success-foreground shadow hover:bg-success/90 focus-visible:ring-success/50";
    case variants.WARNING:
      return "bg-warning text-warning-foreground shadow hover:bg-warning/90 focus-visible:ring-warning/50";
    case variants.DANGER:
      return "bg-danger text-danger-foreground shadow hover:bg-danger/90 focus-visible:ring-danger/50";
    case variants.DARK:
      return "bg-dark text-dark-foreground shadow hover:bg-dark/90 focus-visible:ring-dark/50";
    default:
      return "";
  }
};