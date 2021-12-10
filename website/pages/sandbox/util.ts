export interface SandboxComponent {
  (props: any, variant: string): string;
  args: {
    props: {
      [key: string]: string | string[] | boolean;
    };
    variants?: string[];
  };
}
