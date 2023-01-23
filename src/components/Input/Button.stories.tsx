import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';
import { VscSave } from 'react-icons/vsc';

export default {
  title: 'Input/Button',
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  className: 'gap-2 items-center flex px-2',
  children: (
    <>
      <VscSave /> Save
    </>
  )
}
