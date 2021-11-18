import React from "react";
import { Tag } from "@navikt/ds-react";
import { Edit } from "@navikt/ds-icons";

export function defaultPreview() {
  return {
    preview: {
      select: {
        title: "heading",
        status: "status",
        metadata: "metadata",
        id: "_id",
      },
      prepare(selection) {
        const { title, status, metadata, id } = selection;
        console.log(id);
        return {
          title: title,
          subtitle: id.includes("drafts.") ? "Draft" : "Publisert",
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
