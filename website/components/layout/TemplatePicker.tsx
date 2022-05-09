import Error from "next/error";
import React from "react";
import {
  AkselArtikkel,
  AkselBlogg,
  DsArtikkel,
  DsComponentPage,
  KomponentArtikkel,
} from "@/lib";
import AkselArtikkelTemplate from "./page-templates/AkselArtikkel";
import ArtikkelTemplate from "./page-templates/Artikkel";
import ArtikkelTabbedTemplate from "./page-templates/ArtikkelTabbed";
import ComponentPageTemplate from "./page-templates/ComponentPageTemplate";
import KomponentArtikkelTemplate from "./page-templates/KomponentArtikkel";

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

type ds_artikkel = {
  ds_artikkel: (props: { data: DsArtikkel; title: string }) => JSX.Element;
};

type aksel_artikkel = {
  aksel_artikkel: (props: {
    data: AkselArtikkel;
    title: string;
  }) => JSX.Element;
};

type aksel_blogg = {
  aksel_blogg: (props: { data: AkselBlogg; title: string }) => JSX.Element;
};

type templateT =
  | ds_component
  | komponent_artikkel
  | ds_artikkel
  | aksel_artikkel
  | aksel_blogg;

const templates: templateT = {
  komponent_artikkel: (props) => <KomponentArtikkelTemplate {...props} />,
  ds_component_page: (props) => <ComponentPageTemplate {...props} />,
  ds_artikkel: (props) =>
    props.data.artikkel_type ? (
      <ArtikkelTabbedTemplate {...props} />
    ) : (
      <ArtikkelTemplate {...props} />
    ),
  aksel_artikkel: (props) => <AkselArtikkelTemplate {...props} />,
  aksel_blogg: (props) => <AkselArtikkelTemplate {...props} />,
};

const TemplatePicker = ({
  data,
  title,
}: {
  data: DsComponentPage | KomponentArtikkel | AkselArtikkel | AkselBlogg;
  title: string;
}): JSX.Element => {
  if (!Object.keys(templates).includes(data?._type)) {
    console.warn(
      `${data?._type} does not have a valid template to use, please create one.`
    );

    return (
      <Error
        statusCode={404}
        title={`Sanity-side mangler template, kontakt utvikler`}
      />
    );
  }

  const Template = templates[data?._type];

  return <Template data={data} title={title} />;
};

export default TemplatePicker;
