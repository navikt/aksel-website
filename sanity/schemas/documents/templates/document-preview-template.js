export function defaultPreview() {
  return {
    preview: {
      select: {
        title: "heading",
        status: "status",
      },
      prepare(selection) {
        const { title, status } = selection;
        return {
          title: title,
          subtitle: status,
        };
      },
    },
  };
}
