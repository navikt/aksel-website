import { Close, Search } from "@navikt/ds-icons";
import { SearchField, SearchFieldInput } from "@navikt/ds-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutContext } from "../Layout";
import { HeaderContext } from "./Header";
import * as S from "./header.styles";

const HeaderSearchBar = (): JSX.Element => {
  const context = useContext(LayoutContext);
  const { openSearchBar, setOpenSearchBar } = useContext(HeaderContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setOpenSearchBar((openSearchBar) => !openSearchBar);
  };

  useEffect(() => {
    openSearchBar && inputRef.current && inputRef.current.focus();
  }, [openSearchBar]);

  const [value, setValue] = useState("");

  return (
    <>
      <>
        {openSearchBar && (
          <S.SearchField label="Sidesøk" hideLabel isMobile={context.isMobile}>
            <SearchFieldInput
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </S.SearchField>
        )}
      </>
      <S.SearchButton isMobile={context.isMobile} onClick={handleClick}>
        {!openSearchBar && (
          <Search
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
            focusable={false}
            aria-label="Søk ikon"
          />
        )}
        {openSearchBar && (
          <Close
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
            focusable={false}
            aria-label="Lukk søk ikon"
          />
        )}
        <span className="sr-only">Søk etter sider</span>
      </S.SearchButton>
    </>
  );
};

export default HeaderSearchBar;
