import { fn } from '@storybook/test';
import { SliderMockup } from './SliderMockup';

export default {
  title: 'Example/Slider',
  component: SliderMockup,
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