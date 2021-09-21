import { useState, useEffect } from "react";
import { PublishIcon } from "@sanity/icons";
import { useDocumentOperation } from "@sanity/react-hooks";
import { getExpireDates } from "../../config";

export function PublishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  if (props.liveEdit) {
    return null;
  }

  const onHandle = () => {
    if (ops.publish.disabled) {
      props.onComplete();
      return;
    }
    setIsPublishing(true);

    const dates = getExpireDates(
      props.published?.metadata?.doctype ?? "article"
    );

    ops.patch.execute([
      {
        set: {
          metadata: {
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

    ops.publish.execute();
    props.onComplete();
  };

  return {
    disabled: ops.publish.disabled,
    icon: PublishIcon,
    shortcut: "mod+shift+p",
    label: "Publish",
    onHandle,
  };
}
