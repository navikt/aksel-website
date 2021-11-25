/* https://github.com/navikt/sosialhjelp-veiviser-ny/blob/291bdd743fc73ecb86f6de701abfa3c0bc64f7f6/pages/sitemap.xml.ts */

import React from "react";
import { getDsPaths } from "../lib";

const generateSitemap = (pages: string[]): string =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((slug) => {
            return `
                    <url>
                        <loc>${`https://verktoykassen.vercel.app/${slug}`}</loc>
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;

class Sitemap extends React.Component {
  static getInitialProps = async ({ res }) => {
    // List of posts
    const pages = await getDsPaths().then((paths) =>
      paths.map((slugs) => slugs.join("/"))
    );

    res.setHeader("Content-Type", "text/xml");
    res.write(generateSitemap(pages));
    res.end();
  };
}

export default Sitemap;
