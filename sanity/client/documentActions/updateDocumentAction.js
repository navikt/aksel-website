// setAndPublishAction.js

import { useState, useEffect } from "react";
import { Refresh } from "@navikt/ds-icons";
import { useDocumentOperation } from "@sanity/react-hooks";
import React from "react";
import styles from "./styles.css";
import { getExpireDates } from "../../config";

export default function SetAndPublishAction(props) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  return {
    disabled: publish.disabled !== "ALREADY_PUBLISHED",
    label: isPublishing ? (
      <span className={styles.inline}>
        <Refresh />
        Updating...
      </span>
    ) : (
      <span className={styles.inline}>
        <Refresh />
        Update
      </span>
    ),
    onHandle: () => {
      const dates = getExpireDates(
        props.published?.metadata?.doctype ?? "article"
      );
      setIsPublishing(true);

      patch.execute([
        {
          set: {
            metadata: {
              doctype: "article",
              ...props.published.metadata,
              updates: {
                last_update: new Date().toISOString().split("T")[0],
                stagnant: dates[0].toISOString().split("T")[0],
                expired: dates[1].toISOString().split("T")[0],
              },
            },
          },
        },
      ]);
      // Perform the publish
      publish.execute();

      // Signal that the action is completed
      props.onComplete();
    },
  };
}
