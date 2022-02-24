/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import { useRouter } from "next/router";
import * as React from "react";

function PreviewBanner(): JSX.Element {
  const { asPath } = useRouter();

  return (
    <a
      href={`/api/exit-preview?slug=${asPath}`}
      className="fixed top-2 left-0 z-[9999] w-80 -translate-x-24 translate-y-6 -rotate-45 bg-red-500 p-4 text-center font-semibold text-text-inverted no-underline opacity-60  hover:opacity-100 focus:opacity-100"
    >
      <div>EXIT PREVIEW</div>
    </a>
  );
}

export default PreviewBanner;
