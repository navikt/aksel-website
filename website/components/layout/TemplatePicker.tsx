import Error from "next/error";
import React, { useEffect, useState } from "react";
import {
  DsArticlePage,
  DsArtikkel,
  DsComponentPage,
  GpArticlePage,
  KomponentArtikkel,
} from "../../lib";
import ArticleTemplate from "./page-templates/ArticlePageTemplate";
import ArtikkelTemplate from "./page-templates/Artikkel";
import ArtikkelTabbedTemplate from "./page-templates/ArtikkelTabbed";
import ComponentPageTemplate from "./page-templates/ComponentPageTemplate";
import KomponentArtikkelTemplate from "./page-templates/KomponentArtikkel";
import TabbedArticleTemplate from "./page-templates/TabbedArticlePageTemplate";

type komponent_artikkel = {
  komponent_artikkel: (props: {
    data: KomponentArtikkel;
    title: string;
  }) => JSX.Element;
};

type ds_component = {
  ds_component_page: (props: {
    data: DsComponentPage;
    title: string;
  }) => JSX.Element;
};

type ds_article = {
  ds_article_page: (props: {
    data: DsArticlePage;
    title: string;
  }) => JSX.Element;
};

type ds_artikkel = {
  ds_artikkel: (props: { data: DsArtikkel; title: string }) => JSX.Element;
};

type gp_article = {
  gp_article_page: (props: {
    data: DsArticlePage;
    title: string;
  }) => JSX.Element;
};

type templateT =
  | ds_component
  | ds_article
  | gp_article
  | komponent_artikkel
  | ds_artikkel;

const templates: templateT = {
  komponent_artikkel: (props) => <KomponentArtikkelTemplate {...props} />,
  ds_component_page: (props) => <ComponentPageTemplate {...props} />,
  ds_article_page: (props) =>
    props.data.article_type ? (
      <TabbedArticleTemplate {...props} />
    ) : (
      <ArticleTemplate {...props} />
    ),
  ds_artikkel: (props) =>
    props.data.artikkel_type ? (
      <ArtikkelTabbedTemplate {...props} />
    ) : (
      <ArtikkelTemplate {...props} />
    ),
  gp_article_page: (props) => <ArticleTemplate {...props} />,
};

const TemplatePicker = ({
  data,
  title,
}: {
  data: DsComponentPage | DsArticlePage | GpArticlePage | KomponentArtikkel;
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
        title={`Sanity-side mangler template, kontakt utvikler`}
      />
    );
  }

  const Template = templates[data._type];

  return <Template data={data} title={title} />;
};

export default TemplatePicker;
