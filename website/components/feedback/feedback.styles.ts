import styled from "styled-components";
import { Textarea as DsTextarea, Heading as DsHeading } from "@navikt/ds-react";

export const Wrapper = styled.div<{ isMobile?: boolean }>`
  max-width: 664px;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin: ${(props) =>
    props.isMobile ? "4rem auto" : "4rem auto 4rem var(--navds-spacing-4)"};

  @media (max-width: 564px) {
    padding: 1rem;
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  > * {
    flex: 1 1;
    max-width: 11rem;
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

export const Heading = styled(DsHeading)`
  opacity: 1;
  transition: opacity 400ms;

  &[aria-hidden="true"] {
    opacity: 0;
  }
`;
