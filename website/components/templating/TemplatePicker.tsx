import React, { useEffect } from "react";
import ComponentPageTemplate from "./pages/ComponentPageTemplate";

const templates = {
  ds_component_page: (props) => <ComponentPageTemplate {...props} />,
};

const TemplatePicker = ({ data }) => {
  /* console.log(data); */
  if (!Object.keys(templates).includes(data._type)) {
    console.warn(
      `${data._type} does not have  a valid template to use, please create one.`
    );
    return null;
  }

  const Template = templates[data._type];

  return <Template data={data} />;
};

export default TemplatePicker;
