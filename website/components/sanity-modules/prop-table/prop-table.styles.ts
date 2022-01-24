import { Detail } from "@navikt/ds-react";
import styled from "styled-components";

export const PropTable = styled.div`
  margin-bottom: var(--navds-spacing-8);
  position: relative;
  overflow-x: auto;

  ul {
    margin: 0;
    padding: 0;
    padding-left: 1.25rem;
    margin-bottom: 2rem;
  }

  > p:first-of-type {
    padding-bottom: 1.5rem;
  }
`;

export const Table = styled.table`
  padding-top: 1.25rem;
  margin-bottom: 0rem;
  border-top: 1px solid var(--navds-semantic-color-divider);
  border-collapse: inherit;

  code,
  * {
    white-space: break-spaces;
  }

  :first-child {
    margin-top: 1rem;
  }

  :last-child {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--navds-semantic-color-divider);
  }
`;

export const Caption = styled.caption`
  text-align: left;
  margin: 0;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const Required = styled(Detail)`
  color: var(--navds-semantic-color-feedback-danger-text);
`;

export const Tbody = styled.tbody`
  border: none;
`;

export const Th = styled.th`
  text-align: left;
  padding: 0 1rem 0.75rem 0.125rem;
  vertical-align: top;

  &:last-child {
    margin-bottom: 1.25rem;
  }
`;

export const Td = styled.td`
  text-align: left;
  padding: 0rem 0 0.5rem 0.25rem;
  width: 100%;
`;
