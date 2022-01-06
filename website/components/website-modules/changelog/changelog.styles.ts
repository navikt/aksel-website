import { Button } from "@navikt/ds-react";
import styled from "styled-components";

export const Changelog = styled.div`
  margin: var(--navds-spacing-12) 0 var(--navds-spacing-7) 0;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const ChangelogButton = styled(Button)`
  /* position: absolute;
  right: 0; */
  /* float: right; */
`;
