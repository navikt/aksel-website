export { default as slugger } from "./slugger";
export * from "./util";
export * from "./amplitude";
export * from "./hooks";
export * from "./contexts";

import nbLocale from "date-fns/locale/nb";
import { format } from "date-fns";

export const dateStr = (date: string) =>
  format(new Date(date), "d. MMM YYY", { locale: nbLocale });

export const isNew = (date: string) => {
  const date1 = new Date(date);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays <= 90;
};

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
