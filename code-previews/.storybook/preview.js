export const parameters = {
  options: {
    storySort: (a, b) => {
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: (
    Story,
    {
      id,
      kind,
      name,
      story,
      parameters,
      hooks,
      args,
      argTypes,
      globals,
      viewMode,
      loaded,
    }
  ) => {
    console.log("test");
  },
};
