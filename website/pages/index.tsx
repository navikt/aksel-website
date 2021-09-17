/* Frontpage */

import { Heading } from "@navikt/ds-react";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PreviewBanner from "../components/PreviewBanner";
import { getClient } from "../lib/sanity.server";
import { usePreviewSubscription } from "../lib/santiy";
import { PagePropsContext } from "./_app";

const Page = (props: { frontpage: any; preview: boolean }): JSX.Element => {
  const router = useRouter();
  const enabledPreview = props.preview || !!router.query.preview;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPageData] = useContext(PagePropsContext);

  const { data: pagedata } = usePreviewSubscription(query, {
    initialData: props.frontpage,
    enabled: enabledPreview,
  });

  useEffect(() => {
    setPageData({ ...props, page: pagedata });
  }, [pagedata]);

  return (
    <>
      {enabledPreview && <PreviewBanner slug="Forside" />}
      <div>
        <Heading level="1" size="xlarge">
          Forside
        </Heading>
        <Link passHref href={"/storybook/index.html"}>
          <a>Storybook for kode-eksempler</a>
        </Link>
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
}: {
  preview?: boolean;
}): Promise<StaticProps> => {
  const frontpage = await getClient(preview).fetch(query);
  return {
    props: { frontpage, preview },
    revalidate: 60,
  };
};

const query = `*[]{ _type, 'slug': slug.current }`;

export default Page;
