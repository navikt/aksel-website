import {
  SandboxComponentArgs,
  SandboxComponentProps,
} from "../../sandbox/types";

export interface EnumT {
  default: string;
  options: string[];
  format: "array";
}

export interface StringT {
  default: string;
  format: "string";
}

export interface BooleanT {
  default: boolean;
  format: "boolean";
}

export interface ParsedPropsT {
  [key: string]: EnumT | BooleanT | StringT;
}

export const getInitialState = (args: ParsedPropsT) =>
  Object.entries(args).reduce(
    (old, [key, value]) => ({ ...old, [key]: value.default }),
    {}
  );

const parseProps = (props: SandboxComponentProps): ParsedPropsT =>
  Object.entries(props).reduce((old, [key, value]) => {
    switch (true) {
      case Array.isArray(value) && value.length > 0:
        return {
          ...old,
          [key]: {
            default: value[0],
            options: value,
            format: "array",
          },
        };
      case typeof value == "boolean":
        return {
          ...old,
          [key]: {
            default: value,
            format: "boolean",
          },
        };
      case typeof value == "string":
        return {
          ...old,
          [key]: {
            default: value,
            format: "string",
          },
        };
      default:
        console.warn(`Unsupported prop-format ${typeof value}`);
        return { ...old };
    }
  }, {});

export const generateState = (args: SandboxComponentArgs) => {
  const { props } = args;

  if (!props) {
    console.warn("Missing props for sandbox");
    return null;
  }

  return parseProps(props);
};
