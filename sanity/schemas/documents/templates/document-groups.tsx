import { Settings, Link } from "@navikt/ds-icons";

export const groups = [
  {
    name: "innhold",
    title: "Innhold",
    /* icon: Settings, */
    /* hidden: ({currentUser, value, parent}) => true // optional */
  },
  {
    name: "metadata",
    title: "Metadata",
  },
  {
    name: "settings",
    title: "Instillinger",
    icon: Settings,
  },
  {
    name: "lenker",
    title: "Linking",
  },
  {
    name: "beta",
    title: "Beta",
    default: true,
  },
];
