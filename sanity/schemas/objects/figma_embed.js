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

/* <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FBlnZoAE1eVZswlCgzvFG79%2FVerkt%C3%B8ykasse-ia%3Fnode-id%3D0%253A1" allowfullscreen></iframe> */
