import { createContext } from "react";
import { PagePropsContextT, SectionContextT } from "@/lib";

export const PagePropsContext = createContext<PagePropsContextT>(null);

export const SectionContext = createContext<SectionContextT>({
  withinSection: false,
});

export const IdContext = createContext<{ id?: string }>(null);

export * from "./authprovider";
