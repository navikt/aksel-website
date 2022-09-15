const Slope = () => (
  <div className="relative mx-auto h-fit max-w-[1440px]">
    <svg
      className="-mt-60 hidden w-[1440px] rotate-180 bg-transparent xs:block xl:-mt-36"
      viewBox="0 0 100 16"
      focusable="false"
      aria-hidden="true"
    >
      <polygon points="0,0 100,0 0,16" className="fill-gray-100"></polygon>
      <polygon points="-14,-16 1000,1 0,0" className="fill-gray-100"></polygon>
    </svg>
    <div className="absolute -right-[calc(calc(100vw_-_1440px)_/_2)] top-0 h-full w-[calc(calc(100vw_-_1440px)_/_2)] bg-gray-100" />
  </div>
);

export default Slope;
