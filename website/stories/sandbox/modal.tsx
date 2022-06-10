import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";
import { SandboxComponentT } from "./types";

const ModalSandbox: SandboxComponentT = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Åpne modal
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen((x) => !x);
        }}
        shouldCloseOnOverlayClick={props?.shouldCloseOnOverlayClick}
        aria-label="Modal demo"
        closeButton={props?.closeButton}
      >
        <Modal.Content>
          <Heading spacing level="1" size="large">
            Laborum proident id ullamco
          </Heading>
          <Heading spacing level="2" size="medium">
            Excepteur labore nostrud incididunt exercitation.
          </Heading>
          <BodyLong spacing>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum. Proident aute culpa qui nostrud velit adipisicing minim.
            Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua
            exercitation non minim minim pariatur sunt laborum ipsum.
            Exercitation nostrud est laborum magna non non aliqua qui esse.
          </BodyLong>
        </Modal.Content>
      </Modal>
    </>
  );
};

ModalSandbox.args = {
  props: {
    shouldCloseOnOverlayClick: true,
    closeButton: true,
  },
};

ModalSandbox.getCode = (props: any) => {
  return `<>
  <Button
    onClick={() => setOpen(true)}
  >
    Åpne modal
  </Button>
  <Modal
    open={openState}
    aria-label="Modal demo"
    onClose={() => setOpenState((x) => !x)}${
      !props?.closeButton ? "\n    closeButton={false}" : ""
    }${
    !props?.shouldCloseOnOverlayClick
      ? "\n    shouldCloseOnOverlayClick={false}"
      : ""
  }
  >
    <Modal.Content>
      <Heading spacing level="1" size="large">
        Laborum proident id ullamco
      </Heading>
      <Heading spacing level="2" size="medium">
        Excepteur labore nostrud incididunt exercitation.
      </Heading>
      <BodyLong spacing>
        Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
        incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
        laborum. Proident aute culpa qui nostrud velit adipisicing minim.
        Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua
        exercitation non minim minim pariatur sunt laborum ipsum.
        Exercitation nostrud est laborum magna non non aliqua qui esse.
      </BodyLong>
    </Modal.Content>
  </Modal>
</>`;
};

export default ModalSandbox;
