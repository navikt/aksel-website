import { Header } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Header>
      <Header.Title as="h1">Sykepenger</Header.Title>
      <Header.User name="Ola Normann" className="ml-auto" />
    </Header>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
