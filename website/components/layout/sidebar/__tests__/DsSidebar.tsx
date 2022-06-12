/**
 * @jest-environment jsdom
 */
import { mockArtikkel, mockNav } from "@/mockdata";
import { getActiveHeading, PagePropsContext } from "@/utils";
import { render, screen } from "@testing-library/react";
import DesignsystemSidebar from "../DesignsystemSidebar";

const renderComponent = () => {
  return render(
    <PagePropsContext.Provider
      value={{
        pageProps: {
          page: mockArtikkel,
          navigation: mockNav,
          activeHeading: getActiveHeading(
            mockNav,
            "designsystem/side/oversikt-guider"
          ),
        },
      }}
    >
      <DesignsystemSidebar />
    </PagePropsContext.Provider>
  );
};

const renderComponent2 = () => {
  return render(<div data-testid="mytestid">abc</div>);
};

describe("Home", () => {
  it("renders a heading", () => {
    const { container } = renderComponent();
    const sidebar = screen.getByTestId("ds-sidebar");
    /* const { container } = renderComponent2();
    const sidebar = screen.getByTestId("mytestid"); */

    expect(sidebar).toBeInTheDocument();
  });
});
