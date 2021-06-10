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
