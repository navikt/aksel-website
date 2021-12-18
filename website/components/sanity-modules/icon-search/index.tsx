import * as Icons from "@navikt/ds-icons";
import meta from "@navikt/ds-icons/meta.json";
import { BodyLong, Detail, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AmplitudeEvents, useAmplitude } from "../..";
import DownloadButtons from "./DownloadButtons";
import Filter, { FilterT } from "./Filter";
import { categorizeIcons, CategoryT, IconMetaT } from "./iconCategories";
import ModalContent from "./ModalContent";

const ScIconSearch = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 864px;
  max-width: 62vw;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ScIcons = styled.div`
  grid-template-columns: repeat(auto-fit, 12rem);
  align-content: start;
  display: grid;
  column-gap: 16px;
  row-gap: 24px;
  justify-content: flex-start;
  padding: 2rem 0;
`;

const ScIcon = styled.button`
  height: 8rem;
  width: 12rem;
  flex-shrink: 1;
  border-radius: 4px;
  background: none;
  border: none;
  position: relative;
  cursor: pointer;

  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);

  svg {
    transition: font-size 0.2s ease-in-out;
    font-size: 2rem;
  }

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
    box-shadow: none;

    svg {
      font-size: 2.4rem;
    }
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--navds-semantic-color-focus);
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
  background-color: var(--navds-semantic-color-feedback-info-background);
  border-bottom-left-radius: 6px;
`;

const ScIconTexts = styled.div`
  text-align: center;
`;

const ScFlex = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  column-gap: 2rem;
  justify-content: space-between;
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
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const router = useRouter();
  const [visibleIcons, setVisibleIcons] = useState<IconMetaT[]>([]);
  const { logAmplitudeEvent } = useAmplitude();

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

  const logIconClick = useCallback((icon: string) => {
    logAmplitudeEvent(AmplitudeEvents.ikonklikk, {
      ikon: icon,
    });
  }, []);

  const handleSelect = useCallback(
    (icon: string) => {
      setSelectedIcon(icon);
      setOpen(true);
      setQuery(icon);
      logIconClick(icon);
    },
    [logIconClick]
  );

  const handlePageEntry = useCallback(
    (icon: string) => {
      setSelectedIcon(icon);
      setOpen(true);
      logIconClick(icon);
    },
    [logIconClick]
  );

  useEffect(() => {
    Modal.setAppElement("#__next");
    router.query.icon && handlePageEntry(router.query.icon as string);
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
          x?.name.toLowerCase().includes(filter.value) ||
          x?.pageName.toLowerCase().includes(filter.value) ||
          x?.description.toLowerCase().includes(filter.value)
      );
    }

    setVisibleIcons([...metaIcons]);
  };

  const categories: CategoryT[] = categorizeIcons(visibleIcons);

  return (
    <ScIconSearch>
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
                    className="vk-icon_button"
                  >
                    {isNew(i.created_at) && <ScNew>Ny!</ScNew>}
                    <ScIconInner>
                      <div>
                        <T title={i.name} />
                      </div>
                      <ScIconTexts>
                        <Detail size="small" className="vk-icon_button-detail">
                          {" "}
                          {getName(i.name)}
                        </Detail>
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
