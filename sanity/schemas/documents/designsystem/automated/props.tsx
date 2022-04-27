/* import { ExampleKeys } from "website/component-examples"; */

export default {
  title: "Autogenerert Propdata",
  name: "ds_props",
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
    },
    {
      title: "Displayname",
      name: "displayname",
      type: "string",
    },
    {
      title: "Filepath",
      name: "filepath",
      type: "string",
    },
    {
      title: "props",
      name: "proplist",
      type: "array",
      of: [
        {
          title: "Prop",
          name: "prop",
          type: "object",
          fields: [
            {
              title: "Name",
              name: "name",
              type: "string",
            },
            {
              title: "DefaultValue",
              name: "defaultValue",
              type: "string",
            },
            {
              title: "Name",
              name: "name",
              type: "string",
            },
            {
              title: "Description",
              name: "description",
              type: "string",
            },
            {
              title: "Required",
              name: "required",
              type: "boolean",
            },
            {
              title: "Type",
              name: "type",
              type: "string",
            },
            {
              title: "isRef",
              name: "ref",
              type: "boolean",
            },
          ],
        },
      ],
    },
  ],
};
