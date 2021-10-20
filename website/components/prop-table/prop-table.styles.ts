import styled from "styled-components";

export const PropTable = styled.div`
  margin-bottom: var(--navds-spacing-8);
  max-width: 600px;
  position: relative;
  overflow-x: auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  margin-top: 3rem;

  code,
  * {
    white-space: break-spaces;
  }

  :first-child {
    margin-top: 1rem;
  }

  :last-child {
    margin-bottom: 3rem;
  }
`;

export const Caption = styled.caption`
  text-align: left;
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const Tbody = styled.tbody`
  border: none;
  border-bottom: 1px solid var(--navds-color-gray-40);
`;

export const Th = styled.th`
  text-align: left;
  padding: 0 1rem 0.75rem 0.125rem;
  vertical-align: top;
`;

export const Td = styled.td`
  text-align: left;
  padding: 0rem 0 0.5rem 0.25rem;
  width: 100%;
`;
