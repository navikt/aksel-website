import * as S from "./feedback.styles";
import { Button, Heading } from "@navikt/ds-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LayoutContext } from "..";
import { useRouter } from "next/router";
import { FoundOnPageFeedbackT } from "../../lib";

const Feedback = ({
  docId,
  docType,
}: {
  docId?: string;
  docType?: string;
}): JSX.Element => {
  if (!docId || !docType) return null;

  const context = useContext(LayoutContext);
  const { asPath, basePath } = useRouter();
  const [step, setStep] = useState(0);
  const [feedbackValue, setFeedbackValue] = useState("");
  const [feedbackType, setFeedbackType] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePositiveClick = async () => {
    setFeedbackType(true);
    setStep(1);
  };

  const handleNegativeClick = async () => {
    setFeedbackType(false);
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedbackValue) {
      setErrorMsg("Tekstfelt må inneholde tekst.");
      return;
    }

    const msg: FoundOnPageFeedbackT = {
      answer: feedbackType,
      message: feedbackValue,
      url: `${basePath}${asPath}`,
      docId: docId,
      docType: docType,
    };

    fetch("/api/foundOrNotFeedback", {
      method: "POST",
      body: JSON.stringify(msg),
    });
    setFeedbackValue("");
    setStep(2);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (errorMsg && value) {
      setErrorMsg("");
    }
    setFeedbackValue(e.target.value);
  };

  const setFocus = useCallback((node: HTMLElement) => {
    node && node.focus();
  }, []);

  useEffect(() => {
    const timeout =
      step === 2 &&
      window.setTimeout(() => {
        setStep(3);
      }, 3000);
    return () => timeout && window.clearTimeout(timeout);
  }, [step]);

  useEffect(() => {
    setStep(0);
  }, [asPath]);

  return (
    <S.Wrapper isTablet={context.isTablet}>
      {step === 0 && (
        <S.InnerWrapper>
          <Heading level="3" size="medium" spacing>
            Fant du det du lette etter?
          </Heading>
          <S.ButtonWrapper>
            <Button variant="secondary" onClick={() => handlePositiveClick()}>
              Ja
            </Button>
            <Button variant="secondary" onClick={() => handleNegativeClick()}>
              Nei
            </Button>
          </S.ButtonWrapper>
        </S.InnerWrapper>
      )}
      {step === 1 && (
        <S.InnerWrapper>
          <S.Form>
            <S.FormItems>
              <S.Textarea
                ref={setFocus}
                error={errorMsg}
                label="Hva ønsket du å finne?"
                value={feedbackValue}
                onChange={(e) => handleChange(e)}
                maxLength={200}
                minRows={5}
              />
              <S.ButtonWrapper>
                <Button onClick={(e) => handleSubmit(e)}>Send svar</Button>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                >
                  Avbryt
                </Button>
              </S.ButtonWrapper>
            </S.FormItems>
          </S.Form>
        </S.InnerWrapper>
      )}
      {(step === 2 || step === 3) && (
        <>
          <S.Heading forwardedAs="div" size="medium" aria-hidden={step === 3}>
            Takk for tilbakemeldingen!
          </S.Heading>
        </>
      )}
    </S.Wrapper>
  );
};

export default Feedback;
