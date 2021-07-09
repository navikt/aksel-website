import { Title } from "@navikt/ds-react";
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
          <Title level="3" size="m" spacing>
            Focus management
          </Title>
          <SanityBlockContent blocks={node.uu_interaction_focus} />
        </>
      )}
      {node.uu_interaction_mouse && (
        <>
          <Title level="3" size="m" spacing>
            Mouse management
          </Title>
          <SanityBlockContent blocks={node.uu_interaction_mouse} />
        </>
      )}
      {node.uu_interaction_keyboard && (
        <>
          <Title level="3" size="m" spacing>
            Keyboard styring
          </Title>
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
