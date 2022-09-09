/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import { useCurrentUser } from "@/lib";
import { Edit } from "@navikt/ds-icons";
import { Tooltip } from "@navikt/ds-react";
import * as React from "react";
import { useContext } from "react";
import { IdContext } from "./utils";
import cl from "classnames";

function EditButton({ variant }: { variant: "ds" | "aksel" }): JSX.Element {
  const { data } = useCurrentUser();
  const { id } = useContext(IdContext);

  return data && id ? (
    <>
      <Tooltip
        content="Bare tilgjengelig for innloggede redaktører"
        placement="left"
        delay={500}
      >
        <a
          href={`https://verktoykasse.sanity.studio/intent/edit/id=${id}`}
          target="_blank"
          rel="noreferrer"
          className={cl(
            "editbutton absolute top-0 right-0 flex translate-x-[102px] -translate-y-[99%] items-center gap-2 overflow-hidden rounded-tl px-2 py-1  text-white transition-transform hover:translate-x-0",
            {
              "bg-gray-900 hover:bg-gray-700": variant === "ds",
              "bg-deepblue-900 hover:bg-deepblue-700": variant === "aksel",
            }
          )}
          aria-hidden
          tabIndex={-1}
        >
          <Edit aria-hidden className="shrink-0" /> Rediger side
        </a>
      </Tooltip>
    </>
  ) : null;
}

export default EditButton;
