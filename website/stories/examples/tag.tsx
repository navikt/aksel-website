import React from "react";
import { Tag } from "@navikt/ds-react";
import { ExampleComponent } from "../../lib";

export const TagAllVariants: ExampleComponent = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Tag variant="info">Info</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </div>
  );
};

TagAllVariants.react = `<Tag variant="info">Info</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>`;

export const TagSmall: ExampleComponent = () => {
  return (
    <div className="flex flex-wrap gap-4">
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
    </div>
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
