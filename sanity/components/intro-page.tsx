import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { Stack } from "@sanity/ui";
import { withDocument } from "part:@sanity/form-builder";
import React, { HTMLAttributes, useEffect, useState } from "react";
import userStore from "part:@sanity/base/user";

interface ViewProps extends HTMLAttributes<HTMLDivElement> {}

const IntroPage = React.forwardRef<HTMLDivElement, ViewProps>((props, ref) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const setUserState = async () => {
      userStore.getCurrentUser().then((user) => setUser(user));
    };
    setUserState();
  }, []);

  return (
    <Stack ref={ref} space={[3, 1, 2, 4]}>
      <Heading level="2" size="medium" spacing>
        {`${
          user?.name ? `Hei ${user?.name}! ` : ""
        }Velkommen til Aksel sitt CMS.`}
      </Heading>
      {user?.roles && (
        <div>
          <Heading level="3" size="small" spacing>
            Du har nå disse rollene:
          </Heading>
          {user?.roles.map((x, i) => (
            <div key={i}>
              <Heading level="3" size="xsmall" spacing>
                {x?.title}
              </Heading>
              <BodyShort>{x?.description}</BodyShort>
            </div>
          ))}
        </div>
      )}
      <div style={{ borderTop: "1px solid #bbb" }} />
      <Heading level="3" size="small" spacing>
        Har du ikke de rollene du trenger?
      </Heading>
      <BodyLong>
        Hør med{" "}
        <Link href="https://nav-it.slack.com/archives/D010WEMSKMF">Ken</Link> på
        slack, eller bare send en melding til oss på{" "}
        <Link href="https://nav-it.slack.com/archives/C7NE7A8UF">
          #designsystem
        </Link>{" "}
        slack så fikser vi det.
      </BodyLong>
      <Heading level="3" size="small">
        Kom i gang
      </Heading>
      <BodyLong>
        VI har laget en{" "}
        <Link href="https://aksel.nav.no/blogg/starte-som-redaktor?tema=blogg">
          artikkel
        </Link>{" "}
        som viser hvordan du kommer i gang som redaktør i Aksel
      </BodyLong>
    </Stack>
  );
});

export default IntroPage;
