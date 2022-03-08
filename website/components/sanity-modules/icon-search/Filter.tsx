import { Search } from "@navikt/ds-icons";
import { TextField, ToggleGroup } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import { AmplitudeEvents, logAmplitudeEvent } from "../..";

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
    <div className="mb-8 flex w-full max-w-sm flex-col gap-4">
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
    </div>
  );
};
export default Filter;
