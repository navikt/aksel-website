import React, { useState } from "react";
import { Modal, Button, Heading, BodyLong } from "@navikt/ds-react";

Modal.setAppElement("#__next");

export const ModalExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>Åpne modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content>
          <Heading spacing level="1" size="large">
            Header
          </Heading>
          <Heading spacing level="2" size="medium">
            Subheading
          </Heading>
          <BodyLong spacing>Cupidatat irure ipsum veniam ad in esse.</BodyLong>
          <BodyLong>
            Cillum tempor pariatur amet ut laborum Lorem enim enim.
          </BodyLong>
        </Modal.Content>
      </Modal>
    </>
  );
};

ModalExample.react = `<Modal open={open} onClose={() => setOpen(false)}>
<Modal.Content>
  <Heading spacing level="1" size="large">
    Header
  </Heading>
  <Heading spacing level="2" size="medium">
    Subheading
  </Heading>
  <BodyLong spacing>Cupidatat irure ipsum veniam ad in esse.</BodyLong>
  <BodyLong>
    Cillum tempor pariatur amet ut laborum Lorem enim enim.
  </BodyLong>
</Modal.Content>
</Modal>`;

export const ModalShouldNotcloseonoverlayclick = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen((open) => !open)}>Åpne modal</Button>
      <Modal
        shouldCloseOnOverlayClick={false}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Content>
          <Heading spacing level="1" size="large">
            Header
          </Heading>
          <Heading spacing level="2" size="medium">
            Subheading
          </Heading>
          <BodyLong spacing>Cupidatat irure ipsum veniam ad in esse.</BodyLong>
          <BodyLong>
            Cillum tempor pariatur amet ut laborum Lorem enim enim.
          </BodyLong>
        </Modal.Content>
      </Modal>
    </>
  );
};

ModalShouldNotcloseonoverlayclick.react = `<Modal shouldCloseOnOverlayClick={false} open={open} onClose={() => setOpen(false)}>
<Modal.Content>
  <Heading spacing level="1" size="large">
    Header
  </Heading>
  <Heading spacing level="2" size="medium">
    Subheading
  </Heading>
  <BodyLong spacing>Cupidatat irure ipsum veniam ad in esse.</BodyLong>
  <BodyLong>
    Cillum tempor pariatur amet ut laborum Lorem enim enim.
  </BodyLong>
</Modal.Content>
</Modal>`;
