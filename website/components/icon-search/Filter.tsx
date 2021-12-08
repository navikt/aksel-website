import { Close, Search as SearchIcon } from "@navikt/ds-icons";
import { Detail, TextField } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const ScFilter = styled.div`
  margin-bottom: 2rem;
  max-width: 400px;
  width: 100%;
`;

const ScTextField = styled(TextField)`
  position: relative;
  width: 100%;

  > input {
    border-radius: 4px 0 0 4px;
    padding: 0 1rem 0 3rem;
    border-right: none;
  }

  > input:focus {
    z-index: 1;
  }
`;

const ScButtonCss = css`
  display: flex;
  border: none;
  flex-shrink: 0;
  width: var(--header-height);
  height: var(--header-height);
  justify-content: center;
  align-items: center;
`;

const ScCloseButton = styled.button`
  ${ScButtonCss}
  width: 48px;
  height: 48px;
  border: 1px solid var(--navds-semantic-color-border);
  border-left: none;
  background-color: var(--navds-semantic-color-canvas-background-light);
  z-index: auto;
  margin-top: auto;

  :hover {
    background-color: var(
      --navds-semantic-color-component-background-alternate
    );
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-semantic-color-focus);
    z-index: 2;
  }
`;

const ScSearchIcon = styled.div`
  ${ScButtonCss}
  width: 48px;
  height: 48px;
  background-color: transparent;
  left: 0;
  position: absolute;
  z-index: 1;
  bottom: 0;
`;

const ScTextFieldWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 1rem;

  > :last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;

    input {
      flex: 1 1;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: 1px solid var(--navds-semantic-color-border);

      :hover {
        border-color: var(--navds-semantic-color-interaction-primary-hover);
      }
    }
  }

  :hover > * {
    border-color: var(--navds-semantic-color-interaction-primary-hover);
  }
`;

const ScToggleGroup = styled(Detail)`
  display: flex;

  > :first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
  }
  > :last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: none;
  }
`;

const ScToggle = styled.button`
  padding: calc(0.5rem - 2px) 1rem;
  box-shadow: inset 0 0 0 1px var(--navds-semantic-color-border);
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: var(--navds-semantic-color-text);
  border: none;

  :not(:first-child) {
    margin-left: -1px;
  }

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    box-shadow: inset 0 0 0 1px var(--navds-semantic-color-border),
      0 0 0 1px var(--navds-semantic-color-canvas-background-light),
      0 0 0 4px var(--navds-semantic-color-focus);
    border-color: var(--navds-semantic-color-interaction-primary);
    z-index: 2;
    outline: none;
  }

  &[data-active="true"] {
    box-shadow: none;
    background-color: var(--navds-semantic-color-interaction-primary-selected);
    color: var(--navds-semantic-color-text-inverted);

    :focus {
      box-shadow: inset 0 0 0 2px
          var(--navds-semantic-color-interaction-primary-selected),
        0 0 0 1px var(--navds-semantic-color-canvas-background-light),
        0 0 0 4px var(--navds-semantic-color-focus);
    }
  }
`;

export interface FilterT {
  value: string;
  toggle: string;
}

const Filter = ({
  onFilterChange,
}: {
  onFilterChange: (v: FilterT) => void;
}) => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState("outline");

  useEffect(() => {
    onFilterChange({
      value: value.toLowerCase(),
      toggle,
    });
  }, [value]);

  useEffect(() => {
    onFilterChange({
      value: value.toLowerCase(),
      toggle,
    });
  }, [toggle]);

  return (
    <ScFilter>
      <ScTextFieldWrapper>
        <ScSearchIcon>
          <SearchIcon
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
            aria-label="Søk ikon"
            aria-hidden={true}
            role="img"
          />
        </ScSearchIcon>
        <ScTextField
          value={value}
          label="Søk i alle NAV-ikoner"
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <ScCloseButton onClick={() => setValue("")}>
            <Close
              style={{ fontSize: "1.5rem" }}
              role="img"
              aria-label="Lukk søk"
            />
            <span className="navds-sr-only">Lukk Søk</span>
          </ScCloseButton>
        )}
      </ScTextFieldWrapper>
      <ScToggleGroup forwardedAs="div" size="small">
        <ScToggle
          className="navds-label navds-label--small"
          data-active={toggle === "outline"}
          aria-pressed={toggle === "outline"}
          onClick={() => setToggle("outline")}
          aria-label="Trykk for å filtrere for outline-ikoner"
        >
          Outline
        </ScToggle>
        <ScToggle
          className="navds-label navds-label--small"
          data-active={toggle === "filled"}
          aria-pressed={toggle === "filled"}
          onClick={() => {
            toggle === "filled" ? setToggle("outline") : setToggle("filled");
          }}
          aria-label="Trykk for å filtrere for filled-ikoner"
        >
          Filled
        </ScToggle>
        <ScToggle
          className="navds-label navds-label--small"
          data-active={toggle === "stroke"}
          aria-pressed={toggle === "stroke"}
          onClick={() => {
            toggle === "stroke" ? setToggle("outline") : setToggle("stroke");
          }}
          aria-label="Trykk for å filtrere for stroke-ikoner"
        >
          Stroke
        </ScToggle>
      </ScToggleGroup>
    </ScFilter>
  );
};
export default Filter;
