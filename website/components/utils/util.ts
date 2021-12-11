import { useEffect } from "react";

const environment = process.env.NODE_ENV;
const test = process.env.NEXT_PUBLIC_TEST;
export const isProduction = (): boolean => {
  if (typeof window !== "undefined") {
    const url =
      window && window.location && window.location.href
        ? window.location.href
        : "";
    return (
      environment === "production" &&
      /verktoykasse-prototype.dev.nav.no/.test(url)
    );
  } else {
    return false;
  }
};

export function isDevelopment(): boolean {
  return environment === "development";
}

export function isTest(): boolean {
  return test === "true";
}

// https://stackoverflow.com/questions/38588346/anchor-a-tags-not-working-in-chrome-when-using/38588927#38588927
// https://github.com/vercel/next.js/discussions/13134
export function useScrollToHashOnPageLoad(): void {
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        window.location.hash = "";
        window.location.hash = hash;
      }, 500);
    }
  }, []);
}
