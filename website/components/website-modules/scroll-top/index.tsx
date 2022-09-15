import { Heading } from "@navikt/ds-react";
import ElevatorJs from "elevator.js";

const ScrollTop = () => {
  const handleElevator = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
      const el = new ElevatorJs({
        mainAudio: "/sound/elevator.mp3",
        endAudio: "/sound/ding.mp3",
      });
      el?.elevate();
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      onClick={(e) => {
        handleElevator(e);
      }}
      className="group -mt-[10px] flex h-[48px] w-fit items-center justify-center gap-2 p-2 text-xlarge font-semibold text-text-inverted hover:underline focus:shadow-focus-inverted focus:outline-none"
    >
      <svg
        width="25"
        height="12"
        viewBox="0 0 25 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M1 11.3145L10.1924 2.12207C11.364 0.950492 13.2635 0.950492 14.435 2.12207L23.6274 11.3145"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
      <Heading as="span" size="small">
        Til toppen
      </Heading>
    </button>
  );
};

export default ScrollTop;
