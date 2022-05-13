import { BodyShort, Button, Heading, Label, Textarea } from "@navikt/ds-react";
import cl from "classnames";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HelpfulArticleEnum, HelpfulArticleT } from "../../../lib";
import { AmplitudeEvents, logAmplitudeEvent } from "../utils";

const Feedback = ({
  docId,
  docType,
  center,
  akselFeedback = false,
}: {
  docId?: string;
  docType?: string;
  center?: boolean;
  akselFeedback?: boolean;
}): JSX.Element => {
  const { asPath, basePath } = useRouter();
  const [textValue, setTextValue] = useState("");
  const [activeState, setActiveState] = useState<HelpfulArticleEnum | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const timeoutTimer = useRef<number | null>();
  const [thanksFeedback, setThanksFeedback] = useState<boolean>(false);
  const textAreaRef = useRef(null);
  const [hasLoggedFeedback, setHasLoggedFeedback] = useState(false);

  const fetchFeedback = () => {
    const msg: HelpfulArticleT = {
      answer: activeState,
      message: textValue,
      url: `${basePath}${asPath}`,
      docId: docId,
      docType: docType,
    };

    fetch("/api/helpfulArticleFeedback", {
      method: "POST",
      body: JSON.stringify(msg),
    });
  };

  const logFeedback = useCallback(
    (completed: boolean) => {
      !hasLoggedFeedback &&
        activeState &&
        logAmplitudeEvent(AmplitudeEvents.feedbackinteraksjon, {
          fra: asPath,
          valg: activeState,
          completed,
        });
    },
    [asPath, activeState, hasLoggedFeedback]
  );

  useEffect(() => {
    const callLogFeedback = () => logFeedback(false);

    window.addEventListener("beforeunload", callLogFeedback);
    return () => {
      window.removeEventListener("beforeunload", callLogFeedback);
    };
  }, [logFeedback]);

  const handleSend = (e) => {
    e.preventDefault();

    if (!(activeState === HelpfulArticleEnum.JA) && textValue === "") {
      setErrorMsg(
        "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet."
      );
      return;
    }
    setErrorMsg(null);

    fetchFeedback();

    logFeedback(true);
    setHasLoggedFeedback(true);

    setActiveState(null);
    setTextValue("");
    setThanksFeedback(true);
    timeoutTimer.current = window.setTimeout(() => {
      setThanksFeedback(false);
    }, 3000);

    return () => {
      if (timeoutTimer.current) {
        window.clearTimeout(timeoutTimer.current);
        timeoutTimer.current = null;
      }
    };
  };

  useEffect(() => {
    textValue && errorMsg && setErrorMsg(null);
  }, [textValue, errorMsg]);

  useEffect(() => {
    if (timeoutTimer.current && activeState) {
      setThanksFeedback(false);
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  }, [activeState]);

  useEffect(() => {
    activeState && textAreaRef.current && textAreaRef.current.focus();
    setErrorMsg(null);
  }, [activeState]);

  useEffect(() => {
    setActiveState(null);
    setTextValue("");
    setThanksFeedback(false);

    if (timeoutTimer.current) {
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  }, [asPath]);

  const getPlaceholder = () => {
    switch (activeState) {
      case HelpfulArticleEnum.JA:
        return "Er det noe du vil trekke frem? (valgfritt)";
      case HelpfulArticleEnum.DELVIS:
        return "Hva er det som mangler?";
      case HelpfulArticleEnum.NEI:
        return "Hva er det du ikke liker?";
      case HelpfulArticleEnum.MISC:
        return "Hva kan forbedres?";
      default:
        return "Hva kan forbedres?";
    }
  };

  if (!docId || !docType) return null;

  const classes = akselFeedback
    ? ""
    : cl(
        "algolia-ignore-index flex w-full max-w-[800px] items-center justify-center gap-4 bg-component-background-alternate p-4 pb-12 sm:px-8 sm:py-4",
        {
          "mt-44 mr-auto mb-16 ml-0 lg:mr-0 lg:ml-0": !center,
          "mx-auto mt-44 mb-16": center,
        }
      );

  return (
    <div className={classes}>
      <div className="flex w-full flex-col items-center gap-4">
        <Heading size="small" level="2">
          Var denne artikkelen til hjelp?
        </Heading>
        <div className="flex w-full justify-center gap-2 sm:gap-6">
          <button
            className={cl(
              "max-w-[8rem] flex-1 rounded-sm border-2 py-2 focus:border focus:outline-none",
              {
                "border-gray-900 bg-gray-900 text-text-inverted  focus:border-white focus:shadow-focus":
                  activeState === HelpfulArticleEnum.JA,
                "border-border bg-white hover:bg-gray-50 focus:shadow-focus":
                  activeState !== HelpfulArticleEnum.JA,
              }
            )}
            onClick={() => setActiveState(HelpfulArticleEnum.JA)}
          >
            <Label>Ja</Label>
          </button>
          <button
            className={cl(
              "max-w-[8rem] flex-1 rounded-sm border-2 py-2 focus:border focus:outline-none",
              {
                "border-gray-900 bg-gray-900 text-text-inverted  focus:border-white focus:shadow-focus":
                  activeState === HelpfulArticleEnum.DELVIS,
                "border-border bg-white hover:bg-gray-50 focus:shadow-focus":
                  activeState !== HelpfulArticleEnum.DELVIS,
              }
            )}
            onClick={() => setActiveState(HelpfulArticleEnum.DELVIS)}
          >
            <Label>Delvis</Label>
          </button>
          <button
            className={cl(
              "max-w-[8rem] flex-1 rounded-sm border-2 py-2 focus:border focus:outline-none",
              {
                "border-gray-900 bg-gray-900 text-text-inverted focus:border-white focus:shadow-focus":
                  activeState === HelpfulArticleEnum.NEI,
                "border-border bg-white hover:bg-gray-50 focus:shadow-focus":
                  activeState !== HelpfulArticleEnum.NEI,
              }
            )}
            onClick={() => setActiveState(HelpfulArticleEnum.NEI)}
          >
            <Label>Nei</Label>
          </button>
        </div>
        <button
          className={cl("rounded-sm px-2 py-2 focus:outline-none", {
            "border-gray-900 bg-gray-900 text-text-inverted focus:border-white focus:shadow-focus":
              activeState === HelpfulArticleEnum.MISC,
            "bg-gray-50  hover:bg-gray-200 focus:shadow-focus":
              activeState !== HelpfulArticleEnum.MISC,
          })}
          onClick={() => setActiveState(HelpfulArticleEnum.MISC)}
        >
          <Label size="small">
            Jeg vil foreslå forbedringer til artikkelen.
          </Label>
        </button>
        {activeState !== null && (
          <form className="mt-4 flex w-full max-w-sm flex-col gap-4">
            <Textarea
              ref={textAreaRef}
              error={errorMsg}
              label={getPlaceholder()}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              maxLength={600}
              minRows={3}
            />
            <Button className="mr-auto" onClick={handleSend}>
              Send inn svar
            </Button>
          </form>
        )}
        {thanksFeedback && (
          <BodyShort size="small">Takk for tilbakemeldingen!</BodyShort>
        )}
      </div>
    </div>
  );
};

export default Feedback;
