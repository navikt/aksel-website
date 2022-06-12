import { getActiveHeading, LayoutPicker } from "@/components";
import { DsHeader, DsSidebar, Footer } from "@/layout";
import { mockArtikkel, mockNav } from "@/mockdata";
import { PagePropsContext } from "@/utils";

export default {
  title: "Layouts/DsArtikkel",
  component: LayoutPicker,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = (props) => {
  return (
    <PagePropsContext.Provider value={{ pageProps: props }}>
      <DsHeader />
      <div className="flex w-full flex-col items-center bg-canvas-background-light">
        <div className="flex w-full max-w-screen-2xl">
          <DsSidebar />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="relative min-h-screen-header w-full focus:outline-none md:max-w-screen-sidebar"
            >
              <LayoutPicker
                title="Designsystemet"
                data={
                  {
                    ...mockArtikkel,
                    _type: "ds_artikkel",
                    slug: "designsystem/side/oversikt-guider",
                  } as any
                }
              />
              <div className="mt-auto" aria-hidden />
            </main>
          </div>
        </div>
        <Footer variant="ds" />
      </div>
    </PagePropsContext.Provider>
  );
};

Default.args = {
  page: mockArtikkel,
  navigation: mockNav,
  activeHeading: getActiveHeading(mockNav, "designsystem/side/oversikt-guider"),
  slug: "designsystem/side/oversikt-guider",
};
