import * as Icons from "@navikt/ds-icons";
import meta from "@navikt/ds-icons/meta.json";
import { BodyLong, Detail, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DownloadButtons from "./DownloadButtons";
import Filter, { FilterT } from "./Filter";
import { categorizeIcons, CategoryT, IconMetaT } from "./iconCategories";
import ModalContent from "./ModalContent";
import { LayoutContext } from "..";

const ScIconSearch = styled.div<{ $isTablet: boolean }>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.$isTablet ? `width: 100%;` : `width: 864px; max-width: 62vw;`};
  position: relative;
`;

const ScIcons = styled.div`
  grid-template-columns: repeat(auto-fit, 160px);
  align-content: start;
  display: grid;
  column-gap: 16px;
  row-gap: 24px;
  justify-content: flex-start;
  padding: 2rem 0;
`;

const ScIcon = styled.button`
  height: 8rem;
  width: 10rem;
  flex-shrink: 1;
  border-radius: 4px;
  background: none;
  border: none;
  position: relative;

  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);

  svg {
    transition: font-size 0.2s ease-in-out;
    font-size: 2rem;
  }

  :hover {
    background-color: var(--navds-color-gray-10);
    box-shadow: none;

    svg {
      font-size: 2.4rem;
    }
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScIconInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  height: 100%;
  width: 100%;

  svg {
    font-size: 2rem;
  }
`;

const ScNew = styled(Detail)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
  font-weight: 400;
  background-color: var(--navds-color-lightblue-10);
  border-bottom-left-radius: 6px;
`;

const ScIconTexts = styled.div`
  text-align: center;
  > * {
    :last-child {
      color: var(--navds-color-gray-60);
    }
  }
`;

const ScFlex = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  column-gap: 2rem;
  justify-content: flex-start;
  width: 100%;
`;

const getName = (name: string) => {
  return name
    .replace("Filled", "")
    .replace("Outline", "")
    .replace("Stroke", "");
};

export const isNew = (date: string) => {
  const date1 = new Date(date);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays <= 90;
};

export const getTag = (name: string) => {
  switch (true) {
    case name.endsWith("Filled"):
      return "Filled";
    case name.endsWith("Outline"):
      return "Outline";
    case name.endsWith("Stroke"):
      return "Stroke";
    default:
      return "Outline";
  }
};

const IconSearch = () => {
  const context = useContext(LayoutContext);

  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const router = useRouter();
  const [visibleIcons, setVisibleIcons] = useState<IconMetaT[]>([]);

  const setQuery = useCallback((icon: string) => {
    const query = router.query;
    query.icon = icon;
    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  }, []);

  const handleSelect = useCallback((icon: string) => {
    setSelectedIcon(icon);
    setOpen(true);
    setQuery(icon);
  }, []);

  useEffect(() => {
    Modal.setAppElement("#__next");
    router.query.icon && handleSelect(router.query.icon as string);
    setVisibleIcons(meta.filter((x) => "Outline" === getTag(x.name)));
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedIcon(null);

    const query = router.query;
    delete query["icon"];

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleFilterChange = async (filter: FilterT) => {
    if (filter.toggle === "" && filter.value === "") {
      setVisibleIcons(meta);
      return;
    }

    let metaIcons = [...meta];

    metaIcons = metaIcons.filter(
      (x) => filter.toggle === getTag(x.name).toLowerCase()
    );

    if (filter.value) {
      metaIcons = metaIcons.filter(
        (x) =>
          x.name.toLowerCase().includes(filter.value) ||
          x.pageName.toLowerCase().includes(filter.value)
      );
    }

    setVisibleIcons([...metaIcons]);
  };

  const categories: CategoryT[] = categorizeIcons(visibleIcons);

  return (
    <ScIconSearch $isTablet={context.isTablet}>
      <ScFlex>
        <Filter onFilterChange={handleFilterChange} />
        <DownloadButtons />
      </ScFlex>
      {categories.length === 0 && <BodyLong spacing>Ingen treff...</BodyLong>}
      {categories.map((cat) => {
        return (
          <div key={cat.category}>
            <Heading level="3" size="small">
              {cat.category}
            </Heading>
            <ScIcons>
              {cat.icons.map((i) => {
                const T = Icons[i.name];
                return (
                  <ScIcon
                    key={i.created_at}
                    onClick={() => handleSelect(i.name)}
                  >
                    {isNew(i.created_at) && <ScNew>Ny!</ScNew>}
                    <ScIconInner>
                      <div>
                        <T />
                      </div>
                      <ScIconTexts>
                        <Detail size="small"> {getName(i.name)}</Detail>
                        <Detail size="small"> {getTag(i.name)}</Detail>
                      </ScIconTexts>
                    </ScIconInner>
                  </ScIcon>
                );
              })}
            </ScIcons>
          </div>
        );
      })}
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedIcon && <ModalContent icon={selectedIcon} />}
        </Modal.Content>
      </Modal>
    </ScIconSearch>
  );
};
export default IconSearch;
