
import { ME_CHECKBOX_COMPONENT_ENUM } from "@MEHelpers/enums";

const checkboxLabelClassNameByVariant = (
  variant = ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY
) => {
  const variantColorMap = {
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY]: "primary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SECONDARY]: "secondary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SUCCESS]: "success",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.WARNING]: "warning",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DANGER]: "danger",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DARK]: "dark",
  };

  const color = variantColorMap[variant] || "primary";
  return `text-${color} `;
};

const checkboxClassNameByVariant = (
  variant = ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY
) => {
  const variantColorMap = {
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY]: "primary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SECONDARY]: "secondary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SUCCESS]: "success",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.WARNING]: "warning",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DANGER]: "danger",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DARK]: "dark",
  };
  const color = variantColorMap[variant] || "primary";
  return `w-4 h-4 rounded cursor-pointer disabled:opacity-50 accent-${color}`;
};

const checkboxInputLabelClassNameByVariant = (
  variant = ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY
) => {
  const variantColorMap = {
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY]: "primary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SECONDARY]: "secondary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SUCCESS]: "success",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.WARNING]: "warning",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DANGER]: "danger",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DARK]: "dark",
  };
  const color = variantColorMap[variant] || "primary";
  return `ml-2 cursor-pointer text-${color}`;
};

const checkboxMessageClassNameByVariant = (
  variant = ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY
) => {
  const variantColorMap = {
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.PRIMARY]: "primary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SECONDARY]: "secondary",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.SUCCESS]: "success",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.WARNING]: "warning",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DANGER]: "danger",
    [ME_CHECKBOX_COMPONENT_ENUM.VARIANTS.DARK]: "dark",
  };
  const color = variantColorMap[variant] || "primary";
  return `mt-2 text-xs text-${color}`;
};

export {
  checkboxClassNameByVariant,
  checkboxLabelClassNameByVariant,
  checkboxMessageClassNameByVariant,
  checkboxInputLabelClassNameByVariant,
};
