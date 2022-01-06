import React from "react";
import { Tag } from "@navikt/ds-react";
import styled from "styled-components";
import { ExampleComponent } from "../../lib";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TagAllVariants: ExampleComponent = () => {
  return (
    <Wrapper>
      <Tag variant="info">Info</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </Wrapper>
  );
};

TagAllVariants.react = `<Tag variant="info">Info</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>`;

export const TagSmall: ExampleComponent = () => {
  return (
    <Wrapper>
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
    </Wrapper>
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
