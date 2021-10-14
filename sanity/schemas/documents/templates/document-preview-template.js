import React from "react";
import { Tag } from "@navikt/ds-react";

export function defaultPreview() {
  return {
    preview: {
      select: {
        title: "heading",
        status: "status",
        metadata: "metadata",
      },
      prepare(selection) {
        const { title, status, metadata } = selection;
        return {
          title: title,
          subtitle: metadata.last_update,
          media: (
            <Tag
              size="small"
              variant={
                status === "published"
                  ? "success"
                  : status === "beta"
                  ? "info"
                  : "warning"
              }
              /* Hack to fit tag into preview panel */
              style={{ color: "black", padding: "0 1px" }}
            >
              {status === "published"
                ? "live"
                : status === "legacy"
                ? "dep"
                : status}
            </Tag>
          ),
        };
      },
    },
  };
}
