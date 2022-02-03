import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
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

  console.log(user);

  return (
    <Stack ref={ref} space={[3, 1, 2, 4]}>
      <Heading level="2" size="medium" spacing>
        {`${
          user?.name ? `Hei ${user?.name}! ` : ""
        }Velkommen til Aksel sitt CMS`}
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
        Hør med Ken Aleksander Johansen på slack, eller bare send en melding til
        oss på #designsystem slack så fikser vi det.
      </BodyLong>
      <Heading level="3" size="small">
        Kom i gang
      </Heading>
      <BodyLong>
        Start med å legge deg selv til som redaktør under "redaktør/bidrag", da
        er det lettere å holde oversikten over artikler du har vært med å
        skrive!
      </BodyLong>
      <Heading level="3" size="small">
        Innhold
      </Heading>
      <BodyLong>
        Akkurat nå er det bare Designsystem-portalen som er oppe å går 100%.
        Dette vil si at man kan skrive og publisere innhold under "God praksis",
        men innholdet blir ikke lett tilgjengelig på design.nav.no.
      </BodyLong>
    </Stack>
  );
});

export default IntroPage;
