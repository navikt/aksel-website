import styled from "styled-components";

export const PropTable = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

export const TableWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  > *.tabell tbody td,
  > *.tabell tbody th {
    border-bottom: none;
  }
`;
