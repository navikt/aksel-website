import React, { useEffect } from "react";
import Error from "next/error";
import { AmplitudeEvents, useAmplitude } from "../components";
import { useRouter } from "next/router";

function Page() {
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.notfound, {
      side: asPath,
    });
  }, [asPath]);

  return <Error statusCode={404} />;
}

export default Page;
