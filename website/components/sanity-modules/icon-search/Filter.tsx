import { AmplitudeEvents, logAmplitudeEvent } from "@/components";
import { Search, ToggleGroup } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";

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
    <div className="mb-4 flex w-full max-w-sm flex-col gap-4">
      <div className="relative">
        <Search
          variant="simple"
          label="Søk i alle NAV-ikoner"
          value={value}
          onChange={(e) => setValue(e)}
        />
      </div>
      <ToggleGroup onChange={setToggle} size="small" defaultValue="outline">
        <ToggleGroup.Item value="outline">Outline</ToggleGroup.Item>
        <ToggleGroup.Item value="filled">Filled</ToggleGroup.Item>
        <ToggleGroup.Item value="ny">Nye ikoner</ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
};
export default Filter;
