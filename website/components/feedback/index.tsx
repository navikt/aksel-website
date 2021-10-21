import * as S from "./feedback.styles";
import { Button, Heading } from "@navikt/ds-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LayoutContext } from "../templates/layout/Layout";
import { useRouter } from "next/router";

const Feedback = ({ docId }: { docId?: string }): JSX.Element => {
  if (!docId) return null;

  const context = useContext(LayoutContext);
  const { asPath } = useRouter();

  const [step, setStep] = useState(0);
  const [feedbackValue, setFeedbackValue] = useState("");
  const [feedbackType, setFeedbackType] = useState<
    "negative" | "positive" | null
  >(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePositiveClick = async () => {
    setFeedbackType("positive");
    setStep(1);
  };

  const handleNegativeClick = async () => {
    setFeedbackType("negative");
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    !feedbackValue && setErrorMsg("Tekstfelt må inneholde tekst.");

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        page: {
          _type: "reference",
          _ref: docId,
          _weak: true,
        },
        feedbacktype: feedbackType,
        comment: feedbackValue,
      }),
    });
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
    node && node.scrollIntoView();
  }, []);

  // TODO: Changing tab before timeout runs sets step to 3 after its "reset"
  useEffect(() => {
    step === 2 &&
      window.setTimeout(() => {
        setStep(3);
      }, 3000);
  }, [step]);

  useEffect(() => {
    setStep(0);
  }, [asPath]);

  if (step === 3) {
    return null;
  }

  return (
    <S.Wrapper isMobile={context.isMobile}>
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
      )}
      {step === 2 && (
        <>
          <Heading as="div" size="medium">
            Takk for tilbakemeldingen!
          </Heading>
        </>
      )}
    </S.Wrapper>
  );
};

export default Feedback;
