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
      className="group absolute top-4 left-0 right-0 z-10 mx-auto flex min-h-[48px] w-fit flex-col items-center gap-2 p-2 text-text-inverted hover:underline focus:shadow-focus-inverted focus:outline-none"
    >
      <svg
        width="25"
        height="13"
        viewBox="0 0 25 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:-translate-y-1"
      >
        <path
          d="M1 11.3135L10.1924 2.12109C11.364 0.949516 13.2635 0.949516 14.435 2.12109L23.6274 11.3135"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
      Til toppen
    </button>
  );
};

export default ScrollTop;
