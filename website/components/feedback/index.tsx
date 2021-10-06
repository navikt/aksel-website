import * as S from "./feedback.styles";
import { BodyShort, Button } from "@navikt/ds-react";
import { Success } from "@navikt/ds-icons";
import React, { useCallback, useState } from "react";

const Feedback = ({ docId }: { docId?: string }): JSX.Element => {
  if (!docId) return null;

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
        feebacktype: feedbackType,
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

  return (
    <S.Wrapper>
      {step === 0 && (
        <>
          <BodyShort>Fant du det du lette etter?</BodyShort>
          <Button variant="secondary" onClick={() => handlePositiveClick()}>
            Positiv
          </Button>
          <Button variant="secondary" onClick={() => handleNegativeClick()}>
            Negativ
          </Button>
        </>
      )}
      {step === 1 && (
        <S.Form>
          <S.FormItems>
            <S.Textarea
              ref={setFocus}
              error={errorMsg}
              label="Tilbakemelding"
              value={feedbackValue}
              onChange={(e) => handleChange(e)}
              maxLength={200}
            />
            <S.Buttons>
              <Button onClick={(e) => handleSubmit(e)}>Send svar</Button>
              <Button variant="secondary" onClick={() => setStep(2)}>
                Avbryt
              </Button>
            </S.Buttons>
          </S.FormItems>
        </S.Form>
      )}
      {step === 2 && (
        <>
          <Success />
          <BodyShort>Takk for tilbakemeldingen!</BodyShort>
        </>
      )}
    </S.Wrapper>
  );
};

export default Feedback;
