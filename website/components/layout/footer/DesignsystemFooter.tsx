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
import NextLink from "next/link";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { NavLogoWhite } from "../..";

const ScFooter = styled.footer`
  width: 100%;
  background-color: var(--navds-semantic-color-canvas-background-inverted);
  color: var(--navds-semantic-color-text-inverted);
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ScLogoWrapper = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  height: 49px;
  margin-bottom: 4rem;
`;

const ScInner = styled.div`
  display: flex;
  row-gap: 3rem;
  column-gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1280px;

  > * {
    max-width: 500px;
    flex: 1 1 400px;
  }
`;

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
      color: var(--navds-semantic-color-text-default);
      box-shadow: 0 0 0 2px var(--navds-global-color-blue-200);
    }
  }
`;

const ScPrimaryButton = styled(Button)`
  --navds-button-color-secondary-text: var(
    --navds-semantic-color-text-inverted
  );
  --navds-button-color-secondary-text-hover: var(
    --navds-semantic-color-text-default
  );
  --navds-button-color-secondary-text-active: var(
    --navds-semantic-color-text-default
  );
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
    --navds-semantic-color-canvas-background-default
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
    box-shadow: inset 0 0 0 2px
        var(--navds-semantic-color-canvas-background-default),
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

    ${ScStateCss}
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

const DesignsystemFooter = () => {
  const [contactForm, setContactForm] = useState({ content: "", mail: "" });

  const [contentError, setContentError] = useState({ content: "", mail: "" });
  const [sent, setSent] = useState(false);

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

  return (
    <ScFooter>
      <ScInner>
        <div>
          <ScLogoWrapper>
            <NavLogoWhite aria-hidden />
          </ScLogoWrapper>
          <BodyLong spacing>
            Designsystemet holdes ved like med bidrag fra produkt-team. Derfor
            er “døra” åpen hele tia. Huk tak i oss på kontoret, på video eller
            send oss en melding.
          </BodyLong>
          <BodyLong>Tusen takk for alle som bidrar!</BodyLong>
        </div>
        <ScRightColumn>
          <div>
            <Label spacing>Hvordan komme i kontakt?</Label>
            <BodyShort as="ul">
              <li>5. etg. bygg A</li>
              <li>
                <NextLink
                  href="https://nav-it.slack.com/archives/C7NE7A8UF"
                  passHref
                >
                  <Link>Designsystemet på Slack</Link>
                </NextLink>
              </li>
            </BodyShort>
          </div>
          {sent ? (
            <div>
              <Label spacing>Melding er sendt til designsystemet</Label>
              <BodyLong>
                Takk skal du ha! Vi svarer deg så fort som mulig.
              </BodyLong>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e)}>
              <ScFieldset
                legend="Send en melding til designsystemet."
                hideLegend
              >
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
                  minRows={2}
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
              <ScPrimaryButton variant="secondary">
                Send melding
              </ScPrimaryButton>
            </form>
          )}
        </ScRightColumn>
      </ScInner>
    </ScFooter>
  );
};

export default DesignsystemFooter;
