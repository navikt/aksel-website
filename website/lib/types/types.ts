import type { SanityKeyed } from "sanity-codegen";
import { DsChangelog } from "..";
import { BgColors } from "../../stories/sandbox/types";

export type LayoutContextProps = {
  activeHeading?: DsNavigationHeadingT;
};

export type PagePropsContextT = {
  pageProps: any;
};

export type SectionContextT = {
  withinSection: boolean;
};

/* Query changes internal_link type  */
export interface RelatedLinkT {
  _type: "link";
  title?: string;
  description?: string;
  internal?: boolean;
  internal_link?: string;
  external_link?: string;
  category_ref?: any;
  tags?: "default" | "main_categories";
}

export type DsNavigationHeadingMenuT = {
  title: string;
  _type: "subheading" | "item";
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
};

export interface ExampleComponent extends React.FC {
  react: string;
  html?: string | null;
  bg?: BgColors;
}

export interface ChangelogT extends Omit<DsChangelog, "packages"> {
  packages: {
    version: string;
    pack: { title: string; scope: string };
    _key: string;
  }[];
}

export type ChangelogListT = {
  title: string;
  _key: string;
  logs: ChangelogT[];
};
