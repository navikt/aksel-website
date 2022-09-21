import { EditFilled } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Button icon={<EditFilled aria-hidden />}>Rediger</Button>;
};

export default withDsExample(Example);
