export type DsNavigationHeadingMenuT = {
  title: string;
  link: { _id: string; slug: { current: string }; tags?: string[] };
};

export type DsNavigationHeadingT = {
  _key: string;
  title: string;
  link_ref: { _id: string; slug: { current: string } };
  menu?: DsNavigationHeadingMenuT[];
};

export type DsNavigationT = {
  headings?: DsNavigationHeadingT[];
};

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
    asset: any;
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

export type AlertT = {
  variant: "success" | "info" | "warning" | "error";
  size: "medium" | "small";
  heading?: string;
  heading_level: "h2" | "h3" | "h4";
  body: any;
};
