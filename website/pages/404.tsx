import React, { useEffect } from "react";
import Error from "next/error";
import { AmplitudeEvents, logAmplitudeEvent } from "@/components";

function Page() {
  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.notfound, {
      side: window.location.pathname,
    });
  }, []);

  return (
    <div id="vk-notFoundId">
      <Error statusCode={404} title="Fant ikke siden" />
    </div>
  );
}

export default Page;
