import React from "react";
/* import {  useArgs } from "@storybook/client-api"; */
import { Button } from "@navikt/ds-react";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => {
  return (
    <div>
      <Button {...args} />
      <Button {...args} />
      <Button {...args} />
    </div>
  );
};

export const PrimaryButton = () => <Button variant="primary">Button</Button>;
export const SecondaryButton = () => (
  <Button variant="secondary">Button</Button>
);
export const ActionButton = () => <Button variant="action">Button</Button>;
export const DangerButton = () => <Button variant="danger">Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};
