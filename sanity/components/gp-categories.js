import React, { useState, useEffect, useRef } from "react";
import { withDocument } from "part:@sanity/form-builder";
import {
  TextInput,
  Stack,
  Label,
  Checkbox,
  Radio,
  Flex,
  Text,
  Box,
  Card,
} from "@sanity/ui";
import styled from "styled-components";
import { situations } from "../schemas/documents/god-praksis/situations";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";

const PaddedDiv = styled.div`
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
    console.log(value);
    state.find((x) => x.name === value)
      ? setState([...state.filter((x) => x.name !== value)])
      : setState([...state, { name: value, phase: null }]);
  };

  const handlePhaseChange = (e, sit) => {
    /* const index = state.findIndex((x) => x.name === sit);
    if (index === -1) return;
    const arr = [...state];
    arr[index].phase = e;
    setState([...arr]);
    props.onChange(createPatchFrom(state)); */
  };

  useEffect(() => {
    if (props.value && !gotState.current) {
      gotState.current = true;
      props.value && setState([...props.value]);
    }
  }, [props.value]);

  console.log(state);
  return (
    <Stack space={2} ref={ref}>
      <Card padding={4}>
        {situations.map((s) => {
          return (
            <div key={s.name}>
              <Flex align="center">
                <Checkbox
                  id={s.name}
                  checked={!!state.find((x) => x.name === s.name)}
                  style={{ display: "block" }}
                  onChange={() => handleSitChange(s.name)}
                />
                <Box flex={1} paddingLeft={3}>
                  <Text>
                    <label htmlFor="checkbox">{s.title}</label>
                  </Text>
                </Box>
              </Flex>

              {state.find((x) => x.name === s.name) && (
                <PaddedDiv
                  legend={`Faser for ${s.title}`}
                  size="small"
                  hideLegend
                  onChange={(e) => handlePhaseChange(e, s.name)}
                  value={state.find((x) => x.name === s.name)?.phase}
                >
                  {s.phases.map((p) => {
                    return (
                      <Flex align="center">
                        <Radio
                          key={p.name}
                          value={p.name}
                          name={p.title}
                          id={p.name}
                          checked={
                            state.find((x) => x.name === s.name)?.phase ===
                            p.name
                          }
                          onChange={() => handlePhaseChange(p.name, s)}
                        />
                        <Box flex={1} paddingLeft={3}>
                          <Text>
                            <label
                              htmlFor={p.name}
                            >{`Fase ${p.phase}: ${p.title}`}</label>
                          </Text>
                        </Box>
                      </Flex>
                    );
                  })}
                </PaddedDiv>
              )}
            </div>
          );
        })}
      </Card>
    </Stack>
  );
});

// Create the default export to import into our schema
export default withDocument(MyCustomString);
