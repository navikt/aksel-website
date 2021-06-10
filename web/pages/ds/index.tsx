/* Frontpage */

import FrontPage from "../../components/frontpage/FrontPage";
import { fetchDsFrontpage, SanityFrontpage } from "../../sanity-types";

const Page = ({ frontpage }) => <FrontPage {...frontpage} />;

interface StaticProps {
  props: {
    frontpage: SanityFrontpage;
  };
  revalidate: number;
}

export const getStaticProps = async (): Promise<StaticProps> => {
  const frontpage = await fetchDsFrontpage();
  return {
    props: { frontpage },
    revalidate: 60,
  };
};

export default Page;
