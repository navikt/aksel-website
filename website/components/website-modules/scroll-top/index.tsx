import { Up } from "@navikt/ds-icons";
import styled from "styled-components";

const ScScrollTop = styled.button`
  position: absolute;
  top: 1rem;
  right: 0rem;
  color: var(--navds-semantic-color-text-inverted);
  background: none;
  appearance: none;
  border: none;
  gap: 0.5rem;
  display: flex;
  min-height: 48px;
  margin: 0 1rem 0.5rem auto;
  padding: 0.5rem;
  justify-content: flex-end;
  align-items: center;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }

  :focus {
    outline: none;
    box-shadow: var(--navds-shadow-focus-inverted);
  }
`;

const ScrollTop = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ScScrollTop onClick={handleClick}>
      <Up aria-hidden aria-label="Til toppen" />
      Til toppen
    </ScScrollTop>
  );
};

export default ScrollTop;
