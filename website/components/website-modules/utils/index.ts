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

export const isNew = (date: string) => {
  const date1 = new Date(date);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays <= 90;
};
