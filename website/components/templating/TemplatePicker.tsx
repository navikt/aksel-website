import React, { useEffect, useState } from "react";
import ComponentPageTemplate from "./pages/ComponentPageTemplate";

const templates = {
  ds_component_page: (props) => <ComponentPageTemplate {...props} />,
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
    return null;
  }

  const Template = templates[data._type];

  return <Template data={data} sidebar={sidebar} />;
};

export default TemplatePicker;
