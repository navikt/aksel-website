import { Detail, SearchField } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AmplitudeEvents, useAmplitude } from "../..";

const ScFilter = styled.div`
  margin-bottom: 2rem;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ScToggleGroup = styled(Detail)`
  display: flex;

  > :first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  > :last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: none;
  }
`;

export const ScToggle = styled.button`
  padding: calc(0.5rem - 2px) 1rem;
  box-shadow: inset 0 0 0 1px var(--navds-semantic-color-border);
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: var(--navds-semantic-color-text);
  border: none;

  :not(:first-child) {
    margin-left: -1px;
  }

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    box-shadow: inset 0 0 0 1px var(--navds-semantic-color-border),
      0 0 0 1px var(--navds-semantic-color-canvas-background-light),
      0 0 0 4px var(--navds-semantic-color-focus);
    border-color: var(--navds-semantic-color-interaction-primary);
    z-index: 2;
    outline: none;
  }

  &[data-active="true"] {
    box-shadow: none;
    background-color: var(--navds-semantic-color-interaction-primary-selected);
    color: var(--navds-semantic-color-text-inverted);

    :focus {
      box-shadow: inset 0 0 0 2px
          var(--navds-semantic-color-interaction-primary-selected),
        0 0 0 1px var(--navds-semantic-color-canvas-background-light),
        0 0 0 4px var(--navds-semantic-color-focus);
    }
  }
`;

export interface FilterT {
  value: string;
  toggle: string;
}

const Filter = ({
  onFilterChange,
}: {
  onFilterChange: (v: FilterT) => void;
}) => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState("outline");
  const { logAmplitudeEvent } = useAmplitude();

  useEffect(() => {
    onFilterChange({
      value: value.toLowerCase(),
      toggle,
    });
  }, [value]);

  useEffect(() => {
    onFilterChange({
      value: value.toLowerCase(),
      toggle,
    });
  }, [toggle]);

  useEffect(() => {
    if (toggle === "outline" && value === "") return;
    logAmplitudeEvent(AmplitudeEvents.ikonsok, {
      toggle,
      value,
    });
  }, [toggle, value]);

  return (
    <ScFilter>
      <SearchField
        value={value}
        label="Søk i alle NAV-ikoner"
        onChange={(v) => setValue(v)}
      />
      <ScToggleGroup forwardedAs="div" size="small">
        <ScToggle
          className="navds-label navds-label--small"
          data-active={toggle === "outline"}
          aria-pressed={toggle === "outline"}
          onClick={() => setToggle("outline")}
          aria-label="Trykk for å filtrere for outline-ikoner"
        >
          Outline
        </ScToggle>
        <ScToggle
          className="navds-label navds-label--small"
          data-active={toggle === "filled"}
          aria-pressed={toggle === "filled"}
          onClick={() => {
            toggle === "filled" ? setToggle("outline") : setToggle("filled");
          }}
          aria-label="Trykk for å filtrere for filled-ikoner"
        >
          Filled
        </ScToggle>
        <ScToggle
          className="navds-label navds-label--small"
          data-active={toggle === "stroke"}
          aria-pressed={toggle === "stroke"}
          onClick={() => {
            toggle === "stroke" ? setToggle("outline") : setToggle("stroke");
          }}
          aria-label="Trykk for å filtrere for stroke-ikoner"
        >
          Stroke
        </ScToggle>
      </ScToggleGroup>
    </ScFilter>
  );
};
export default Filter;
