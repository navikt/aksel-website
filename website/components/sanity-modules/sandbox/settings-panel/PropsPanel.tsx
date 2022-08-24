import cl from "classnames";
import React, { useContext, useState } from "react";
import { SandboxContext } from "../index";
import PropFilter from "./PropFilter";

const SettingsPanel = () => {
  const { sandboxState, reset } = useContext(SandboxContext);
  const [open, setOpen] = useState(false);

  const hideProps =
    !sandboxState.args ||
    !sandboxState.args.props ||
    Object.keys(sandboxState.args.props).length === 0;

  return (
    <>
      <div
        className={cl("w-full bg-gray-100 pb-3 xl:hidden", {
          hidden: hideProps,
        })}
      >
        <div className="flex justify-end px-4">
          <button
            onClick={() => setOpen((x) => !x)}
            className="rounded bg-gray-300 py-1 px-3 text-medium hover:bg-gray-300/80 focus:shadow-focus focus:outline-none"
          >
            {open ? "Lukk" : "Vis"} props
          </button>
        </div>
      </div>
      <div
        className={cl(
          "relative flex w-full flex-col items-center gap-4 overflow-y-auto rounded-r bg-gray-100 px-6 pb-4 xl:py-4",
          "animate-fadeIn xl:max-w-[250px]",
          {
            hidden: hideProps,
            "hidden xl:flex": !open && !hideProps,
          }
        )}
      >
        <div className="flex h-full w-full max-w-[250px] flex-col">
          <PropFilter />
          <button
            onClick={reset}
            className="absolute top-1 right-4 mx-auto mt-auto w-fit justify-self-end rounded bg-gray-300 py-1 px-3 text-medium hover:bg-gray-300/80 focus:shadow-focus focus:outline-none xl:relative"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
export default SettingsPanel;
