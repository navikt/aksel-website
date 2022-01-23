import React, { useEffect, useState } from "react";
import Error from "next/error";
import ComponentPageTemplate from "./page-templates/ComponentPageTemplate";
import ArticleTemplate from "./page-templates/ArticlePageTemplate";
import TabbedArticleTemplate from "./page-templates/TabbedArticlePageTemplate";
import {
  DsArticlePage,
  DsComponentPage,
  DsTabbedArticlePage,
  GpArticlePage,
} from "../../lib";

type ds_component = {
  ds_component_page: (props: {
    data: DsComponentPage;
    title: string;
  }) => JSX.Element;
};

type ds_tabbed = {
  ds_tabbed_article_page: (props: {
    data: DsTabbedArticlePage;
    title: string;
  }) => JSX.Element;
};

type ds_article = {
  ds_article_page: (props: {
    data: DsArticlePage;
    title: string;
  }) => JSX.Element;
};

type gp_article = {
  gp_article_page: (props: {
    data: DsArticlePage;
    title: string;
  }) => JSX.Element;
};

type templateT = ds_component | ds_tabbed | ds_article | gp_article;

const templates: templateT = {
  ds_component_page: (props) => <ComponentPageTemplate {...props} />,
  ds_article_page: (props) => <ArticleTemplate {...props} />,
  ds_tabbed_article_page: (props) => <TabbedArticleTemplate {...props} />,
  gp_article_page: (props) => <ArticleTemplate {...props} />,
};

const TemplatePicker = ({
  data,
  title,
}: {
  data: DsComponentPage | DsTabbedArticlePage | DsArticlePage | GpArticlePage;
  title: string;
}): JSX.Element => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data) {
    return null;
  }

  if (!Object.keys(templates).includes(data._type)) {
    console.warn(
      `${data._type} does not have a valid template to use, please create one.`
    );

    return (
      <Error
        statusCode={404}
        title={`This page could not be found. Sanity-side mangler template, kontakt utvikler`}
      />
    );
  }

  const Template = templates[data._type];

  return <Template data={data} title={title} />;
};

export default TemplatePicker;
