import React from "react";

export default {
  name: "figma_embed",
  title: "Figma embed",
  type: "object",
  fields: [
    {
      title: "Embed lenke",
      name: "embed",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      embed: "embed",
    },
    prepare(selection) {
      return { ...selection };
    },
    component: (selection) => {
      const src = selection.value.embed?.match(/src="(.+?)"/);

      return src && src[1] ? (
        <iframe
          style={{ border: "1px solid rgba(0, 0, 0, 0.1" }}
          src={src[1]}
          height="300"
          width="100%"
        />
      ) : (
        <span>Lenken funger ikke</span>
      );
    },
  },
};
