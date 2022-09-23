import React, { useCallback } from "react";
import { Stack, Text, TextInput } from "@sanity/ui";
import { ObjectInputProps, set, unset } from "sanity/form";

type InputProps = ObjectInputProps & {
  value: {
    current: string;
  };
};

export function SlugInput(props: InputProps) {
  const { onChange, value = { current: "" }, elementProps } = props;
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(
        event.currentTarget.value
          ? set({ current: event.currentTarget.value })
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
    </Stack>
  );
}
