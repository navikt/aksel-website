import { BodyShort, Heading } from "@navikt/ds-react";
import styled from "styled-components";
import { Snippet } from "../../..";
import { CodeSnippet, DsColor } from "../../../../lib/autogen-types";
import Color from "color";
import ColorFormats from "./ColorFormats";

const ScModalContent = styled.div`
  min-width: 300px;
  width: 700px;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
`;

const ScMuted = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

const ScColorTag = styled.div<{ bgColor: string; dark: boolean }>`
  color: ${(props) =>
    props.dark
      ? `var(--navds-semantic-color-text-inverted)`
      : `var(--navds-semantic-color-text)`};
  background-color: ${(props) => `var(${props.bgColor});`};
  padding: 1rem 2rem 1rem 0.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const tokenSnippet = (color: DsColor): CodeSnippet => ({
  _type: "code_snippet",
  title: `Token-snippet for ${color.title} icon`,
  code: {
    language: "jsx",
    code: `/* CSS */
var(${color.full_title});

/* Less */
${color.full_title.replace("--", "@")};`,
  },
});

const ColorModal = ({ color }: { color: DsColor }) => {
  return (
    <ScModalContent>
      <Heading spacing size="medium">
        {capitalize(color.title.replaceAll("-", " "))}
      </Heading>
      <BodyShort spacing>{capitalize(color.color_type)} farge</BodyShort>
      {color.color_type === "global" && (
        <ScColorTag
          bgColor={color.full_title}
          dark={Color(color.color_value).isDark()}
        >
          <BodyShort>{color.title}</BodyShort>
        </ScColorTag>
      )}
      {color.color_roles && (
        <>
          <ScMuted spacing>Roller</ScMuted>
          <BodyShort spacing>{color.color_roles}</BodyShort>
        </>
      )}
      {color.color_type === "semantic" && (
        <>
          <ScMuted spacing>Global farge</ScMuted>
          <BodyShort spacing>{color.color_name}</BodyShort>
        </>
      )}
      <Heading spacing size="small">
        Fargeverdier
      </Heading>
      <ColorFormats color={color} />
      <Heading spacing size="small">
        Token
      </Heading>
      <Snippet node={tokenSnippet(color)} />
    </ScModalContent>
  );
};

export default ColorModal;
