/* Frontpage */

import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { usePreviewSubscription } from "../lib/santiy";
import { getClient } from "../lib/sanity.server";
import PreviewBanner from "../components/PreviewBanner";

import FrontPage from "../components/pages/FrontPage";

const Page = ({ frontpage, preview }) => {
  const router = useRouter();
  const enabledPreview = preview || router.query.preview;

  if (!!router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }

  const { data: pagedata } = usePreviewSubscription(query, {
    initialData: frontpage,
    enabled: enabledPreview,
  });

  return (
    <>
      {enabledPreview && <PreviewBanner slug="Forside" />}
      <FrontPage {...pagedata} />
    </>
  );
};

interface StaticProps {
  props: {
    frontpage;
    preview: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  preview = false,
}): Promise<StaticProps> => {
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
