import { Heading } from "@navikt/ds-react";
import "nav-frontend-tabell-style/dist/main.css";
import React from "react";
import styled from "styled-components";
import { SanityBlockContent } from "./templating/SanityBlockContent";
/* import { PreviewBox } from "./templating/TemplateStyles"; */

const Div = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

const Td = styled.td`
  .navds-typo--spacing {
    margin-bottom: 0;
  }
`;

type UuType = {
  node: {
    focus?: any;
    mouse?: any;
    keyboard?: { command: any; description: any; _key: string }[];
    screen_reader?: any;
  };
};

const UuInteraction = ({ node }: UuType): JSX.Element => {
  // return <PreviewBox>🚧 Komponent interaksjoner 🚧</PreviewBox>;
  return (
    <Div>
      {node.focus && (
        <>
          <Heading level="3" size="medium" spacing>
            Focus management
          </Heading>
          <SanityBlockContent blocks={node.focus} />
        </>
      )}
      {node.mouse && (
        <>
          <Heading level="3" size="medium" spacing>
            Mouse management
          </Heading>
          <SanityBlockContent blocks={node.mouse} />
        </>
      )}
      {node.keyboard && (
        <>
          <Heading level="3" size="medium" spacing>
            Keyboard styring
          </Heading>
          <table
            className="tabell"
            summary="Oversikt over relevante keyboard-kommandoer for denne komponenten"
          >
            <thead>
              <tr>
                <th>Kommando</th>
                <th>Funksjon</th>
              </tr>
            </thead>
            <tbody>
              {node.keyboard.map((cm) => {
                return (
                  <tr key={cm._key}>
                    <Td>{<SanityBlockContent blocks={cm.command} />}</Td>
                    <Td>{<SanityBlockContent blocks={cm.description} />}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {node.screen_reader && (
        <>
          <Heading level="3" size="medium" spacing>
            Skjermleser
          </Heading>
          <SanityBlockContent blocks={node.screen_reader} />
        </>
      )}
    </Div>
  );
};

export default UuInteraction;
