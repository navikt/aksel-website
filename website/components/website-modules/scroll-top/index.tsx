import { Elevator, Up } from "@navikt/ds-icons";
import ElevatorJs from "elevator.js";
import { useEffect, useState } from "react";

const ScrollTop = () => {
  const [isElevator, setIsElevator] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      (e.ctrlKey || e.metaKey) && e.shiftKey && setIsElevator(true);
    };

    const handleKeyUp = (e) => {
      (e.ctrlKey || e.metaKey) && setIsElevator(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <button
      onClick={(e) => {
        handleElevator(e);
      }}
      className="flex min-h-[48px] items-center gap-2 p-2 text-text-inverted hover:underline focus:shadow-focus-inverted focus:outline-none"
    >
      {isElevator ? (
        <Elevator aria-label="Til toppen med heismusikk" />
      ) : (
        <Up aria-hidden aria-label="Til toppen" />
      )}
      Til toppen
    </button>
  );
};

export default ScrollTop;
