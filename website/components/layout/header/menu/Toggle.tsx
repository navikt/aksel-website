import { Popover } from "@navikt/ds-react";
import cl from "classnames";
import React, { useState } from "react";

const Toggle = ({
  buttonContent,
  menu,
  open,
  setOpen,
  isHamburger,
}: {
  buttonContent: React.ReactNode;
  menu: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  isHamburger?: boolean;
}) => {
  const [buttonRef, setButtonRef] = useState(null);

  return (
    <>
      <div
        className={cl("z-[1050] mr-0 flex h-full justify-center", {
          "md:mr-8": !isHamburger,
        })}
      >
        <button
          ref={setButtonRef}
          aria-haspopup="false"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="navdsi-dropdown__toggle navdsi-header__button min-w-header justify-center gap-4 border-none focus:shadow-[inset_0_0_0_1px_var(--navds-semantic-color-component-background-inverted),inset_0_0_0_3px_var(--navds-global-color-blue-200)]"
        >
          {buttonContent}
        </button>
        <Popover
          onClose={() => setOpen(false)}
          anchorEl={buttonRef}
          open={open}
          arrow={false}
          placement={"bottom-start"}
          offset={8}
          className="z-[1100] w-80 max-w-full animate-fadeIn rounded border-none bg-component-background-light shadow-large"
        >
          {menu}
        </Popover>
      </div>

      <div
        className={cl(
          "fixed inset-0 z-[1010] h-full w-screen bg-gray-900 transition-opacity",
          { "visible opacity-50": open, "invisible opacity-0": !open }
        )}
      />
    </>
  );
};

export default Toggle;
