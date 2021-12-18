import { BodyShort } from "@navikt/ds-react";
import Color from "color";
import styled from "styled-components";
import { DsColor } from "../../../../lib/autogen-types";
import CopyButton from "../../code/CopyButton";

const format = (val: "hex" | "rgb" | "cmyk" | "hsla", color: DsColor) => {
  switch (val) {
    case "hex":
      return Color(color.color_value).hex().toString();
    case "rgb":
      return Color(color.color_value).rgb().toString();
    case "cmyk":
      return Color(color.color_value).cmyk().round().toString();
    case "hsla":
      return Color(color.color_value).hsl().round().toString();
    default:
      return color.color_value;
  }
};

const ScWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ScBox = styled.div`
  width: 13rem;
  height: 6rem;
  background-color: var(--navds-semantic-color-canvas-background);
  position: relative;
`;

const ScCode = styled.code`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-size: 1rem;
`;

const ScName = styled(BodyShort)`
  padding: 1rem;
`;

const ColorFormats = ({ color }: { color: DsColor }) => {
  return (
    <ScWrapper>
      <ScBox>
        <ScName size="small">HEX:</ScName>
        <CopyButton content={format("hex", color)} inverted />
        <ScCode>{format("hex", color)}</ScCode>
      </ScBox>
      <ScBox>
        <ScName size="small">RGB:</ScName>
        <CopyButton content={format("rgb", color)} inverted />
        <ScCode>{format("rgb", color)}</ScCode>
      </ScBox>
      <ScBox>
        <ScName size="small">HSLA:</ScName>
        <CopyButton content={format("hsla", color)} inverted />
        <ScCode>{format("hsla", color)}</ScCode>
      </ScBox>
    </ScWrapper>
  );
};

export default ColorFormats;
