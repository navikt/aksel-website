import { createContext } from "react";
import { LayoutContextProps, PagePropsContextT } from "../../../../lib";

export const PagePropsContext = createContext<PagePropsContextT>(null);

export const LayoutContext = createContext<LayoutContextProps | null>(null);
