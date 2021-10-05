export type ChangelogT = {
  _id: string;
  title: string;
  change_date: Date;
  dependents: "spesific" | "all";
  body: any;
  pull_request?: string;
  spesific_component?: { _ref: string }[];
};

export type CodeTabT = {
  title: string;
  example: {
    code: string;
    language: string;
  };
};

export type CodeExampleT = {
  title: string;
  preview?: string;
  infercode: boolean;
  tabs?: CodeTabT[];
  github: string;
};

export type CodeSnippetType = {
  node: {
    code: {
      code: string;
      language: string;
    };
  };
};

export type DoDontBlockType = {
  fullwidth: boolean;
  picture: any;
  alt: string;
  body?: any;
  variant: string;
  _key: string;
};

export type DodontType = {
  node: {
    blocks: DoDontBlockType[];
  };
};

export type FigmaType = {
  node: {
    embed: string;
  };
};

export type ImageType = {
  node: {
    title: string;
    caption?: string;
  };
};

export type PropType = {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  default?: string;
};

export type PropTableType = {
  props: PropType[];
};

export type UuInteractionType = {
  node: {
    focus?: any;
    mouse?: any;
    keyboard?: { command: any; description: any; _key: string }[];
    screen_reader?: any;
  };
};
