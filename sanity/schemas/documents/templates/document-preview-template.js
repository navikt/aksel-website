import React from "react";
import { Tag } from "@navikt/ds-react";
import { Edit } from "@navikt/ds-icons";

export function defaultPreview() {
  return {
    preview: {
      select: {
        title: "title",
        heading: "heading",
        status: "status",
        metadata: "metadata",
        id: "_id",
      },
      prepare(selection) {
        const { title, id, heading } = selection;
        return {
          title: title,
          subtitle: heading,
          media: id.includes("drafts.") ? (
            <Edit />
          ) : (
            <Tag
              size="small"
              variant="success"
              style={{ color: "black", padding: "0 1px" }}
            >
              Live
            </Tag>
          ),
        };
      },
    },
  };
}
