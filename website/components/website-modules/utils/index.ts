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

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getGradient = (s: string) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  const h2 = h + (5 % 360);

  return `linear-gradient(-45deg, hsl(${h2}, 70%, 70%) 0%, hsl(${h}, 80%, 80%) 100%)`;
};
