import React, { useState, useEffect, useRef } from "react";
import { withDocument } from "part:@sanity/form-builder";
import {
  Stack,
  Checkbox,
  Radio,
  Flex,
  Text,
  Box,
  Button,
  Inline,
  Label,
  Autocomplete,
} from "@sanity/ui";
import styled from "styled-components";
import { situations } from "../schemas/documents/god-praksis/situations";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";
import SanityConfig from "../sanity.json";
import client from "@sanity/client";
import { Close } from "@navikt/ds-icons";

const PaddedDiv = styled.div`
  /* margin-left: 1rem; */
  padding: 0.5rem 1rem;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ButtonTag = styled.button`
  padding: 0.5rem 1.5rem;
  background: none;
  border: none;
  background-color: var(--navds-color-blue-10);
  border-radius: 4px;
  border: 1px solid var(--navds-color-blue-20);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  :hover {
    background-color: var(--navds-color-blue-20);
  }

  :focus {
    outline: 3px solid var(--navds-color-blue-80);
  }

  :active {
    background-color: var(--navds-color-blue-30);
  }
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

const sanityClient = client({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

export const CustomCategories = React.forwardRef((props, ref) => {
  const [state, setState] = useState([]);
  const [clientData, setClientData] = useState(null);
  const [fieldTags, setFieldTags] = useState([]);

  const handleSitChange = (e) => {
    const value = e;
    console.log(value);
    state.find((x) => x.name === value)
      ? setState([...state.filter((x) => x.name !== value)])
      : setState([...state, { name: value, phase: null }]);
  };

  const handlePhaseChange = (e, sit) => {
    /* console.log(state, e, sit);
    const index = state.findIndex((x) => x.name === sit);
    console.log(index);
    if (index === -1) return;
    const arr = [...state];
    arr[index].phase = e;
    setState([...arr]); */
    /*props.onChange(createPatchFrom(state)); */
  };

  const update = async () => {
    const query = `*[_id == "gp_situation_doc"][0]`;
    sanityClient.fetch(query).then((x) => {
      x.situations &&
        x.fields &&
        setClientData({ situations: x.situations, fields: x.fields });
    });
  };

  useEffect(() => {
    const query = `*[_id == "gp_situation_doc"][0]`;
    sanityClient.fetch(query).then((x) => {
      x.situations &&
        x.fields &&
        setClientData({ situations: x.situations, fields: x.fields });
    });
  }, []);

  const handleSelect = (value) => {
    fieldTags.indexOf(value) === -1 && setFieldTags([...fieldTags, value]);
  };

  const handleRemoveTag = (value) => {
    setFieldTags([...fieldTags.filter((x) => x !== value)]);
  };

  if (!clientData) return null;

  return (
    <Stack space={[4, 4]} ref={ref}>
      <Text size={2}>Lagrer ikke innholdet enda..</Text>
      <Stack space={[6]}>
        <Stack space={3}>
          <Text size={2}>Situasjoner og Faser</Text>
          <Stack space={[2, 2]}>
            {clientData.situations.map((s) => {
              return (
                <div key={s.title}>
                  <Flex align="center">
                    <Checkbox
                      id={s.title}
                      checked={
                        !!state.find((x) => x.name === s.title.toLowerCase())
                      }
                      style={{ display: "block" }}
                      onChange={() => handleSitChange(s.title.toLowerCase())}
                    />
                    <Box flex={1} paddingLeft={3}>
                      <Text>
                        <Label htmlFor="checkbox">{s.title}</Label>
                      </Text>
                    </Box>
                  </Flex>

                  {state.find((x) => x.name === s.title.toLowerCase()) && (
                    <PaddedDiv>
                      <Stack space={[2]}>
                        {s.phases.map((phase, x) => {
                          return (
                            <Flex align="center">
                              <Radio
                                key={phase}
                                value={phase.toLowerCase()}
                                name={phase}
                                id={phase.toLowerCase()}
                                checked={
                                  state.find((x) => x.name === s.name)
                                    ?.phase === phase.toLowerCase()
                                }
                                onChange={() =>
                                  handlePhaseChange(phase.toLowerCase(), s.name)
                                }
                              />
                              <Box flex={1} paddingLeft={3}>
                                <Text>
                                  <Label htmlFor={phase.toLowerCase()}>{`Fase ${
                                    x + 1
                                  }: ${phase}`}</Label>
                                </Text>
                              </Box>
                            </Flex>
                          );
                        })}
                      </Stack>
                    </PaddedDiv>
                  )}
                </div>
              );
            })}
          </Stack>
        </Stack>
        <Stack space={3}>
          <Text size={2}>Fagfelt</Text>
          <Autocomplete
            fontSize={[2, 2, 3]}
            id="autocomplete-example"
            options={[...clientData?.fields.map((x) => ({ value: x }))]}
            placeholder="Søk etter fagfelt"
            onSelect={handleSelect}
            openButton
          />
          <Flex>
            <TagWrapper>
              {fieldTags.map((x) => (
                <ButtonTag onClick={() => handleRemoveTag(x)}>
                  <Close />
                  {x}
                </ButtonTag>
              ))}
            </TagWrapper>
          </Flex>
        </Stack>
        <Flex justify="flex-end">
          <Button
            mode="ghost"
            padding={[2]}
            onClick={() => update()}
            text="Oppdater situasjoner og fagfelt"
          />
        </Flex>
      </Stack>
    </Stack>
  );
});

// Create the default export to import into our schema
export default withDocument(CustomCategories);
