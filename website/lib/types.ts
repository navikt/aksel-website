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
