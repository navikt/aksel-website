import { Sandbox } from "@/components";
import { SandboxKeys } from ".";

export default {
  title: "Stories/Sandbox",
  component: Sandbox,
  argTypes: {
    sandbox: {
      defaultValue: SandboxKeys[0],
      control: {
        type: "select",
        options: SandboxKeys,
      },
    },
  },
};

export const Default = (props: any) => {
  return (
    <Sandbox
      node={{
        _type: "ds_code_sandbox",
        title: props?.sandbox,
        _id: "",
        _createdAt: "",
        _rev: "",
        _updatedAt: "",
      }}
    />
  );
};

/* Default.args */
