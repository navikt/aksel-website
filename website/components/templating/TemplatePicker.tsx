import React, { useEffect, useState } from "react";
import Error from "next/error";
import ComponentPageTemplate from "./pages/ComponentPageTemplate";
import ActiclePageTemplate from "./pages/ArticlePageTemplate";
import TabbedActiclePageTemplate from "./pages/TabbedArticlePageTemplate";

const templates = {
  ds_component_page: (props) => <ComponentPageTemplate {...props} />,
  ds_article_page: (props) => <ActiclePageTemplate {...props} />,
  ds_tabbed_article_page: (props) => <TabbedActiclePageTemplate {...props} />,
};

const TemplatePicker = ({ data, sidebar }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!Object.keys(templates).includes(data._type)) {
    console.warn(
      `${data._type} does not have  a valid template to use, please create one.`
    );
    return (
      <Error
        statusCode={404}
        title={`This page could not be found. Sanity-side mangler template, kontakt utvikler`}
      />
    );
  }

  const Template = templates[data._type];

  return <Template data={data} sidebar={sidebar} />;
};

export default TemplatePicker;
