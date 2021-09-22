import React from "react";
import { Button } from "@navikt/ds-react";
import ReactPreview from "./ReactPreview";

export default {
  title: "ds-react/Button",
  component: Button,
};

const Template = ({ variant, disabled, label, size }) => {
  return (
    <>
      <ReactPreview>
        {`<Button ${
          disabled ? "disabled={true}" : ""
        } variant="${variant}" size="${size}">
          ${label}
        </Button>`}
      </ReactPreview>
      <Button disabled={disabled} variant={variant} size={size}>
        {label}
      </Button>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  label: "Button",
  size: "medium",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  label: "Button",
  size: "medium",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: "tertiary",
  label: "Button",
  size: "medium",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  label: "Button",
  size: "medium",
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  variant: "primary",
  label: "Button",
  size: "small",
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  variant: "secondary",
  label: "Button",
  size: "small",
};

export const TertiarySmall = Template.bind({});
TertiarySmall.args = {
  variant: "tertiary",
  label: "Button",
  size: "small",
};

export const DangerSmall = Template.bind({});
DangerSmall.args = {
  variant: "danger",
  label: "Button",
  size: "small",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "danger",
  disabled: true,
  size: "medium",
  label: "Disabled button",
};

export const DisabledSmall = Template.bind({});
DisabledSmall.args = {
  variant: "danger",
  disabled: true,
  size: "small",
  label: "Disabled button",
};
