import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Loading = () => {
  return <Button loading>Loading</Button>;
};

export default withDsExample(Loading);
