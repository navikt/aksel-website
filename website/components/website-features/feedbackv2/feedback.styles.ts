import styled from "styled-components";
import { Textarea as DsTextarea, Heading as DsHeading } from "@navikt/ds-react";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-width: 600px;
`;

export const FormItems = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  border: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Textarea = styled(DsTextarea)`
  width: 100%;
`;

export const Buttons = styled.div`
  display: inline-flex;
  gap: 1rem;
  justify-self: flex-start;
`;

export const Heading = styled(DsHeading)`
  opacity: 1;
  transition: opacity 400ms;
  margin-right: auto;
  &[aria-hidden="true"] {
    opacity: 0;
    pointer-events: none;
  }
`;
