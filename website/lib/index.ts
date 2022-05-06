export * from "./sanity/queries";
export * from "./sanity/santiy";
export * from "./types/autogen-types";
export * from "./types/types";
export * from "./auth/auth";

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}
