import {
  BodyLong,
  BodyShort,
  Button,
  Fieldset,
  Label,
  Link,
  Textarea,
  TextField,
} from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

const ScRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 608px;

  form {
    max-width: 350px;
  }

  a {
    color: var(--navds-semantic-color-text-inverted);

    :focus {
      background-color: var(--navds-global-color-blue-200);
      color: var(--navds-semantic-color-text);
      box-shadow: 0 0 0 2px var(--navds-global-color-blue-200);
    }
  }
`;

const ScPrimaryButton = styled(Button)`
  --navds-button-color-secondary-text: var(
    --navds-semantic-color-text-inverted
  );
  --navds-button-color-secondary-text-hover: var(--navds-semantic-color-text);
  --navds-button-color-secondary-text-active: var(--navds-semantic-color-text);
  --navds-button-color-secondary-border: var(
    --navds-semantic-color-component-background-light
  );
  --navds-button-color-secondary-border-focus-active-hover: var(
    --navds-semantic-color-component-background-light
  );
  --navds-button-color-secondary-background: var(
    --navds-semantic-color-component-background-inverted
  );
  --navds-button-color-secondary-background-hover: var(
    --navds-semantic-color-component-background-light
  );
  --navds-button-color-secondary-background-active: var(
    --navds-semantic-color-canvas-background
  );

  :focus {
    box-shadow: inset 0 0 0 2px
        var(--navds-semantic-color-component-background-light),
      0 0 0 1px var(--navds-semantic-color-component-background-inverted),
      0 0 0 3px var(--navds-global-color-blue-200);
  }

  :hover:focus {
    box-shadow: inset 0 0 0 2px
        var(--navds-semantic-color-component-background-light),
      0 0 0 1px var(--navds-semantic-color-component-background-inverted),
      0 0 0 3px var(--navds-global-color-blue-200);
  }

  :active:focus {
    box-shadow: inset 0 0 0 2px var(--navds-semantic-color-canvas-background),
      0 0 0 1px var(--navds-semantic-color-component-background-inverted),
      0 0 0 3px var(--navds-global-color-blue-200);
  }
`;

const ScFieldset = styled(Fieldset)`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScStateCss = css`
  :hover {
    border-color: var(--navds-global-color-blue-200);
  }

  :focus {
    box-shadow: 0 0 0 3px var(--navds-global-color-blue-200);
  }
`;

const ScTextarea = styled(Textarea)`
  --navds-textarea-color-shadow-error: var(--navds-global-color-red-300);
  --navds-textarea-color-border-error: var(--navds-global-color-red-400);
  --navds-error-message-color-text: var(--navds-global-color-red-300);

  > * textarea {
    background-color: transparent;
    color: var(--navds-semantic-color-text-inverted);
    ${ScStateCss};
  }
`;

const ScTextField = styled(TextField)`
  --navds-text-field-color-shadow-error: var(--navds-global-color-red-300);
  --navds-text-field-color-border-error: var(--navds-global-color-red-400);
  --navds-text-field-color-shadow-error: var(--navds-global-color-red-300);
  --navds-error-message-color-text: var(--navds-global-color-red-300);

  > input {
    background-color: transparent;
    color: var(--navds-semantic-color-text-inverted);
    ${ScStateCss}
  }
`;

const FooterForm = () => {
  const [contactForm, setContactForm] = useState({ content: "", mail: "" });

  const [contentError, setContentError] = useState({ content: "", mail: "" });
  const [sent, setSent] = useState(false);
  const [hasWritten, setHasWritten] = useState(false);

  const { asPath } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let fail = false;
    if (isEmpty(contactForm.content, { ignore_whitespace: true })) {
      setContentError({
        ...contentError,
        content: "Melding kan ikke være tom. Fyll inn meldingen.",
      });
      fail = true;
    }
    if (
      !isEmpty(contactForm.mail, { ignore_whitespace: true }) &&
      !isEmail(contactForm.mail)
    ) {
      setContentError({
        ...contentError,
        mail: "Email ikke gyldig.",
      });
      fail = true;
    }
    if (fail) return;
    setContentError({ content: "", mail: "" });

    fetch("/api/generalFeedback", {
      method: "POST",
      body: JSON.stringify({
        message: contactForm.content,
        user: contactForm.mail,
      }),
    });

    setContactForm({ content: "", mail: "" });
    setSent(true);
  };

  useEffect(() => {
    !hasWritten &&
      (contactForm.mail || contactForm.content) &&
      setHasWritten(true);
  }, [contactForm]);

  useEffect(() => {
    setHasWritten(false);
    setSent(false);
    setContactForm({ content: "", mail: "" });
    setContentError({ content: "", mail: "" });
  }, [asPath]);

  return (
    <ScRightColumn>
      <div>
        <Label spacing>Hvordan komme i kontakt?</Label>
        <BodyShort as="ul">
          {/* <li>5. etg. bygg A</li> */}
          <li>
            <Link href="https://nav-it.slack.com/archives/C7NE7A8UF">
              Designsystemet på Slack
            </Link>
          </li>
        </BodyShort>
      </div>
      {sent ? (
        <div>
          <Label spacing>Melding er sendt til designsystemet</Label>
          <BodyLong>Takk skal du ha! Vi svarer deg så fort som mulig.</BodyLong>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <ScFieldset legend="Send en melding til designsystemet." hideLegend>
            <ScTextarea
              error={contentError.content}
              autoComplete="off"
              label="Skriv til oss"
              value={contactForm.content}
              onChange={(e) => {
                setContactForm({ ...contactForm, content: e.target.value });
                e.target.value &&
                  !isEmpty(e.target.value, { ignore_whitespace: true }) &&
                  setContentError({ ...contentError, content: "" });
              }}
              minRows={3}
            />
            <ScTextField
              label="Vi svarer til e-post (valgfritt)"
              error={contentError.mail}
              value={contactForm.mail}
              autoComplete="work email"
              onChange={(e) => {
                setContactForm({ ...contactForm, mail: e.target.value });
                e.target.value &&
                  isEmail(e.target.value) &&
                  setContentError({ ...contentError, mail: "" });
              }}
            />
          </ScFieldset>
          {hasWritten && (
            <ScPrimaryButton variant="secondary">Send melding</ScPrimaryButton>
          )}
        </form>
      )}
    </ScRightColumn>
  );
};

export default FooterForm;
