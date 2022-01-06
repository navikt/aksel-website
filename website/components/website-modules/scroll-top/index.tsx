import { Up } from "@navikt/ds-icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ScScrollTop = styled.button`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  background: none;
  appearance: none;
  border: none;
  gap: 0.5rem;
  display: flex;
  min-height: 48px;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    box-shadow: var(--navds-shadow-focus);
  }

  &[aria-hidden="true"] {
    display: none;
  }
`;

const ScrollTop = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [showButton, setShowButton] = useState(true);

  const { asPath } = useRouter();
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    ref.current &&
      setShowButton(
        ref.current.parentElement.getBoundingClientRect().height >= 1000
      );
  }, []);

  useEffect(() => {
    const updateShow = () =>
      ref.current &&
      setShowButton(
        ref.current.parentElement.getBoundingClientRect().height >= 1000
      );

    window.addEventListener("resize", updateShow);
    return () => {
      window.removeEventListener("resize", updateShow);
    };
  }, [asPath]);

  return (
    <ScScrollTop ref={ref} onClick={handleClick} aria-hidden={!showButton}>
      <Up aria-hidden aria-label="Til toppen" />
      Til toppen
    </ScScrollTop>
  );
};

export default ScrollTop;