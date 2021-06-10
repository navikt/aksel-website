/* Frontpage */

import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { usePreviewSubscription, urlFor, PortableText } from "../lib/santiy";
import { getClient } from "../lib/sanity.server";

import FrontPage from "../components/frontpage/FrontPage";
import { fetchFrontpage, SanityFrontpage } from "../sanity-types";

const Page = ({ frontpage, preview }) => {
  const router = useRouter();
  console.log("fallback: " + router.isFallback);
  const enabledPreview = preview || router.query.preview;
  console.log("enabledPreview: " + enabledPreview);

  if (!!router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }
  const { data: pagedata } = usePreviewSubscription(query, {
    initialData: frontpage,
    enabled: enabledPreview,
  });

  return <FrontPage {...pagedata} />;
};

interface StaticProps {
  props: {
    frontpage: SanityFrontpage;
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
