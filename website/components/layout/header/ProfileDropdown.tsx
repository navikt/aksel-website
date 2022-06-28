/* import { Logout } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { useContext } from "react";
import {
  AuthenticationContext,
  AuthenticationStatus,
} from "../../website-modules/utils";

const ProfileDropdown = ({ dark = false }: { dark?: boolean }) => {
  const context = useContext(AuthenticationContext);

  if (context.status !== AuthenticationStatus.IS_AUTHENTICATED) {
    return null;
  }

  return (
    <Button
      data-theme={dark ? "dark" : "light"}
      onClick={() => context.logout()}
      className="my-auto bg-transparent md:mx-4"
      variant="secondary"
    >
      <span className="hidden xs:block">Logg ut</span>
      <Logout title="Logg ut" className="block xs:hidden" />
    </Button>
  );
}; */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfileDropdown = ({ dark = false }: { dark?: boolean }) => null;

export default ProfileDropdown;
