import { Label } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Label spacing>The red fox jumps over the lazy brown dog.</Label>
      <Label>The red fox jumps over the lazy brown dog.</Label>
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
