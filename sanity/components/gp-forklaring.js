import { Heading, Stack, Text } from "@sanity/ui";
import { withDocument } from "part:@sanity/form-builder";
import React from "react";

const CustomDisplay = React.forwardRef((props, ref) => {
  return (
    <Stack space={0} ref={ref} space={[3, 1, 2, 4]}>
      <Heading as="h2" size={2}>
        God Praksis
      </Heading>

      <Text size={2}>
        IA-en for God Praksis er ikke helt på plass enda, men er mulig å skrive
        artikler og teste dem fortsatt.
      </Text>

      <Text size={2}>
        Trykk på `preview`-knappen litt opp på siden og se hvordan artikkelen
        ser ut på nettsiden uten å måtte publisere den.
      </Text>
    </Stack>
  );
});

export default withDocument(CustomDisplay);
