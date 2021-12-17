import { DsColor } from "../../../../lib/autogen-types";
import Color from "color";
import styled from "styled-components";
import copy from "copy-to-clipboard";
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
      return Color(color.color_value).hsl().toString();
    default:
      return color.color_value;
  }
};
const ScWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const ScBox = styled.div`
  width: 10rem;
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

const ScCopy = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  appearance: none;
  border: none;
  background: none;
  height: 32px;
  padding: 0.5rem;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--navds-semantic-color-focus);
  }
`;

const copyText = (content: string) =>
  copy(content, {
    format: "text/plain",
  });

const ColorFormats = ({ color }: { color: DsColor }) => {
  const copy = (text: string) => copyText(text);

  return (
    <ScWrapper>
      <ScBox>
        <ScCopy onClick={() => copy(format("hex", color))}>Copy</ScCopy>
        <ScCode>{format("hex", color)}</ScCode>
      </ScBox>
      <ScBox>
        <ScCopy onClick={() => copy(format("rgb", color))}>Copy</ScCopy>
        <ScCode>{format("rgb", color)}</ScCode>
      </ScBox>
      <ScBox>
        <ScCopy onClick={() => copy(format("cmyk", color))}>Copy</ScCopy>
        <ScCode>{format("cmyk", color)}</ScCode>
      </ScBox>
      <ScBox>
        <ScCopy onClick={() => copy(format("hsla", color))}>Copy</ScCopy>
        <ScCode>{format("hsla", color)}</ScCode>
      </ScBox>
    </ScWrapper>
  );
};

export default ColorFormats;
