import { Up } from "@navikt/ds-icons";

const ScrollTop = () => (
  <button
    onClick={() => window.scrollTo(0, 0)}
    className="absolute top-4 right-0 mr-4 mb-2 ml-auto flex min-h-[48px] items-center  gap-2 p-2 text-text-inverted hover:underline focus:shadow-focus-inverted focus:outline-none"
  >
    <Up aria-hidden aria-label="Til toppen" />
    Til toppen
  </button>
);

export default ScrollTop;
