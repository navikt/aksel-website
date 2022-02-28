export enum BgColors {
  "WHITE" = "--navds-semantic-color-canvas-background-light",
  "DEFAULT" = "--navds-global-color-gray-50",
  "GRADIENT" = "linear-gradient(-45deg, var(--navds-global-color-gray-100) 0%, white 100%)",
  "INVERTED" = "--navds-global-color-gray-900",
  "INVERTEDGRADIENT" = "linear-gradient(-45deg, var(--navds-global-color-gray-900) 0%, var(--navds-global-color-gray-800) 100%)",
}

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

export interface SandboxComponent {
  (props?: any, variant?: string): string | { comp: string; bg: BgColors };
  args?: SandboxComponentArgs;
}
