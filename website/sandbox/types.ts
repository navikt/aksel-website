export interface SandboxComponentProps {
  [key: string]: string | string[] | boolean;
}

export interface SandboxComponentArgs {
  props: SandboxComponentProps;
  variants?: string[];
}

export interface SandboxComponent {
  (props: any, variant?: string): string;
  args: SandboxComponentArgs;
}
