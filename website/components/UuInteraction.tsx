import { Heading } from "@navikt/ds-react";
import "nav-frontend-tabell-style/dist/main.css";
import styled from "styled-components";
import { SanityBlockContent } from "./templating/SanityBlockContent";

const Div = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

const Td = styled.td`
  .navds-typo--spacing {
    margin-bottom: 0;
  }
`;

const UuInteraction = ({ node }: { node: any }): JSX.Element => {
  /*   console.log(node); */
  return (
    <Div>
      {node.uu_interaction_focus && (
        <>
          <Heading level="3" size="medium" spacing>
            Focus management
          </Heading>
          <SanityBlockContent blocks={node.uu_interaction_focus} />
        </>
      )}
      {node.uu_interaction_mouse && (
        <>
          <Heading level="3" size="medium" spacing>
            Mouse management
          </Heading>
          <SanityBlockContent blocks={node.uu_interaction_mouse} />
        </>
      )}
      {node.uu_interaction_keyboard && (
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
              {node.uu_interaction_keyboard.map((cm) => {
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
    </Div>
  );
};

export default UuInteraction;
