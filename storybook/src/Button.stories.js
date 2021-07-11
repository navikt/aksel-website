import React from "react";
/* import {  useArgs } from "@storybook/client-api"; */
import { Button } from "@navikt/ds-react";

export default {
  title: "ds-react/Button",
  component: Button,
};

const Template = ({ variant, label }) => {
  return <Button variant={variant}>{label}</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  label: "Button",
};

export const Action = Template.bind({});
Action.args = {
  variant: "action",
  label: "Button",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  label: "Button",
};
