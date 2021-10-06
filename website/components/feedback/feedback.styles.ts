import styled from "styled-components";
import { Textarea as DsTextarea } from "@navikt/ds-react";

export const Wrapper = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--navds-color-blue-10);
  gap: 1rem;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--navds-color-blue-10);
  gap: 1rem;
`;

export const FormItems = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  border: none;
  width: 100%;
`;

export const Textarea = styled(DsTextarea)`
  width: 100%;
`;

export const Buttons = styled.div`
  display: inline-flex;
  gap: 1rem;
  justify-self: flex-start;
`;
