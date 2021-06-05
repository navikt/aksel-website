/* Frontpage */

import FrontPage from "../components/frontpage/FrontPage";
import { fetchFrontpagePanels, SanityFrontpagePanels } from "../sanity-types";

const Page = (props) => <FrontPage {...props} />;

interface StaticProps {
  props: {
    panels: SanityFrontpagePanels[];
  };
  revalidate: number;
}

export const getStaticProps = async (): Promise<StaticProps> => {
  const panels = await fetchFrontpagePanels();
  return {
    props: { panels },
    revalidate: 60,
  };
};

export default Page;
