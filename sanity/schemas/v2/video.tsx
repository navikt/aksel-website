import { VideoRoom } from "@navikt/ds-icons";

export default {
  name: "video",
  title: "Video",
  type: "object",
  icon: VideoRoom,
  fields: [
    {
      name: "webm",
      title: "Video i WebM format",
      description: "Vi anbefaler å bruke Webm formatet om mulig!",
      type: "file",
      options: {
        accept: "video/webm",
      },
    },
    {
      name: "fallback",
      title: "Video i Mp4 format (fallback)",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    },
    {
      name: "alt",
      title: "Alt tekst for skjermlesere",
      type: "string",
      options: {
        isHighlighted: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Videotekst",
      description: "Kort beskrivelse som vises rett under videon",
      type: "string",
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "transkripsjon",
      title: "Transkripsjon",
      description:
        "Hvis videoen inneholder lyd, anbelfaler vi å skrive en transkripsjon som kan leses under videoen.",
      type: "text",
      options: {
        isHighlighted: true,
      },
    },
  ],
};
