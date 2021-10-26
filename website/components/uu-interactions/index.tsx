import { Heading } from "@navikt/ds-react";
import React from "react";
import { UuInteraction as UuInteractionT } from "../../lib/autogen-types";
import { SanityBlockContent } from "../SanityBlockContent";
import { PreviewBox } from "../templates/pages/page.styles";
import * as S from "./uu.styles";

const UuInteraction = ({ node }: { node: UuInteractionT }): JSX.Element => {
  return <PreviewBox>🚧 Komponent interaksjoner 🚧</PreviewBox>;
  return (
    <S.Div>
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
                <th>Key</th>
                <th>Funksjon</th>
              </tr>
            </thead>
            <tbody>
              {node.keyboard.map((cm) => {
                return (
                  <tr key={cm._key}>
                    <S.Td>{<SanityBlockContent blocks={cm.command} />}</S.Td>
                    <S.Td>
                      {<SanityBlockContent blocks={cm.description} />}
                    </S.Td>
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
    </S.Div>
  );
};

export default UuInteraction;
