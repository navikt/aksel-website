import React, { useEffect, useState } from "react";
import Error from "next/error";
import ComponentPageTemplate from "./pages/ComponentPageTemplate";
import ActiclePageTemplate from "./pages/ArticlePageTemplate";
import TabbedActiclePageTemplate from "./pages/TabbedArticlePageTemplate";
import { ChangelogT } from "../../lib";

const templates = {
  ds_component_page: (props: any) => <ComponentPageTemplate {...props} />,
  ds_article_page: (props: any) => <ActiclePageTemplate {...props} />,
  ds_tabbed_article_page: (props: any) => (
    <TabbedActiclePageTemplate {...props} />
  ),
  gp_article_page: (props: any) => <ActiclePageTemplate {...props} />,
};

const TemplatePicker = ({
  data,
  changelogs,
}: {
  data: any;
  changelogs?: ChangelogT[];
}): JSX.Element => {
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

  return <Template data={data} changelogs={changelogs} />;
};

export default TemplatePicker;
