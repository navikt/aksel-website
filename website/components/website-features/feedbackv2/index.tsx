import * as S from "./feedback.styles";
import { BodyShort, Button, Heading, Label, Textarea } from "@navikt/ds-react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LayoutContext } from "../..";
import { useRouter } from "next/router";
import { FoundOnPageFeedbackT } from "../../../lib";
import styled, { css } from "styled-components";

const ScFeedback = styled.div<{ isTablet?: boolean }>`
  width: 100%;
  padding: 2rem 1rem 2rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-top: 1px solid var(--navds-semantic-color-border-muted);
  border-bottom: 1px solid var(--navds-semantic-color-border-muted);

  margin: ${(props) =>
    props.isTablet ? "4rem auto 4rem 0" : "4rem auto 4rem 0"};

  @media (max-width: 564px) {
    padding: 1rem;
  }
`;

const ScWidthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

const ScButtons = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 564px) {
    gap: 0.5rem;
  }

  > * {
    flex: 1 1;
    max-width: 8rem;
  }
`;

const ScStateCss = css`
  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :active {
    background-color: var(--navds-semantic-color-component-background-inverted);
    color: var(--navds-semantic-color-text-inverted);
    border-color: var(--navds-semantic-color-component-background-inverted);
  }

  :focus {
    outline: none;
    box-shadow: var(--navds-shadow-focus);
  }

  :focus:active {
    box-shadow: 0 0 0 1px white, var(--navds-shadow-focus);
  }
`;

const ScButton = styled.button<{ active?: boolean }>`
  color: var(--navds-semantic-color-text);
  background-color: var(--navds-semantic-color-component-background-light);
  border: 2px solid var(--navds-semantic-color-border);
  border-radius: 2px;
  min-height: 48px;
  cursor: pointer;

  ${ScStateCss}

  ${({ active }) =>
    active &&
    `
    background-color: var(--navds-semantic-color-component-background-inverted);
    color: var(--navds-semantic-color-text-inverted);
    border-color: var(--navds-semantic-color-component-background-inverted);

    :hover {
      background-color: var(--navds-semantic-color-component-background-inverted);
    }

    :focus {
      outline: none;
      box-shadow: 0 0 0 1px white, var(--navds-shadow-focus);
    }
  `}
`;

const ScButtonLabel = styled.button<{ active?: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem 1rem;
  border-radius: 2px;

  ${ScStateCss}

  ${({ active }) =>
    active &&
    `
    background-color: var(--navds-semantic-color-component-background-inverted);
    color: var(--navds-semantic-color-text-inverted);
    border-color: var(--navds-semantic-color-component-background-inverted);

    :hover {
      background-color: var(--navds-semantic-color-component-background-inverted);
    }

    :focus {
      outline: none;
      box-shadow: 0 0 0 1px white, var(--navds-shadow-focus);
    }
  `}
`;

const ScFormWrapper = styled.div`
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScSendButton = styled(Button)`
  margin-right: auto;
`;

enum FeedBackState {
  "JA" = "ja",
  "DELVIS" = "delvis",
  "NEI" = "nei",
  "MISC" = "misc",
}

const Feedback = ({
  docId,
  docType,
}: {
  docId?: string;
  docType?: string;
}): JSX.Element => {
  if (!docId || !docType) return null;

  const context = useContext(LayoutContext);
  const [textValue, setTextValue] = useState("");
  const [activeState, setActiveState] = useState<FeedBackState | null>(null);
  const timeoutTimer = useRef<number | null>();
  const [thanksFeedback, setThanksFeedback] = useState<boolean>(false);
  const textAreaRef = useRef(null);

  const handleSend = () => {
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
    if (timeoutTimer.current && activeState) {
      setThanksFeedback(false);
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  }, [activeState]);

  useEffect(() => {
    activeState && textAreaRef.current && textAreaRef.current.focus();
  }, [activeState]);

  const getPlaceholder = () => {
    switch (activeState) {
      case FeedBackState.JA:
        return "Så bra! Er det noe du vil trekke frem?";
      case FeedBackState.DELVIS:
        return "Hm.. Hva er det som mangler?";
      case FeedBackState.NEI:
        return "Kjipt! Hva e de du ikke liker?";
      case FeedBackState.MISC:
        return "Hva kan forbedres?";
      default:
        return "Hva kan forbedres?";
    }
  };

  return (
    <ScFeedback isTablet={context.isTablet}>
      <ScWidthWrapper>
        <Heading size="small" level="2">
          Var denne artikkelen til hjelp?
        </Heading>
        <ScButtons>
          <ScButton
            active={activeState === FeedBackState.JA}
            onClick={() => setActiveState(FeedBackState.JA)}
          >
            <Label>Ja</Label>
          </ScButton>
          <ScButton
            active={activeState === FeedBackState.DELVIS}
            onClick={() => setActiveState(FeedBackState.DELVIS)}
          >
            <Label>Delvis</Label>
          </ScButton>
          <ScButton
            active={activeState === FeedBackState.NEI}
            onClick={() => setActiveState(FeedBackState.NEI)}
          >
            <Label>Nei</Label>
          </ScButton>
        </ScButtons>
        <ScButtonLabel
          active={activeState === FeedBackState.MISC}
          onClick={() => setActiveState(FeedBackState.MISC)}
        >
          <Label size="small">
            Jeg vil foreslå forbedringer til artikkelen.
          </Label>
        </ScButtonLabel>
        <ScFormWrapper>
          {activeState !== null && (
            <Textarea
              ref={textAreaRef}
              /* error={errorMsg} */
              label="Skriv inn feedbacken du ønsker å gi."
              hideLabel
              placeholder={getPlaceholder()}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              maxLength={600}
              minRows={3}
            />
          )}
          {textValue !== "" && (
            <ScSendButton onClick={handleSend}>Send inn svar</ScSendButton>
          )}
        </ScFormWrapper>
        {thanksFeedback && (
          <BodyShort size="small">Takk for tilbakemeldingen!</BodyShort>
        )}
      </ScWidthWrapper>
    </ScFeedback>
  );
};

export default Feedback;
