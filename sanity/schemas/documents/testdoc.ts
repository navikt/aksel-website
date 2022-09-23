import { defineType, defineField } from "sanity";
import { SlugInput } from "../../components/slug-input";

export default defineType({
  name: "test",
  type: "document",
  title: "Test",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "url",
      type: "slug",
      title: "URL",
      components: {
        input: SlugInput,
      },
    }),
  ],
});
