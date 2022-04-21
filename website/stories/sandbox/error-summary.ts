import { SandboxComponent } from "./types";

const ErrorSummarySandbox: SandboxComponent = (props) => {
  const size = props.size === "small" ? ` size="small"` : "";
  const tag =
    props.Komposisjon === "Egen Heading-tag" ? ` headingTag="h3"` : "";
  const comp =
    /* html */
    `<ErrorSummary heading="Du må fikse disse feilene før du kan sende inn søknad."${size}${tag}>
    <ErrorSummary.Item href="#1">
      Felt må fylles ut med alder
    </ErrorSummary.Item>
    <ErrorSummary.Item href="#2">
      Tekstfeltet må ha en godkjent e-mail
    </ErrorSummary.Item>
  </ErrorSummary>`;

  return comp;
};

ErrorSummarySandbox.args = {
  props: {
    size: ["medium", "small"],
    Komposisjon: ["standard", "Egen Heading-tag"],
  },
};

export default ErrorSummarySandbox;
