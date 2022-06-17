import { LayoutPicker, PagePropsContext } from "@/components";
import { mockBlogg } from "@/mockdata";

export default {
  title: "Layouts/AkselBlogg",
  component: LayoutPicker,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = (props: any) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <LayoutPicker
        title="Aksel"
        data={{ ...mockBlogg, _type: "aksel_blogg" } as any}
      />
    </PagePropsContext.Provider>
  );
};

Default.args = {
  page: mockBlogg,
  slug: "/blogg/ny-forside-pa-navno",
};
