import { BodyShort, Heading } from "@navikt/ds-react";
import styled from "styled-components";
import { Snippet } from "../..";
import { CodeSnippet, DsColor } from "../../../lib/autogen-types";

const ScModalContent = styled.div`
  min-width: 300px;
  max-width: 600px;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
`;

const ScMuted = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ColorModal = ({ color }: { color: DsColor }) => {
  const tokenSnippet: CodeSnippet = {
    _type: "code_snippet",
    title: `Token-snippet for ${color.title} icon`,
    code: {
      language: "jsx",
      code: `/* css */
${color.full_title}

/* Less */
${color.full_title.replace("--", "@")}

/* Scss */
${color.full_title.replace("--", "$")}`,
    },
  };

  return (
    <ScModalContent>
      <Heading spacing size="medium">
        {color.title}
      </Heading>
      <BodyShort spacing>{capitalize(color.color_type)} farge</BodyShort>
      <ScMuted spacing>Roller</ScMuted>
      <BodyShort spacing>{color.color_roles}</BodyShort>
      {color.color_type === "semantic" && (
        <>
          <ScMuted spacing>Global farge</ScMuted>
          <BodyShort spacing>{color.color_name}</BodyShort>
        </>
      )}
      <Heading spacing size="small">
        Token
      </Heading>
      <Snippet node={tokenSnippet} />
    </ScModalContent>
  );
};

export default ColorModal;
