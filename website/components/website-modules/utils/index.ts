export { default as slugger } from "./slugger";
export * from "./util";
export * from "./amplitude";
export * from "./hooks";
export * from "./contexts";

import { DateTime } from "luxon";

export const dateStr = (date: string) => {
  const time = DateTime.fromISO(date);

  return time.setLocale("no").toLocaleString(DateTime.DATE_MED);
};
