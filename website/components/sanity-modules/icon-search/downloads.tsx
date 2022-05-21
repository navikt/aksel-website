import * as Icons from "@navikt/ds-icons";
import canvg from "canvg";
import fileDownload from "js-file-download";
import JSZip from "jszip";
import { renderToString } from "react-dom/server";

export const downloadSvg = (icon: string) => {
  const Icon = Icons[icon];
  const file = new Blob([renderToString(<Icon />)], { type: "text/plain" });
  fileDownload(file, `${icon}.svg`);
};

export const downloadPng = async (icon: string) => {
  const Icon = Icons[icon];
  const file = await generatePngZip(renderToString(<Icon />), icon);
  fileDownload(file, `${icon}-png.zip`);
};

export const generatePngZip = async (svgstring: string, name: string) => {
  const sizes = [16, 24, 128, 256];

  const zip = new JSZip();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  sizes.forEach((size) => {
    let svg = svgstring.replace(/width="[^"]*"/, `width="${size}px"`);
    svg = svg.replace(/height="[^"]*"/, `height="${size}px"`);

    const v = canvg.fromString(ctx, svg);
    v.start();

    const data = canvas
      .toDataURL("image/png", 1)
      .replace(/^data:image\/\w+;base64,/, "");

    v.stop();

    zip
      .folder(`${name}-png`)
      .file(`${name}-${size}px.png`, data, { base64: true });
  });

  return await zip.generateAsync({ type: "blob" });
};

export const downloadAllSvg = async () => {
  const zip = new JSZip();

  Object.keys(Icons).forEach((key) => {
    const Icon = Icons[key];
    const data = renderToString(<Icon />);
    zip.folder(`NAV-svg-ikoner`).file(`${key}.svg`, data);
  });
  const data = await zip.generateAsync({ type: "blob" });

  fileDownload(data, "NAV-svg-ikoner.zip");
};

const generatePngInSize = (size: number, iconString: string) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let svg = iconString.replace(/width="[^"]*"/, `width="${size}px"`);
  svg = svg.replace(/height="[^"]*"/, `height="${size}px"`);

  const v = canvg.fromString(ctx, svg);
  v.start();

  const data = canvas
    .toDataURL("image/png", 1)
    .replace(/^data:image\/\w+;base64,/, "");

  v.stop();

  return data;
};

export const downloadPngInSize = async (size: number) => {
  const zip = new JSZip();

  Object.keys(Icons).forEach((key) => {
    const Icon = Icons[key];
    const iconString = renderToString(<Icon />);
    const data = generatePngInSize(size, iconString);
    zip
      .folder(`NAV-ikoner-${size}px-png`)
      .file(`${key}.png`, data, { base64: true });
  });

  const data = await zip.generateAsync({ type: "blob" });
  fileDownload(data, `NAV-ikoner-${size}px-png.zip`);
};
