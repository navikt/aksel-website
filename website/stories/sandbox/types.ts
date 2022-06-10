import React from "react";
import { BgColors } from "../../lib/types/types";

export const getBgColors = (bg?: BgColors) => {
  if (!bg)
    return {
      backgroundImage: "none",
      backgroundColor: `var(${BgColors.DEFAULT})`,
    };
  if (bg.startsWith("linear-gradient")) {
    return { backgroundImage: bg, backgroundColor: "white" };
  } else if (bg.startsWith("--")) {
    return { backgroundImage: "none", backgroundColor: `var(${bg})` };
  } else {
    return { backgroundImage: "none", backgroundColor: bg };
  }
};

export interface SandboxComponentProps {
  [key: string]: string | string[] | boolean;
}

export interface SandboxComponentArgs {
  props?: SandboxComponentProps;
  background?: BgColors;
}

export interface ExampleComponent extends React.FC {
  react: string;
  html?: string | null;
  bg?: BgColors;
}

export interface SandboxComponentT extends React.VFC {
  args?: SandboxComponentArgs;
  getBg?: (props: any) => BgColors;
  getCode?: (props: any) => string;
}
