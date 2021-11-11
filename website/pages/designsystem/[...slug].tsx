import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Feedback, LayoutPicker, PreviewBanner } from "../../components";
import DesignsystemFooter from "../../components/layout/footer/DesignsystemFooter";
import DesignsystemHeader from "../../components/layout/header/DesignsystemHeader";
import LayoutProvider from "../../components/layout/LayoutProvider";
import DesignsystemSidebar from "../../components/layout/sidebar/DesignsystemSidebar";
import {
  changelogQuery,
  dsDocumentBySlug,
  isDraftQuery,
  dsNavigationQuery,
  getClient,
  getDsPaths,
  usePreviewSubscription,
} from "../../lib";
import {
  DsArticlePage,
  DsChangelog,
  DsComponentPage,
  DsNavigation,
  DsTabbedArticlePage,
} from "../../lib/autogen-types";
import { PagePropsContext } from "../_app";

const Page = (props: {
  slug?: string;
  page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
  navigation: DsNavigation;
  changelogs?: DsChangelog[];
}): JSX.Element => {
  const router = useRouter();

  const { pageProps, setPageData } = useContext(PagePropsContext);

  const [isPreview, setIsPreview] = useState(false);

  const { data } = usePreviewSubscription(dsDocumentBySlug, {
    params: { slug: "designsystem/" + props.slug },
    initialData: props.page,
    enabled: isPreview,
  });

  const { data: changelogs } = usePreviewSubscription(changelogQuery, {
    initialData: props.changelogs,
    enabled: isPreview,
  });

  const { data: nav } = usePreviewSubscription(dsNavigationQuery, {
    initialData: props.navigation,
    enabled: isPreview,
  });

  useEffect(() => {
    nav && setPageData({ ...props, ...pageProps, navigation: nav });
  }, [nav]);

  useEffect(() => {
    data &&
      setPageData({
        ...props,
        ...pageProps,
        page: data,
      });
  }, [data]);

  useEffect(() => {
    setIsPreview(!!router.query.preview);
  }, [router.query]);

  return (
    <>
      {isPreview && <PreviewBanner />}
      <>
        <LayoutPicker
          title="Designsystemet"
          data={data}
          changelogs={changelogs}
        />
        <ScGrow />
        <Feedback docId={pageProps?.page?._id} />
        {/* {LayoutParts[pageType]?.title === "Designsystemet" && (
              <RelatedPagesLink />
            )} */}
      </>
    </>
  );
};

const ScWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - var(--header-height));
  background-color: #ffffff;

  p {
    max-width: var(--text-max-width);
  }
`;

const ScContentWrapper = styled.div`
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const ScMain = styled.main`
  min-height: calc(100vh - var(--header-height));
  width: calc(100vw - var(--sidebar-max-width));
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }

  :focus {
    outline: none;
  }
`;

const ScGrow = styled.div`
  flex: 1 1;
  height: 100%;
  margin-bottom: auto;
`;

export const ScSkipLink = styled.a`
  background: var(--navds-color-deepblue-80);
  color: white;
  left: 0;
  padding: 1rem;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.1s;
  text-decoration: none;
  z-index: 1;

  :focus-within {
    transform: translateY(0%);
    outline: none;
    box-shadow: inset 0 0 0 2px white;
  }
`;

Page.getLayout = (page) => {
  return (
    <>
      <ScSkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </ScSkipLink>
      {/* <DesignsystemHeader /> */}
      <ScWrapper>
        <DesignsystemSidebar />
        <ScContentWrapper>
          <ScMain tabIndex={-1} id="hovedinnhold">
            {page}
          </ScMain>
          <DesignsystemFooter />
        </ScContentWrapper>
      </ScWrapper>
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  const paths = await getDsPaths().then((paths) =>
    paths.map((slug) => ({
      params: {
        slug,
      },
    }))
  );

  return {
    paths,
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
    slug: string;
    changelogs: DsChangelog[] | null;
    navigation: DsNavigation;
    isDraft: boolean;
    validPath: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}): Promise<StaticProps | { notFound: true }> => {
  /* Hack: Build slug: ["designsystem", "side", "button"], dev slug: ["side", "button"] */
  const joinedSlug = slug
    .filter((x) => x !== "designsystem")
    .slice(0, 2)
    .join("/");

  const client = getClient(false);
  const page = await client.fetch(dsDocumentBySlug, {
    slug: "designsystem/" + joinedSlug,
  });

  const changelogs =
    page?._type === "ds_component_page"
      ? await client.fetch(changelogQuery)
      : null;

  const navigation = await client.fetch(dsNavigationQuery);

  const isDraft = await client.fetch(isDraftQuery, {
    slug: "designsystem/" + joinedSlug,
  });

  const validPath = await getDsPaths().then((paths) =>
    paths
      .map((slugs) => slugs.filter((slug) => slug !== "designsystem").join("/"))
      .includes(slug.filter((x) => x !== "designsystem").join("/"))
  );

  return {
    props: {
      page,
      slug: joinedSlug,
      navigation,
      changelogs,
      isDraft: isDraft.length === 0,
      validPath,
    },
    revalidate: 30,
  };
};

export default Page;
