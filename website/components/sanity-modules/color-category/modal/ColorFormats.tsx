import { BodyShort } from "@navikt/ds-react";
import Color from "color";
import { DsColor } from "../../../../lib";
import CopyButton from "../../code/CopyButton";

const format = (val: "hex" | "rgb" | "cmyk" | "hsla", color: DsColor) => {
  switch (val) {
    case "hex":
      return Color(color.color_value).hex().toString();
    case "rgb":
      return Color(color.color_value).rgb().toString();
    case "hsla":
      return Color(color.color_value).hsl().round().toString();
    default:
      return color.color_value;
  }
};

const ColorFormats = ({ color }: { color: DsColor }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative h-24 w-52 bg-canvas-background">
        <BodyShort className="p-4" size="small">
          HEX:
        </BodyShort>
        <CopyButton content={format("hex", color)} inverted />
        <code className="absolute bottom-4 left-4 text-medium">
          {format("hex", color)}
        </code>
      </div>
      <div className="relative h-24 w-52 bg-canvas-background">
        <BodyShort className="p-4" size="small">
          RGB:
        </BodyShort>
        <CopyButton content={format("rgb", color)} inverted />
        <code className="absolute bottom-4 left-4 text-medium">
          {format("rgb", color)}
        </code>
      </div>
      <div className="relative h-24 w-52 bg-canvas-background">
        <BodyShort className="p-4" size="small">
          HSL:
        </BodyShort>
        <CopyButton content={format("hsla", color)} inverted />
        <code className="absolute bottom-4 left-4 text-medium">
          {format("hsla", color)}
        </code>
      </div>
    </div>
  );
};

export default ColorFormats;
