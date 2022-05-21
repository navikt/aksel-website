import {
  SandboxComponentArgs,
  SandboxComponentProps,
} from "../../../../stories/sandbox/types";

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

export interface ParsedArgsT {
  props: ParsedPropsT;
  background?: string;
}

export interface StateT {
  props: {
    [key: string]: string | boolean;
  };
}

export const getInitialState = (args: ParsedArgsT): StateT => ({
  props: args?.props
    ? Object.entries(args.props).reduce(
        (old, [key, value]) => ({ ...old, [key]: value.default }),
        {}
      )
    : null,
});

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

export const generateState = (args: SandboxComponentArgs): ParsedArgsT => {
  if (!args || !args?.props) {
    return null;
  }

  return {
    ...args,
    props: parseProps(args.props),
  };
};
