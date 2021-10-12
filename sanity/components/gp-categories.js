import React, { useState, useEffect, useRef } from "react";
import { withDocument } from "part:@sanity/form-builder";
import { TextInput, Stack, Label } from "@sanity/ui";
import { CheckboxGroup, Checkbox, RadioGroup, Radio } from "@navikt/ds-react";
import styled from "styled-components";
import { situations } from "../schemas/documents/god-praksis/situations";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";

const PaddedRadioGroup = styled(RadioGroup)`
  margin-left: 1rem;
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

const createPatchFrom = (value) => PatchEvent.from(set(value));

export const MyCustomString = React.forwardRef((props, ref) => {
  const [state, setState] = useState([]);
  const gotState = useRef(false);

  const handleSitChange = (e) => {
    const value = e;
    let arr = [...state];
    arr = arr.filter((x) => value.includes(arr.name));
    arr = e.map((y) => {
      const tmp = arr.find((x) => x.name === y);
      return tmp ? tmp : { name: y, phase: null };
    });

    setState(arr);
    props.onChange(createPatchFrom(state));
  };

  const handlePhaseChange = (e, sit) => {
    const index = state.findIndex((x) => x.name === sit);
    if (index === -1) return;
    const arr = [...state];
    arr[index].phase = e;
    setState([...arr]);
    props.onChange(createPatchFrom(state));
  };

  useEffect(() => {
    if (props.value && !gotState.current) {
      gotState.current = true;
      props.value && setState([...props.value]);
    }
  }, [props.value]);

  return (
    <Stack space={2} ref={ref}>
      <CheckboxGroup
        legend="Kategorier"
        size="medium"
        value={[...state.map((x) => x.name)]}
        onChange={handleSitChange}
      >
        {situations.map((s) => {
          return (
            <div key={s.name}>
              <Checkbox value={s.name}>{s.title}</Checkbox>
              {state.find((x) => x.name === s.name) && (
                <PaddedRadioGroup
                  legend={`Faser for ${s.title}`}
                  size="small"
                  hideLegend
                  onChange={(e) => handlePhaseChange(e, s.name)}
                  value={state.find((x) => x.name === s.name)?.phase}
                >
                  {s.phases.map((p) => {
                    return (
                      <Radio key={p.name} value={p.name}>
                        {`Fase ${p.phase}: ${p.title}`}
                      </Radio>
                    );
                  })}
                </PaddedRadioGroup>
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
