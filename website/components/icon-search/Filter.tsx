import { Close, Search as SearchIcon } from "@navikt/ds-icons";
import { Detail, TextField } from "@navikt/ds-react";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const ScFilter = styled.div`
  margin-bottom: 2rem;
  max-width: 400px;
`;

const ScTextField = styled(TextField)`
  position: relative;
  width: 100%;
  > input {
    border-radius: 4px 0 0 4px;
    padding: 0 1rem 0 3rem;
    border-right: none;
  }

  > input:hover {
    border-color: var(--navds-color-gray-90);
  }

  > input:focus {
    /* box-shadow: inset 0 0 0 2px var(--navds-color-gray-90),
      0 0 0 3px var(--navds-color-blue-20); */
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
  border: 1px solid var(--navds-color-gray-60);
  border-left: none;
  background-color: white;
  z-index: auto;
  margin-top: auto;

  :hover {
    background-color: var(--navds-color-gray-10);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-color-blue-80);
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
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: 1px solid var(--navds-color-gray-60);
    }
  }

  :hover > * {
    border-color: var(--navds-color-gray-90);
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
  padding: calc(0.5rem - 1px) 1rem;
  box-shadow: inset 0 0 0 1px var(--navds-color-gray-60);
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: var(--navds-color-blue-50);
  border: none;

  :not(:first-child) {
    margin-left: -1px;
  }

  :focus {
    box-shadow: inset 0 0 0 1px var(--navds-color-gray-60), 0 0 0 1px white,
      0 0 0 3px var(--navds-color-blue-80);
    border-color: var(--navds-color-blue-50);
    z-index: 2;
    outline: none;
  }

  &[data-active="true"] {
    box-shadow: inset 0 0 0 2px var(--navds-color-blue-50);
    background-color: var(--navds-color-blue-10);
    color: var(--navds-color-gray-90);

    :focus {
      box-shadow: inset 0 0 0 2px var(--navds-color-blue-50), 0 0 0 1px white,
        0 0 0 3px var(--navds-color-blue-80);
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
          data-active={toggle === "outline"}
          onClick={() => setToggle("outline")}
        >
          Outline
        </ScToggle>
        <ScToggle
          data-active={toggle === "filled"}
          onClick={() => {
            toggle === "filled" ? setToggle("outline") : setToggle("filled");
          }}
        >
          Filled
        </ScToggle>
        <ScToggle
          data-active={toggle === "stroke"}
          onClick={() => {
            toggle === "stroke" ? setToggle("outline") : setToggle("stroke");
          }}
        >
          Stroke
        </ScToggle>
      </ScToggleGroup>
    </ScFilter>
  );
};
export default Filter;
