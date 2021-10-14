import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import {
  TextInput,
  Stack,
  Label,
  Checkbox,
  Radio,
  Flex,
  Text,
  Box,
  Inline,
  Button,
  Card,
  Badge,
} from "@sanity/ui";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";
import styled from "styled-components";
import moment from "moment";

const CustomDisplay = React.forwardRef((props, ref) => {
  const click = () => {
    props.onChange &&
      props.onChange(
        PatchEvent.from(set(new Date().toISOString().split("T")[0]))
      );
  };

  const lastUpdate = moment(props.value);
  const outDated = moment(props.value).add(180, "days");
  const toStagnant = outDated.diff(lastUpdate, "days");

  return (
    <Stack tabIndex={0} space={4} ref={ref}>
      {toStagnant <= toStagnant / 2 && (
        <Card
          padding={[3, 3, 4]}
          radius={2}
          shadow={1}
          tone={toStagnant < 0 ? "critical" : "caution"}
        >
          <Text align="center" size={[2, 2, 3]}>
            {toStagnant < 0
              ? "Innholdet er utdatert!"
              : "Innholdet er stagnert!"}
          </Text>
        </Card>
      )}
      <Stack space={4}>
        <Text size={1} weight="semibold">
          Sist oppdatert
        </Text>
        <Text size={2}>{props.value?.split("-").reverse().join("/")}</Text>
      </Stack>

      <Inline space={[3, 3, 4]}>
        <Button
          onClick={() => click()}
          fontSize={[2]}
          mode="ghost"
          padding={[2, 2]}
          text="Oppdater"
        />
      </Inline>
    </Stack>
  );
});

export default CustomDisplay;
