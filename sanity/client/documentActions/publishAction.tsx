import React, { useState, useEffect } from "react";
import { PublishIcon } from "@sanity/icons";
import { useDocumentOperation } from "@sanity/react-hooks";
import { getExpireDates } from "../../config";
import { BodyLong } from "@navikt/ds-react";

export function PublishAction(props) {
  const ops = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const isDraft = !props.published;

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

    if (props.published?.metadata) {
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
    }

    ops.publish.execute();
    if (!!props.draft?.metadata && isDraft) {
      setOpenPopover(true);
    }
  };

  const handleClose = () => {
    setOpenPopover(false);
    props.onComplete();
  };

  return {
    disabled: ops.publish.disabled,
    color: props.published ? undefined : "success",
    icon: PublishIcon,
    shortcut: "mod+shift+p",
    label: props.published ? "Publiser oppdatering" : "Publiser side",
    onHandle,
    dialog: openPopover && {
      type: "modal",
      onClose: () => handleClose(),
      content: (
        <div>
          <BodyLong>
            Husk at selv om siden er publisert så må man manuelt legge den til i
            navigasjons-strukturen. Dette kan gjøres under "Sidemeny"-tabben.
          </BodyLong>
        </div>
      ),
    },
  };
}
