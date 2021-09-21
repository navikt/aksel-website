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
          subtitle: metadata.updates.last_update,
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
              style={{ color: "black" }}
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
