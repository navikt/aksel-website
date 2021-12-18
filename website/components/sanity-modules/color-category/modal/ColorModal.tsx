import { BodyShort, Heading } from "@navikt/ds-react";
import styled from "styled-components";
import { Snippet } from "../../..";
import { CodeSnippet, DsColor } from "../../../../lib/autogen-types";
import Color from "color";
import ColorFormats from "./ColorFormats";

const ScModalContent = styled.div`
  min-width: 300px;
  max-width: 700px;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScMuted = styled(BodyShort)`
  color: var(--navds-semantic-color-text-muted);
`;

const ScColorTag = styled.div<{
  bgColor: string;
  dark: boolean;
  border: boolean;
}>`
  color: ${(props) =>
    props.dark
      ? `var(--navds-semantic-color-text-inverted)`
      : `var(--navds-semantic-color-text)`};
  box-shadow: ${(props) =>
    props.border && `0 0 0 1px var(--navds-semantic-color-border-muted);`};
  background-color: ${(props) => `var(${props.bgColor});`};
  padding: 1rem 2rem 1rem 0.5rem;
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
  console.log(color.color_roles);
  return (
    <ScModalContent>
      <div>
        <Heading spacing size="medium">
          {capitalize(color.title.replaceAll("-", " "))}
        </Heading>
        <BodyShort spacing>
          {color.color_type === "semantic" ? "Semantisk farge" : "Global farge"}
        </BodyShort>
      </div>

      {color.color_type === "global" && (
        <div>
          <ScColorTag
            bgColor={color.full_title}
            dark={Color(color.color_value).isDark()}
            border={Color(color.color_value).luminosity() > 0.9}
          >
            <BodyShort>{color.title}</BodyShort>
          </ScColorTag>
        </div>
      )}
      {color.color_roles && (
        <div>
          <ScMuted spacing>Roller</ScMuted>
          {color?.color_roles.map((role) => (
            <BodyShort key={role}>{role}</BodyShort>
          ))}
        </div>
      )}
      {color.color_type === "semantic" && (
        <div>
          <ScMuted spacing>Global farge</ScMuted>
          <ScColorTag
            bgColor={color.full_title}
            dark={Color(color.color_value).isDark()}
            border={Color(color.color_value).luminosity() > 0.9}
          >
            <BodyShort>{color.color_name}</BodyShort>
          </ScColorTag>
        </div>
      )}
      <div>
        <Heading spacing size="small">
          Fargeverdier
        </Heading>
        <ColorFormats color={color} />
      </div>
      <div>
        <Heading spacing size="small">
          Token
        </Heading>
        <Snippet node={tokenSnippet(color)} />
      </div>
    </ScModalContent>
  );
};

export default ColorModal;
