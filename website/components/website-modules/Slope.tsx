export const Slope = () => (
  <div
    className="pointer-events-none relative mx-auto h-fit max-w-[1440px] 2xl:max-w-none"
    aria-hidden
  >
    <svg
      className="-mt-60  w-[1440px] rotate-180 bg-transparent xl:-mt-36 2xl:-mt-[8vw] 2xl:w-auto"
      viewBox="0 0 100 16"
      focusable="false"
      aria-hidden="true"
    >
      <polygon points="0,0 100,0 0,16" className="fill-gray-100"></polygon>
    </svg>
    <div className="absolute -bottom-[99.9%] h-full w-full bg-gray-100" />
  </div>
);

export const FooterSlope = () => (
  <div
    className="pointer-events-none relative mx-auto h-fit max-w-[1440px] 2xl:max-w-none"
    aria-hidden
  >
    <svg
      className="-mt-60 w-[1440px] rotate-180 bg-transparent 2xl:-mt-[12vw] 2xl:w-auto"
      viewBox="0 0 100 16"
      focusable="false"
      aria-hidden="true"
    >
      <polygon points="0,0 100,0 0,16" className="fill-gray-100"></polygon>
    </svg>
    <div className="absolute -bottom-[99.9%] h-full w-full bg-gray-100" />
  </div>
);

export const PrinsippSlope = () => (
  <div
    className="pointer-events-none relative mx-auto h-fit max-w-[1440px]"
    aria-hidden
  >
    <svg
      className="-mt-36 w-[1440px] rotate-180 bg-transparent"
      viewBox="0 0 100 8"
      focusable="false"
      aria-hidden="true"
    >
      <polygon points="0,0 100,0 0,8" className="fill-gray-50"></polygon>
      <polygon points="-14,-8 1000,1 0,0" className="fill-gray-50"></polygon>
    </svg>
    <div className="absolute -right-[calc(calc(100vw_-_1440px)_/_2)] top-0 h-full w-[calc(calc(100vw_-_1440px)_/_2)] bg-gray-50" />
  </div>
);
