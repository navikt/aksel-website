/* Frontpage */

import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { usePreviewSubscription } from "../lib/santiy";
import { getClient } from "../lib/sanity.server";
import PreviewBanner from "../components/PreviewBanner";

import FrontPage from "../components/pages/FrontPage";
import { Title } from "@navikt/ds-react";
import Link from "next/link";

const Page = ({ frontpage, preview }) => {
  const router = useRouter();
  const enabledPreview = preview || router.query.preview;

  if (router.isFallback) {
    return <ErrorPage statusCode={404} />;
  }

  const { data: pagedata } = usePreviewSubscription(query, {
    initialData: frontpage,
    enabled: enabledPreview,
  });

  return (
    <>
      {enabledPreview && <PreviewBanner slug="Forside" />}
      <div>
        <Title level={1} size="xl">
          Forside
        </Title>
        {pagedata.map((page) => {
          if (page._type === "ds_component_page") {
            return (
              <li key={page.slug}>
                <Link
                  passHref
                  href={
                    enabledPreview ? page.slug + "?preview=true" : page.slug
                  }
                >
                  <a>{"/" + page.slug}</a>
                </Link>
              </li>
            );
          }
          return null;
        })}
      </div>
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

const query = `*[]{ _type, 'slug': slug.current }`;

export default Page;
