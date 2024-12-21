import { variants } from "@MEUtils/enums";  

export const buttonClassNameByVariant = (inputVariant) => {
  switch (inputVariant) {
    case variants.PRIMARY:
      return "bg-primary text-primary-foreground shadow hover:bg-primary/90";
    case variants.SECONDARY:
      return "bg-secondary text-secondary-foreground shadow hover:bg-secondary/90";
    case variants.SUCCESS:
      return "bg-success text-success-foreground shadow hover:bg-success/90";
    case variants.WARNING:
      return "bg-warning text-warning-foreground shadow hover:bg-warning/90";
    case variants.DANGER:
      return "bg-danger text-danger-foreground shadow hover:bg-danger/90";
    case variants.DARK:
      return "bg-dark text-dark-foreground shadow hover:bg-dark/90";
    default:
      return "";
  }
};