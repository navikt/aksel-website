export enum BgColors {
  "WHITE" = "--navds-semantic-color-canvas-background-light",
  "DEFAULT" = "--navds-semantic-color-canvas-background",
  "INVERTED" = "--navds-semantic-color-canvas-background-inverted",
}

export interface SandboxComponentProps {
  [key: string]: string | string[] | boolean;
}

export interface SandboxComponentArgs {
  props?: SandboxComponentProps;
  background?: BgColors;
}

export interface SandboxComponent {
  (props?: any, variant?: string): string;
  args?: SandboxComponentArgs;
}
