import { useEffect } from "react";

const environment = process.env.NODE_ENV;

export const isProduction = () => {
  if (typeof window !== "undefined") {
    const url =
      window && window.location && window.location.href ? window.location.href : "";
    return (
      environment === "production" &&
      /verktoykasse-prototype-kenajoh.vercel.app/.test(url)
    );
  } else {
    return false;
  }
};

export function isTest(): boolean {
  return environment === "test";
}

export function isDevelopment(): boolean {
  return environment === "development";
}

// https://stackoverflow.com/questions/38588346/anchor-a-tags-not-working-in-chrome-when-using/38588927#38588927
// https://github.com/vercel/next.js/discussions/13134
function useScrollToHashOnPageLoad() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash;
        window.location.hash = "";
        window.location.hash = hash;
      }, 500);
    }
  }, []);
}

export default useScrollToHashOnPageLoad;
