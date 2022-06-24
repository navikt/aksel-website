import {
  BodyLong,
  BodyShort,
  Button,
  Heading,
  ReadMore,
} from "@navikt/ds-react";
import cl from "classnames";
import React, { useContext, useState } from "react";
import { withErrorBoundary } from "@/error-boundary";
import { AuthenticationContext, AuthenticationStatus } from "..";

const Video = ({
  node,
}: {
  node: {
    _key?: string;
    alt: string;
    webm: { extension: string; url: string } | null;
    fallback: { extension: string; url: string } | null;
    transkripsjon?: string;
    caption?: string;
  };
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { status, login } = useContext(AuthenticationContext);
  const isLoggedIn = status === AuthenticationStatus.IS_AUTHENTICATED;

  if (!node || (!node.webm && !node.fallback) || !node.alt) {
    return null;
  }

  const getVideo = () => {
    return `<iframe
    width="1280"
    height="720"
    loading="lazy"
    src="https://web.microsoftstream.com/embed/video/c97ee635-541e-48ee-b33e-6f8f9b86c1dc?autoplay=false&showinfo=false"
    allowFullScreen
  ></iframe>`;
  };

  /* https://www.w3.org/WAI/PF/HTML/wiki/Media_Alt_Technologies#1:_Use_.40aria-label_for_the_text_description_of_player */
  return (
    <figure className={cl("m-0 mb-8 flex flex-col gap-2")} id={node._key}>
      {isLoggedIn ? (
        <div
          className="iframe-parent"
          dangerouslySetInnerHTML={{ __html: getVideo() }}
        />
      ) : (
        <div className="grid aspect-video w-full place-content-center justify-items-start gap-4 rounded bg-gray-200">
          <div className="">
            <Heading as="p" size="small">
              Logg inn for å se videoen
            </Heading>
            <BodyShort as="p" size="small" className="mt-1">
              Bare tilgjengelig for NAV-ansatte.
            </BodyShort>
          </div>
          <Button
            onClick={() => {
              window.history.replaceState(
                window.history.state,
                "",
                `#${node._key}`
              );
              login();
            }}
          >
            Logg inn
          </Button>
        </div>
      )}
      <style jsx global>
        {`
          .iframe-parent iframe {
            aspect-ratio: 16/9;
            border: none;
            height: auto;
            width: auto;
            max-width: 100%;
            width: 100%;
          }
        `}
      </style>
      {/* <video
        className="focus:shadow-focus-gap focus:outline-none"
        title={node.alt}
        playsInline
        controls
        loop
        aria-describedby={
          node.transkripsjon ? node.alt + "transkript" : undefined
        }
        aria-label="Trykk space for å starte/pause video"
      >
        <source src={node.webm.url} type={`video/${node.webm.extension}`} />
        <source
          src={node.fallback.url}
          type={`video/${node.fallback.extension}`}
        />
      </video> */}
      {node?.caption && (
        <BodyLong as="figcaption" className="self-center">
          {node.caption}
        </BodyLong>
      )}
      {node?.transkripsjon && (
        <ReadMore
          header={`${open ? "Lukk" : "Åpne"} video transkripsjon`}
          className="ml-[2px]"
          renderContentWhenClosed
          open={open}
          onClick={() => setOpen((x) => !x)}
        >
          <span id={node.alt + "transkript"}>{node.transkripsjon}</span>
        </ReadMore>
      )}
    </figure>
  );
};

export default withErrorBoundary(Video, "Video");
