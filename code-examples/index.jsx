import React from "react";
import StartCase from "lodash.startcase";
import { PrimaryButton, SecondaryButton, ActionButton, DangerButton } from "./button";

const examples = {
  primary_button: () => <PrimaryButton />,
  secondary_button: () => <SecondaryButton />,
  action_button: () => <ActionButton />,
  danger_button: () => <DangerButton />,
};

const RenderExample = ({ component }) => {
  if (!Object.keys(examples).includes(component)) {
    // Shouldnt be needed, if triggered something is broken
    console.log(`${component} not a valid code example`);
    return null;
  }
  const Comp = examples[component];
  return <Comp />;
};

export const getExamples = () =>
  Object.keys(examples).map((key) => ({ title: StartCase(key), value: key }));

export default RenderExample;
