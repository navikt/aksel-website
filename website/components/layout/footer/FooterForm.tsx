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
import NextLink from "next/link";

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
    <>
      <div>
        <Label spacing>Hvordan komme i kontakt?</Label>
        <BodyShort as="ul">
          <li>
            <Link
              className="text-text-inverted focus:bg-blue-200 focus:text-text focus:shadow-focus focus:shadow-blue-200"
              href="https://nav-it.slack.com/archives/C0370ADS0HX"
            >
              Aksel på Slack
            </Link>
          </li>
          <li>
            <Link
              className="text-text-inverted focus:bg-blue-200 focus:text-text focus:shadow-focus focus:shadow-blue-200"
              href="https://nav-it.slack.com/archives/C7NE7A8UF"
            >
              Designsystemet på Slack
            </Link>
          </li>
        </BodyShort>
      </div>
      <div className="flex w-full max-w-md flex-col gap-8" data-theme="dark">
        {sent ? (
          <div>
            <Label spacing>Melding er sendt til designsystemet</Label>
            <BodyLong>
              Takk skal du ha! Vi svarer deg så fort som mulig.
            </BodyLong>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)} className="w-full">
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
            <Button>Send melding</Button>
          </form>
        )}
        <div className="">
          © 2022 NAV |{" "}
          <NextLink href="/side/personvernserklaering" passHref>
            <a className="focus: p-1 outline-none hover:underline focus:bg-focus-inverted focus:text-text focus:no-underline">
              Personvernerklæring og informasjonskapsler
            </a>
          </NextLink>
        </div>
      </div>
    </>
  );
};

export default FooterForm;
