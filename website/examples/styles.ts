import styled from "styled-components";

export const ScColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const ScFlexGrow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 12rem;

  > * {
    flex: 1 1;
  }
`;
