import { Close } from "@navikt/ds-icons";
import { BodyShort, Modal } from "@navikt/ds-react";
import { useEffect } from "react";
import { useKey } from "react-use";

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
    <Modal
      closeButton={false}
      onClose={() => onClose()}
      open={open}
      className="relative my-0 -mx-4 h-5/6 w-[calc(100%_+_2rem)] animate-fadeIn rounded-none bg-transparent focus:shadow-none"
    >
      <button
        onClick={() => onClose()}
        className="absolute top-4 right-4 z-10 flex items-center gap-2 py-1 px-2 text-text-inverted hover:underline focus:shadow-focus-inverted focus:outline-none"
      >
        <BodyShort>Lukk</BodyShort>
        <Close aria-label="Lukk bildevisning" />
      </button>
      <div
        onClick={() => onClose()}
        className="relative flex h-full w-full justify-center border-t-[64px] border-b-[64px] bg-gray-50"
      >
        <div className="img-wrapper">{children}</div>
      </div>
    </Modal>
  );
};

export default LightBox;
