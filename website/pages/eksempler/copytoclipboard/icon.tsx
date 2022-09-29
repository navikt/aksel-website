import { Link } from "@navikt/ds-icons";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <CopyToClipboard
      icon={<Link title="kopier pi" />}
      copyText="3.14"
      popoverText="Kopierte PI"
    />
  );
};

export default withDsExample(Example);

export const args = {
  index: 3,
};
