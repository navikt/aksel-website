import { Close, People } from "@navikt/ds-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import { useContext, useState } from "react";
import {
  AuthenticationContext,
  AuthenticationStatus,
} from "../../website-modules/utils";
import Toggle from "./menu/Toggle";

const ProfileDropdown = ({
  designsystem = false,
}: {
  designsystem?: boolean;
}) => {
  const [openProfile, setOpenProfile] = useState(false);
  const context = useContext(AuthenticationContext);

  const button = (
    <>
      {openProfile ? (
        <Close
          className="pointer-events-none text-2xl"
          aria-label="Lukk profil-meny"
        />
      ) : (
        <People
          className="pointer-events-none text-2xl"
          aria-label="Åpne profil-meny"
        />
      )}
    </>
  );

  if (context.status !== AuthenticationStatus.IS_AUTHENTICATED) {
    return null;
  }

  return (
    <Toggle
      isHamburger
      inverted={!designsystem}
      open={openProfile}
      setOpen={setOpenProfile}
      buttonContent={button}
      menu={
        <div className="pt-4">
          <dl>
            <Heading as="dt" size="xsmall" className="mx-4 mb-2">
              Bruker
            </Heading>
            <BodyShort className="mx-4">{context?.user?.name}</BodyShort>
            <BodyShort className="mx-4">{context?.user?.mail}</BodyShort>
          </dl>
          <hr className="mt-2 border-divider" />
          <button
            className="flex h-full w-full rounded-b px-4 py-4 text-link hover:bg-interaction-primary-hover-subtle focus:shadow-[inset_0_0_0_3px_var(--navds-global-color-blue-800)] focus:outline-none"
            onClick={() => context.logout()}
          >
            Logg ut
          </button>
        </div>
      }
    />
  );
};

export default ProfileDropdown;
