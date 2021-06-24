import React from "react";
import { WebPreviewWrapper } from "./WebPreviewWrapper";

export const ComponentPageWebPreview = (ctx: any) => {
  const slug = ctx.document.displayed?.slug.current;

  if (!slug) {
    return <div>Side må ha en tittel før den kan forhåndsvises...</div>;
  }
  const webUrl = "https://verktoykasse-prototype-kenajoh.vercel.app";
  const previewUrl = `/${slug}?preview=true`;
  const url =
    process.env.NODE_ENV === "production"
      ? webUrl + previewUrl
      : `http://localhost:3000${previewUrl}`;

  return <WebPreviewWrapper url={url} />;
};
