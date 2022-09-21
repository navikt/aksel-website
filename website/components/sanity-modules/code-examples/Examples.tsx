import { capitalize, Snippet } from "@/components";
import { SanityT } from "@/lib";
import { SuccessStroke } from "@navikt/ds-icons";
import { Link } from "@navikt/ds-react";
import * as Tabs from "@radix-ui/react-tabs";
import cl from "classnames";
import { useEffect, useState } from "react";
import { CodeSandbox } from "./CodeSandbox";

const exampleIframeId = "example-iframe";
const iframePadding = 192;

const ComponentExamples = ({
  node,
}: {
  node: Omit<SanityT.Schema.kode_eksempler, "dir" | "filnavn"> & {
    dir?: SanityT.Schema.kode_eksempler_fil;
    filnavn?: SanityT.Schema.kode_eksempler_fil;
  };
}): JSX.Element => {
  const [iframeHeight, setIframeHeight] = useState(400);
  const [activeExample, setActiveExample] = useState(null);

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        node?.title ?? exampleIframeId
      ) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;
      const exampleWrapper = exampleIframeDOM?.getElementById("ds-example");

      if (exampleWrapper) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        setIframeHeight(newHeight);
        clearInterval(waitForExampleContentToRender);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  useEffect(() => {
    node?.dir?.filer?.[0]?.navn && setActiveExample(node.dir.filer[0].navn);
  }, [node]);

  const fixName = (str: string) =>
    capitalize(
      str
        .replace(/[^\w]|_/g, " ")
        .replace(/\s+/g, " ")
        .match(/\D/g)
        .join("")
        .trim()
    ) ?? str;

  const element = (exampleUrl: string, code: string, name: string) => (
    <>
      <div className="overflow-hidden border-2 border-b-0 border-gray-100 bg-gray-50">
        <iframe
          src={exampleUrl}
          height={iframeHeight}
          onLoad={handleExampleLoad}
          id={node?.title ?? exampleIframeId}
          className="block w-full min-w-96 max-w-full resize-x overflow-auto bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]"
        />
      </div>
      <div className="mb-1 flex justify-center gap-2 border-2 border-gray-100 px-2 py-1 text-base xs:justify-end ">
        <CodeSandbox code={code.trim()} />
        <Link href={exampleUrl} className="text-gray-900" target="_blank">
          Åpne i nytt vindu
        </Link>
      </div>

      <Snippet
        node={{
          _type: "code_snippet" as const,
          title: `${name}-snippet`,
          code: { code: code.trim(), language: "jsx" },
        }}
      />
    </>
  );

  if (
    node.dir.filer.length === 0 ||
    (!node.standalone && !node.dir) ||
    (node.standalone && !node.filnavn)
  ) {
    return null;
  }

  if (node.standalone) {
    return element(
      `/eksempler/${node.filnavn.title.replace(".tsx", "")}`,
      node.filnavn?.filer?.[0]?.innhold ?? "",
      node.title
    );
  }

  return (
    <>
      <Tabs.Root
        defaultValue={node.dir.filer[0].navn}
        onValueChange={(v) => setActiveExample(v)}
      >
        <Tabs.List className="mb-5 flex max-w-xl flex-wrap gap-2">
          {node.dir.filer.map((fil) => {
            return (
              <Tabs.Trigger
                key={fil._key}
                value={fil.navn}
                className={cl(
                  "flex h-8 items-center justify-center rounded-full text-base focus:shadow-focus-gap focus:outline-none",
                  {
                    "gap-1 bg-gray-600 pr-3 pl-[10px] text-white hover:bg-gray-700":
                      activeExample === fil.navn,
                    "bg-gray-100 px-3 hover:bg-gray-200 ":
                      activeExample !== fil.navn,
                  }
                )}
              >
                {activeExample === fil.navn && <SuccessStroke aria-hidden />}
                {fixName(fil.navn)}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {node.dir.filer.map((fil) => {
          return (
            <Tabs.Content key={fil._key} value={fil.navn} tabIndex={-1}>
              {element(
                `/eksempler/${node.dir.title}/${fil.navn.replace(".tsx", "")}`,
                fil.innhold,
                node.title
              )}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
};

export default ComponentExamples;
