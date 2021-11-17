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
  background-color: var(--navds-semantic-color-canvas-background-inverted);
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

const ScImage = styled.div`
  position: relative;
  max-height: 80%;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1280px;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--navds-semantic-color-canvas-background-default);
  overflow-y: auto;

  > div {
    position: unset !important;
  }

  img {
    object-fit: contain;
    width: 100% !important;
    height: unset !important;
  }
`;

const ScCloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 0.4rem;
  right: 1rem;
  color: var(--navds-semantic-color-text-inverted);
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;

  :hover {
    box-shadow: inset 0 0 0 2px
      var(--navds-semantic-color-component-background-light);
  }

  :focus {
    box-shadow: inset 0 0 0 2px
        var(--navds-semantic-color-component-background-light),
      0 0 0 1px var(--navds-semantic-color-component-background-inverted),
      0 0 0 3px var(--navds-global-color-blue-200);
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
