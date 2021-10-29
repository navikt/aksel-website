import styled from "styled-components";
import * as Icons from "@navikt/ds-icons";
import { Detail, Modal } from "@navikt/ds-react";
import { LayoutContext } from "../templates/layout/Layout";
import { useContext, useEffect, useState } from "react";
import ModalContent from "./ModalContent";

const ScIconSearch = styled.div<{ $isTablet: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.$isTablet ? `width: 100%;` : `width: 864px; max-width: 60vw;`};
  position: relative;
`;

const ScIcons = styled.div`
  grid-template-columns: repeat(auto-fit, 160px);
  justify-content: space-between;
  align-content: start;
  display: grid;
  column-gap: 16px;
  row-gap: 24px;
  justify-content: space-around;
`;

const ScIcon = styled.button`
  height: 8rem;
  width: 10rem;
  flex-shrink: 1;
  border-radius: 4px;
  background: none;
  border: none;
  border: 1px solid transparent;

  /* box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14); */

  :hover {
    border: 1px solid var(--navds-color-gray-60);
    background-color: var(--navds-color-gray-10);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-color-blue-80);
  }
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
  const context = useContext(LayoutContext);

  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);
  useEffect(() => {
    selectedIcon && setOpen(true);
  }, [selectedIcon]);

  useEffect(() => {
    !open && setSelectedIcon(null);
  }, [open]);

  return (
    <ScIconSearch $isTablet={context.isTablet}>
      <ScIcons>
        {Object.keys(Icons).map((Icon, x) => {
          const T = Icons[Icon];
          return (
            <ScIcon key={x} onClick={() => setSelectedIcon(Icon)}>
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content>
          <ModalContent icon={selectedIcon} />
        </Modal.Content>
      </Modal>
    </ScIconSearch>
  );
};
export default IconSearch;
