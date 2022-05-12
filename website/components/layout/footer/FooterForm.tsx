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
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

const FooterForm = () => {
  const [contactForm, setContactForm] = useState({ content: "", mail: "" });

  const [contentError, setContentError] = useState({ content: "", mail: "" });
  const [sent, setSent] = useState(false);
  const [hasWritten, setHasWritten] = useState(false);

  const { asPath, basePath } = useRouter();

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
        url: `${basePath}${asPath}`,
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
    <div className="flex max-w-xl flex-col gap-8">
      <div>
        <Label spacing>Hvordan komme i kontakt?</Label>
        <BodyShort as="div">
          <Link
            className="text-text-inverted focus:bg-blue-200 focus:text-text focus:shadow-focus focus:shadow-blue-200"
            href="https://nav-it.slack.com/archives/C7NE7A8UF"
          >
            Designsystemet på Slack
          </Link>
        </BodyShort>
      </div>
      {sent ? (
        <div>
          <Label spacing>Melding er sendt til designsystemet</Label>
          <BodyLong>Takk skal du ha! Vi svarer deg så fort som mulig.</BodyLong>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)} className="max-w-sm">
          <Fieldset
            className="mb-4 flex flex-col gap-4"
            legend="Send en melding til designsystemet."
            hideLegend
          >
            <Textarea
              className="inverted-textarea"
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
            <TextField
              className="inverted-textfield"
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
          </Fieldset>
          <Button variant="secondary" className="inverted-button">
            Send melding
          </Button>
        </form>
      )}
    </div>
  );
};

export default FooterForm;
