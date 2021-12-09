import React from "react";
import { HelpText } from "@navikt/ds-react";
import styled from "styled-components";
import { ExampleComponent } from "../lib";

const Wrapper = styled.div`
  margin: 3rem 1rem;
`;

export const HelpTextExample: ExampleComponent = () => (
  <Wrapper>
    <HelpText title="Hvor kommer dette fra?">
      Informasjonen er hentet fra X sin statistikk fra 2021.
    </HelpText>
  </Wrapper>
);

HelpTextExample.html = "";
HelpTextExample.react = `<HelpText title="Hvor kommer dette fra?">
Informasjonen er hentet fra X sin statistikk fra 2021
</HelpText>`;
