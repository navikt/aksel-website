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
        const prefix = !id.includes("drafts.") ? "" : "";
        return {
          title: heading,
          subtitle: `${prefix}`,
          media: id.includes("drafts.") ? <Edit aria-hidden /> : <Task />,
        };
      },
    },
  };
}
