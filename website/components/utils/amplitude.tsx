import { createContext, useContext, useEffect } from "react";

const amplitude =
  typeof window !== "undefined" ? require("amplitude-js") : () => null;

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
    const eventData = data ? { ...data } : {};
    if (amplitude) {
      amplitude.getInstance().logEvent(eventName, eventData, resolve);
    }
  });
}

const AmplitudeContext = createContext(null);

export function AmplitudeProvider({ children }) {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <AmplitudeContext.Provider value={{ logAmplitudeEvent }}>
      {children}
    </AmplitudeContext.Provider>
  );
}

export function useAmplitude() {
  const context = useContext(AmplitudeContext);
  // TODO: Implement this for preview?
  /* if (isTest()) {
    return { logAmplitudeEvent: () => undefined };
  } */

  if (context === undefined) {
    throw new Error("useAmplitude må brukes under en AmplitudeProvider");
  }
  return context;
}
