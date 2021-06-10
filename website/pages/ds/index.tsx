/* Frontpage */

import FrontPage from "../../components/frontpage/FrontPage";
import { getClient } from "../../lib/sanity.server";

const Page = ({ frontpage }) => <FrontPage {...frontpage} />;

interface StaticProps {
  props: {
    frontpage;
    preview: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({ preview = false }): Promise<StaticProps> => {
  const frontpage = await getClient(preview).fetch(query);
  return {
    props: { frontpage, preview },
    revalidate: 60,
  };
};

const query = `*[_type == "frontpage"][0]
  {
      "id": _id,
      title,
      headline,
      panels[]{
        title,
        content,
        "slug": pagereference->slug.current
      }
  }`;

export default Page;
