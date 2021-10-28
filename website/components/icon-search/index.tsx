import styled from "styled-components";
import * as Icons from "@navikt/ds-icons";
import { Detail } from "@navikt/ds-react";
const ScIconSearch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ScIcons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ScIcon = styled.div`
  height: 8rem;
  width: 10rem;
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);
  border-radius: 4px;
`;

const ScIconInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  height: 100%;
  width: 100%;

  svg {
    font-size: 2rem;
  }
`;

const ScIconTexts = styled.div`
  text-align: center;
  > * {
    :last-child {
      color: var(--navds-color-gray-60);
    }
  }
`;

const getName = (name: string) => {
  return name.replace("Filled", "").replace("Outline", "");
};

const getTag = (name: string) => {
  switch (true) {
    case name.endsWith("Filled"):
      return "Filled";
    case name.endsWith("Outline"):
      return "Outline";
    case name.endsWith("Stroke"):
      return "Stroke";
    default:
      return "Outline";
  }
};

const IconSearch = () => {
  return (
    <ScIconSearch>
      <ScIcons>
        {Object.keys(Icons).map((Icon, x) => {
          const T = Icons[Icon];
          return (
            <ScIcon key={x}>
              <ScIconInner>
                <div>
                  <T />
                </div>
                <ScIconTexts>
                  <Detail size="small"> {getName(Icon)}</Detail>
                  <Detail size="small"> {getTag(Icon)}</Detail>
                </ScIconTexts>
              </ScIconInner>
            </ScIcon>
          );
        })}
      </ScIcons>
    </ScIconSearch>
  );
};
export default IconSearch;
