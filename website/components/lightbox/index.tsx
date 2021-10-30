import { Modal } from "@navikt/ds-react";
import { useEffect } from "react";
import { useKey } from "react-use";
import styled from "styled-components";

const ScModal = styled(Modal)`
  background-color: transparent;
  width: 100%;
  height: 70%;
`;

const ScWrapper = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;

  > * {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const LightBox = ({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  useKey(" ", () => onClose(), {}, [onClose]);

  return (
    <ScModal onClose={() => onClose()} open={open}>
      <ScWrapper>{children}</ScWrapper>
    </ScModal>
  );
};

export default LightBox;
