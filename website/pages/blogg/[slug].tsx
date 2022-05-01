import { GetServerSideProps } from "next/types";
import React from "react";
import { isValidated } from "../../auth/auth";
import { LayoutPicker, PreviewBanner } from "../../components";
import { AkselBlogg, akselBloggBySlug, akselEditorById } from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

const Page = (props: {
  slug?: string;
  page: AkselBlogg;
  preview: boolean;
}): JSX.Element => {
  console.log(props);
  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="Aksel" data={props.page} />
    </>
  );
};

interface StaticProps {
  props: {
    page: AkselBlogg;
    slug: string;
    preview: boolean;
    vailidated: boolean;
  };
  notFound: boolean;
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<StaticProps | { notFound: true }> => {
  const isValidUser = await isValidated(context);

  const page = await getClient(context.preview).fetch(akselBloggBySlug, {
    slug: `blogg/${context.params.slug}`,
    valid: `${isValidUser}`,
  });

  const doc = page?.[0] ?? null;

  const editors = doc
    ? await getClient(true).fetch(akselEditorById, {
        id: doc._id,
      })
    : [];

  return {
    props: {
      page: { ...doc, ...editors },
      slug: context.params.slug as string,
      preview: context.preview ?? null,
      vailidated: isValidUser,
    },
    notFound: !doc,
  };
};

export default Page;
