import React, { useCallback } from "react";
import { Stack, Text, TextInput } from "@sanity/ui";
import { ObjectInputProps, set, unset } from "sanity/form";
import { useClient } from "sanity";

type InputProps = ObjectInputProps & {
  value: {
    current: string;
  };
};

export function SlugInput(props: InputProps) {
  const { onChange, value = { current: "" }, elementProps, schemaType } = props;
  const { options } = schemaType;
  const client = useClient({ apiVersion: "2022-09-14" });
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(
        event.currentTarget.value
          ? set({ current: `${options?.prefix}${event.currentTarget.value}` })
          : unset()
      ),
    [onChange]
  );

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value.current}
      />
      <Text size={1}>URL: {`${options?.prefix}${value.current}`}</Text>
    </Stack>
  );
}
