import React from "react";
import { Tag } from "@navikt/ds-react";

export const TagAllVariants = () => {
  return (
    <>
      <Tag variant="info">Info</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </>
  );
};

TagAllVariants.react = `<Tag variant="info">Info</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>`;

export const TagSmall = () => {
  return (
    <>
      <Tag size="small" variant="info">
        Info
      </Tag>
      <Tag size="small" variant="success">
        Success
      </Tag>
      <Tag size="small" variant="warning">
        Warning
      </Tag>
      <Tag size="small" variant="error">
        Error
      </Tag>
    </>
  );
};

TagSmall.react = `<Tag size="small" variant="info">
Info
</Tag>
<Tag size="small" variant="success">
Success
</Tag>
<Tag size="small" variant="warning">
Warning
</Tag>
<Tag size="small" variant="error">
Error
</Tag>`;
