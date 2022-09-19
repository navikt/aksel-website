import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Danger = () => {
  return <Button variant="danger">Danger</Button>;
};

export default withDsExample(Danger);
