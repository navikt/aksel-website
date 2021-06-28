import { Divide } from "@navikt/ds-icons";
import { Label, Link, Title } from "@navikt/ds-react";
import styled from "styled-components";
import { SanityBlockContent } from "./templating/SanityBlockContent";

const Div = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

const uuInteraction = ({ node }) => {
  console.log(node);
  return (
    <Div>
      <Title level="3" size="l">
        Focus management
      </Title>
    </Div>
  );
};

export default uuInteraction;
