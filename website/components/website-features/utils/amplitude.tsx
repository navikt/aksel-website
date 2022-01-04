import React, { createContext, useContext, useEffect } from "react";
import amplitude from "amplitude-js";
import { PagePropsContext } from "../../../pages/_app";
import { isDevelopment, isTest } from ".";

/* TODO: Denne skal kunne fjernes når appen er lastet opp til Nais */
const defaultConfig = {
  app: "verktoykassen",
  team: "designsystem",
};

const initAmplitude = () => {
  if (amplitude) {
    amplitude.getInstance().init("default", "", {
      apiEndpoint: "amplitude.nav.no/collect-auto",
      saveEvents: false,
      includeUtm: true,
      includeReferrer: true,
      platform: window.location.toString(),
    });
  }
};

function logAmplitudeEvent(eventName: string, data?: any): Promise<any> {
  return new Promise(function (resolve: any) {
    const eventData = data
      ? { ...data, ...defaultConfig }
      : { ...defaultConfig };
    if (amplitude) {
      amplitude.getInstance().logEvent(eventName, eventData, resolve);
    }
  });
}

const AmplitudeContext = createContext(null);

export function AmplitudeProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <AmplitudeContext.Provider value={{ logAmplitudeEvent }}>
      {children}
    </AmplitudeContext.Provider>
  );
}

export function useAmplitude(): any {
  const context = useContext(AmplitudeContext);
  const { pageProps } = useContext(PagePropsContext);

  if (pageProps?.preview || isDevelopment() || isTest()) {
    return { logAmplitudeEvent: () => undefined };
  }

  if (context === undefined) {
    throw new Error("useAmplitude må brukes under en AmplitudeProvider");
  }

  return context;
}

export enum AmplitudeEvents {
  "sidevisning" = "sidevisning",
  "navigasjon" = "navigasjon",
  "notfound" = "notfound",
  "ankerklikk" = "ankerklikk",
  "ikonklikk" = "ikonklikk",
  "fargeklikk" = "fargeklikk",
  "ikonnedlastning" = "ikonnedlastning",
  "feedbackinteraksjon" = "feedbackinteraksjon",
}
