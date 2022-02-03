import IntroPage from "../../components/intro-page";

export default {
  title: "Velkommen!",
  name: "introduction",
  type: "document",
  fields: [
    {
      title: "Navn",
      name: "title",
      type: "string",
      initialValue: "Velkommen!",
      hidden: true,
    },
    {
      name: "view",
      type: "string",
      title: "Intro",
      inputComponent: IntroPage,
    },
  ],
};
