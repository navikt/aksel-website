import React from "react";
/* import {  useArgs } from "@storybook/client-api"; */
import { Button } from "@navikt/ds-react";

export default {
  title: "ds-react/Button",
  component: Button,
};

const Template = ({ variant, disabled, label, size }) => {
  return (
    <Button disabled={disabled} variant={variant} size={size}>
      {label}
    </Button>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Button",
  size: "m",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  label: "Button",
  size: "m",
};

export const Action = Template.bind({});
Action.args = {
  variant: "action",
  label: "Button",
  size: "m",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  label: "Button",
  size: "m",
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  variant: "primary",
  label: "Button",
  size: "s",
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  variant: "secondary",
  label: "Button",
  size: "s",
};

export const ActionSmall = Template.bind({});
ActionSmall.args = {
  variant: "action",
  label: "Button",
  size: "s",
};

export const DangerSmall = Template.bind({});
DangerSmall.args = {
  variant: "danger",
  label: "Button",
  size: "s",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "danger",
  disabled: true,
  size: "m",
  label: "Disabled button",
};

export const DisabledSmall = Template.bind({});
DisabledSmall.args = {
  variant: "danger",
  disabled: true,
  size: "s",
  label: "Disabled button",
};
