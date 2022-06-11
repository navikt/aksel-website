import { LayoutPicker, PagePropsContext } from "@/components";
import { mockArtikkel } from "./Mockdata";

export default {
  title: "Layouts/AkselArtikkel",
  component: LayoutPicker,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = (props: any) => {
  return (
    <PagePropsContext.Provider value={{ ...props?.props }}>
      <LayoutPicker
        title="Aksel"
        data={{ ...mockArtikkel, _type: "aksel_artikkel" } as any}
      />
    </PagePropsContext.Provider>
  );
};

Default.args = {
  props: {
    page: mockArtikkel,
    slug: "/artikkel/demoside",
  },
};
