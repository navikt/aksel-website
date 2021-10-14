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
