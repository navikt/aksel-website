import React from "react";
import { Edit, Task } from "@navikt/ds-icons";

export function defaultPreview() {
  return {
    preview: {
      select: {
        heading: "heading",
        status: "status",
        metadata: "metadata",
        id: "_id",
        type: "_type",
      },
      prepare(selection) {
        const { id, heading, type } = selection;
        return {
          title: heading,
          subtitle: type.includes("_component_")
            ? "Komponentside"
            : type.includes("_tabbed_")
            ? "Artikkel m/tabs"
            : "Artikkel",
          media: id.includes("drafts.") ? (
            <Edit aria-hidden />
          ) : (
            <Task aria-hidden />
          ),
        };
      },
    },
  };
}
