import { fn } from '@storybook/test';
import { HomeIcon } from "lucide-react";
import { ButtonMockup } from './ButtonMockup';

export default {
  title: 'Example/Button',
  component: ButtonMockup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const VariantDefault = {
  args: {
    variant: "default",
  },
};

export const VariantSecondary = {
  args: {
    variant: "secondary",
  },
};

export const VariantDanger = {
  args: {
    variant: "danger",
  },
};

export const VariantDark = {
  args: {
    variant: "dark",
  },
};

export const VariantSuccess = {
  args: {
    variant: "success",
  },
}; 

export const VariantWarning = {
  args: {
    variant: "warning",
  },
};

export const VariantOutline = {
  args: {
    variant: "outline",
  },
};

export const VariantGhost = {
  args: {
    variant: "ghost",
  },
};

export const VariantLink = {
  args: {
    variant: "link",
  },
};

export const SizeLG = {
  args: {
    size:'lg'
  },
};

export const SizeDefault = {
  args: {
    size:'sm'
  },
};

export const SizeSM = {
  args: {
    size:'sm'
  },
};

export const SizeIcon = {
  args: {
    size:'icon',
    children: <HomeIcon/>,
  },
};

export const LeftTextIcon = {
  args: {
    children: <> <HomeIcon/> Click Me !!</> ,
  },
};

export const RightTextIcon = {
  args: {
    children: <> Click Me !! <HomeIcon/> </> ,
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
