import { Close } from "@navikt/ds-icons";
import { BodyShort, Modal } from "@navikt/ds-react";
import { useCallback, useEffect } from "react";

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

  const handleSpacebar = useCallback((event) => {
    event.key === " " && onClose();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebar);

    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
  }, [handleSpacebar]);

  return (
    <Modal
      closeButton={false}
      onClose={() => onClose()}
      open={open}
      className="relative aspect-video h-5/6 rounded-none bg-transparent focus:shadow-none"
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
        {children}
      </div>
    </Modal>
  );
};

export default LightBox;
