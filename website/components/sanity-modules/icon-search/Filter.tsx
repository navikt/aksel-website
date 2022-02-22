import { Search } from "@navikt/ds-icons";
import { TextField, ToggleGroup } from "@navikt/ds-react";
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
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-4 left-4 text-large"
        />
        <TextField
          className="icon-search__textfield"
          label="Søk i alle NAV-ikoner"
          hideLabel
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <ToggleGroup onChange={setToggle} size="small" defaultValue="outline">
        <ToggleGroup.Item value="outline">Outline</ToggleGroup.Item>
        <ToggleGroup.Item value="filled">Filled</ToggleGroup.Item>
        <ToggleGroup.Item value="stroke">Stroke</ToggleGroup.Item>
      </ToggleGroup>
    </ScFilter>
  );
};
export default Filter;
