/* Frontpage */

import { Heading, Link } from "@navikt/ds-react";
import { useContext, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PreviewBanner from "../components/PreviewBanner";
import { getClient } from "../lib/sanity.server";
import { usePreviewSubscription } from "../lib/santiy";
import { PagePropsContext } from "./_app";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  li {
    list-style: none;
  }
`;

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
      {enabledPreview && <PreviewBanner />}
      <StyledDiv>
        <Heading level="1" size="xlarge">
          Forside
        </Heading>
        <NextLink passHref href={"/storybook/index.html"}>
          <Link target="_blank">Storybook for kode-eksempler</Link>
        </NextLink>
        <div>
          {pagedata.map((page) => {
            if (
              [
                "ds_component_page",
                "ds_article_page",
                "ds_tabbed_article_page",
                "gp_article_page",
              ].includes(page._type)
            ) {
              return (
                <li key={page.slug}>
                  <NextLink passHref href={page.slug + "?preview=true"}>
                    <Link target="_blank">{"/" + page.slug}</Link>
                  </NextLink>
                </li>
              );
            }
            return null;
          })}
        </div>
      </StyledDiv>
    </>
  );
};

interface StaticProps {
  props: {
    frontpage: any;
    preview: boolean;
    slug: string;
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
    props: { frontpage, preview, slug: "/" },
    revalidate: 60,
  };
};

const query = `*[]{...,'slug': slug.current }`;

export default Page;
