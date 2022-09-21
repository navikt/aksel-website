import { SanityT } from "@/lib";
import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Snippet } from "@/components";
import cl from "classnames";
import { SuccessStroke } from "@navikt/ds-icons";

const exampleIframeId = "example-iframe";
const iframePadding = 192;

const ComponentExamples = ({
  node,
}: {
  node: Omit<SanityT.Schema.kode_eksempler, "dir" | "filnavn"> & {
    dir?: SanityT.Schema.kode_eksempler_fil;
    filnavn?: SanityT.Schema.kode_eksempler_fil;
  };
}) => {
  const [iframeHeight, setIframeHeight] = useState(400);
  const [activeExample, setActiveExample] = useState(null);

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        exampleIframeId
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

  const fixName = (str: string) => str.split(".")?.[1] ?? str;

  if (node.standalone || node.dir.filer.length === 0 || !node.dir) {
    return true;
  }

  return (
    <>
      <Tabs.Root
        defaultValue={node.dir.filer[0].navn}
        onValueChange={(v) => setActiveExample(v)}
      >
        <Tabs.List className="mb-4 flex flex-wrap gap-2">
          {node.dir.filer.map((fil) => {
            return (
              <Tabs.Trigger
                key={fil._key}
                value={fil.navn}
                className={cl(
                  "flex h-8 items-center justify-center rounded-full text-base capitalize focus:shadow-focus-gap focus:outline-none",
                  {
                    "gap-1 bg-gray-600 pr-3 pl-[10px] text-white":
                      activeExample === fil.navn,
                    "bg-gray-100 px-3 ": activeExample !== fil.navn,
                  }
                )}
              >
                {activeExample === fil.navn && <SuccessStroke aria-hidden />}
                {fixName(fil.navn) + " test"}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {node.dir.filer.map((fil) => {
          const exampleUrl = `/eksempler/${node.dir.title}/${fil.navn.replace(
            ".tsx",
            ""
          )}`;

          return (
            <Tabs.Content key={fil._key} value={fil.navn} tabIndex={-1}>
              <div className="mb-4 overflow-hidden bg-gray-50 ring-4 ring-gray-100">
                <iframe
                  src={exampleUrl}
                  height={iframeHeight}
                  onLoad={handleExampleLoad}
                  id={exampleIframeId}
                  className="block w-full min-w-96 max-w-full resize-x overflow-auto bg-white shadow-[20px_0_20px_-20px_rgba(0,0,0,0.22)]"
                />
              </div>

              <Snippet
                node={{
                  _type: "code_snippet" as const,
                  title: `${fil.navn}-snippet`,
                  code: { code: fil.innhold.trim(), language: "jsx" },
                }}
              />
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
};

export default ComponentExamples;
