import styled from "styled-components";
import { Textarea as DsTextarea } from "@navikt/ds-react";

export const Wrapper = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--navds-color-gray-20);
  gap: 1rem;

  @media screen and (max-width: 550px) {
    padding: 1rem;
  }
`;

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
