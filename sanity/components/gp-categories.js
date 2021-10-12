import React, { useState } from "react";
import { withDocument } from "part:@sanity/form-builder";
import { TextInput, Stack, Label } from "@sanity/ui";
import { CheckboxGroup, Checkbox } from "@navikt/ds-react";
import styled from "styled-components";
import { situations } from "../schemas/documents/god-praksis/situations";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";

const PaddedCheckboxGroup = styled(CheckboxGroup)`
  margin-left: 2rem;
`;

/*
type categoryT = {
  test_Categories: {
    sitation_name: string;
    phases: string[]
  }[]
}s
*/

/*
 "test_Categories": [
    {
      "sitation_name": "produkt1"
      "phases": [
        "phase1",
        "phase2"
      ],
    }
  ],
*/

const createPatchFrom = (value) =>
  PatchEvent.from(value === "" ? unset() : set(value));

export const MyCustomString = React.forwardRef((props, ref) => {
  const [sit, setSit] = useState([]);

  const handleSitChange = (e) => {
    const value = e.target.value;
    sit.includes(value)
      ? setSit(sit.filter((v) => v !== value))
      : setSit([...sit, value]);
  };

  const handlePhaseChange = (e) => {
    return;
  };

  console.log(props);

  return (
    <Stack space={2} ref={ref}>
      <CheckboxGroup legend="Kategorier" size="medium">
        {situations.map((s) => {
          return (
            <div key={s.name}>
              <Checkbox value={s.name} onChange={handleSitChange}>
                {s.title}
              </Checkbox>
              {sit.includes(s.name) && (
                <PaddedCheckboxGroup
                  legend={`Faser for ${s.title}`}
                  size="small"
                  hideLegend
                >
                  {s.phases.map((p) => {
                    return (
                      <Checkbox
                        key={p.name}
                        onChange={handlePhaseChange}
                        value={p.name}
                      >
                        {`Fase ${p.phase}: ${p.title}`}
                      </Checkbox>
                    );
                  })}
                </PaddedCheckboxGroup>
              )}
            </div>
          );
        })}
      </CheckboxGroup>
    </Stack>
  );
});

// Create the default export to import into our schema
export default withDocument(MyCustomString);
