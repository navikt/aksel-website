import type { SanityKeyed } from "sanity-codegen";

export enum BgColors {
  "WHITE" = "--navds-semantic-color-canvas-background-light",
  "DEFAULT" = "--navds-global-color-white",
  "GRADIENT" = "linear-gradient(-45deg, var(--navds-global-color-gray-100) 0%, white 100%)",
  "INVERTED" = "--navds-global-color-gray-900",
  "INVERTEDGRADIENT" = "linear-gradient(-45deg, var(--navds-global-color-gray-900) 0%, var(--navds-global-color-gray-800) 100%)",
}

export type PagePropsContextT = {
  pageProps: any;
};

export type SectionContextT = {
  withinSection: boolean;
};

export type DsNavigationHeadingMenuT = {
  title: string;
  _type: "subheading" | "item";
  _key: string;
  link: { _id: string; slug: { current: string }; tags?: string[] };
};

export type DsFrontPageCardT = SanityKeyed<{
  _type: "card";
  link_ref?: {
    _id: string;
    slug: string;
  };
  title?: string;
  content?: string;
  picture?: {
    asset: any;
    crop?: any;
    hotspot?: any;
    title?: string;
  };
}>;

export type DsNavigationHeadingT = {
  _key: string;
  title: string;
  link_ref: { _id: string; slug: { current: string } };
  menu?: DsNavigationHeadingMenuT[];
};

export enum HelpfulArticleEnum {
  "JA" = "ja",
  "DELVIS" = "delvis",
  "NEI" = "nei",
  "MISC" = "misc",
}

export type HelpfulArticleT = {
  answer: HelpfulArticleEnum;
  message?: string;
  url: string;
  docId: string;
  docType: string;
};

export type DsFeddbackMsgT = {
  message: string;
  user?: string;
  url: string;
};

export interface ExampleComponent extends React.FC {
  react: string;
  html?: string | null;
  bg?: BgColors;
}
