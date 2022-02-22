import { createContext } from "react";
import {
  LayoutContextProps,
  PagePropsContextT,
  SectionContextT,
} from "../../../../lib";

export const PagePropsContext = createContext<PagePropsContextT>(null);

export const LayoutContext = createContext<LayoutContextProps | null>(null);

export const SectionContext = createContext<SectionContextT>({
  withinSection: false,
});
