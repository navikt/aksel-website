import { Modal } from "@navikt/ds-react";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { SandboxContext } from ".";

const ScModal = styled(Modal)`
  background-color: transparent;
  width: calc(100% + 2rem);
  height: 100%;
  border-radius: 0%;
  position: relative;

  :focus {
    box-shadow: none;
  }

  > .navds-modal__button {
    display: none;
  }
`;

const Fullscreen = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(SandboxContext);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <ScModal
      open={context.fullscreen}
      onClose={() => context.setFullscreen(false)}
    >
      {children}
    </ScModal>
  );
};
export default Fullscreen;
