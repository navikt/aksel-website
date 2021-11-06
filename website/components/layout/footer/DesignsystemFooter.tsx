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
  background-color: var(--navds-color-gray-90);
  color: white;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ScLogoWrapper = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  height: 48px;
`;

const ScInner = styled.div`
  display: flex;
  row-gap: 3rem;
  column-gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;

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
    color: white;

    :focus {
      background-color: var(--navds-color-blue-10);
      color: var(--navds-color-gray-90);
    }
  }
`;

const ScPrimaryButton = styled(Button)`
  --navds-button-color-primary-background: var(--navds-color-blue-30);
  --navds-button-color-primary-background-hover: var(--navds-color-blue-40);
  --navds-button-color-primary-background-active: var(
    --navds-color-deepblue-40
  );
  --navds-button-color-primary-text: var(--navds-color-gray-90);
  --navds-shadow-focus: 0 0 0 2px var(--navds-color-blue-10);
  --navds-button-color-primary-border-focus: var(--navds-color-blue-10);
`;

const ScFieldset = styled(Fieldset)`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScStateCss = css`
  :hover {
    border-color: var(--navds-color-blue-10);
  }

  :focus {
    box-shadow: 0 0 0 3px var(--navds-color-blue-10);
  }
`;

const ScTextarea = styled(Textarea)`
  --navds-textarea-color-shadow-error: var(--navds-color-red-40);
  --navds-textarea-color-border-error: var(--navds-color-red-40);
  --navds-error-message-color-text: var(--navds-color-red-40);

  > * textarea {
    background-color: transparent;
    color: white;

    ${ScStateCss}
  }
`;

const ScTextField = styled(TextField)`
  > input {
    background-color: transparent;
    color: white;
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

    fetch("/api/dsContact", {
      method: "POST",
      body: JSON.stringify({
        comment: contactForm.content,
        mail: contactForm.mail,
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
                  label="Skriv til oss"
                  value={contactForm.content}
                  onChange={(e) => {
                    setContactForm({ ...contactForm, content: e.target.value });
                    e.target.value &&
                      !isEmpty(e.target.value, { ignore_whitespace: true }) &&
                      setContentError({ ...contentError, content: "" });
                  }}
                  maxLength={500}
                />
                <ScTextField
                  label="Vi svarer til e-post (ikke påkrevd)"
                  error={contentError.mail}
                  value={contactForm.mail}
                  onChange={(e) => {
                    setContactForm({ ...contactForm, mail: e.target.value });
                    e.target.value &&
                      isEmail(e.target.value) &&
                      setContentError({ ...contentError, mail: "" });
                  }}
                />
              </ScFieldset>
              <ScPrimaryButton>Send melding</ScPrimaryButton>
            </form>
          )}
        </ScRightColumn>
      </ScInner>
    </ScFooter>
  );
};

export default DesignsystemFooter;
