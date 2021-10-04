export type ChangelogT = {
  _id: string;
  title: string;
  change_date: Date;
  dependents: "spesific" | "all";
  body: any;
  pull_request?: string;
  spesific_component?: { _ref: string }[];
};
