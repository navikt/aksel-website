import type { SanityKeyed } from "sanity-codegen";
import { BgColors } from "../sandbox/types";

/* Query changes internal_link type  */
export interface RelatedLinkT {
  _type: "link";
  title?: string;
  description?: string;
  internal?: boolean;
  internal_link?: string;
  external_link?: string;
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

export type FoundOnPageFeedbackT = {
  answer: boolean;
  message: string;
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
