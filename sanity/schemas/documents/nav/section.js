// navigationSection.js

/* const getNChildren = (children) => {
  let x = 0;
  if (!children || children.length === 0) {
    return 0;
  }
  console.log(children);
  children.map((child) => {
    x += getNChildren(child.children);
  });
  return x;
};

const getNestedChildren = (children) => {
  if (!children) {
    return 0;
  }
  return getNChildren(children);
  console.log(getNChildren(children));
}; */

export default {
  name: "navigation.section",
  type: "object",
  title: "Section",
  preview: {
    select: {
      title: "title",
      targetTitle: "target.title",
      childs: "links",
    },
    prepare: ({ title, targetTitle, childs }) => {
      return {
        title: title || targetTitle,
        subtitle: childs ? `Nested w  ${childs.length} links` : "Direct link",
      };
    },
  },
  fields: [
    {
      type: "reference",
      name: "target",
      title: "Lenke",
      to: [{ type: "ds_page" }],
      // _weak: true // enable if you don't want reference integrity checks
    },
    {
      type: "string",
      name: "title",
      title: "Tittel",
    },
    {
      type: "array",
      name: "links",
      title: "Undertittler (overskriver Lenke hvis satt)",
      of: [{ type: "navigation.link" }],
    },
  ],
};
