import { Close } from "@navikt/ds-icons";
import { BodyShort, Modal } from "@navikt/ds-react";
import { useEffect } from "react";
import { useKey } from "react-use";
import styled from "styled-components";

const ScModal = styled(Modal)`
  background-color: transparent;
  width: calc(100% + 2rem);
  height: 80%;
  margin: 0 -1rem;
  border-radius: 0%;
  position: relative;

  :focus {
    box-shadow: none;
  }

  > .navds-modal__button {
    display: none;
  }
`;

const ScWrapper = styled.div`
  background-color: var(--navds-color-gray-90);
  width: 100%;
  height: 100%;
  position: relative;
`;

const ScImage = styled.div`
  position: relative;
  height: 80%;
  top: 50%;
  transform: translateY(-50%);
  display: block;

  background-color: var(--navds-color-gray-10);
`;

const ScCloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 0.4rem;
  right: 1rem;
  color: white;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;

  :hover {
    background-color: var(--navds-color-gray-80);
  }

  :focus {
    box-shadow: 0 0 0 2px white;
    outline: none;
  }

  svg {
    font-size: 1.25rem;
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
      <ScWrapper onClick={() => onClose()}>
        <ScCloseButton>
          <BodyShort>Lukk</BodyShort>
          <Close aria-label="Lukk bildevisning" />
        </ScCloseButton>
        <ScImage>{children}</ScImage>
      </ScWrapper>
    </ScModal>
  );
};

export default LightBox;
