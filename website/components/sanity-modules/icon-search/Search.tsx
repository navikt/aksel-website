import * as Icons from "@navikt/ds-icons";
import meta from "@navikt/ds-icons/meta.json";
import { BodyLong, Detail, Heading, Link, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { AmplitudeEvents, isNew, logAmplitudeEvent } from "../..";
import DownloadButtons from "./DownloadButtons";
import Filter, { FilterT } from "./Filter";
import { categorizeIcons, CategoryT, IconMetaT } from "./iconCategories";
import ModalContent from "./ModalContent";

const getName = (name: string) => {
  return name
    .replace("Filled", "")
    .replace("Outline", "")
    .replace("Stroke", "");
};

export const getTag = (name: string) => {
  switch (true) {
    case name.endsWith("Filled"):
      return "Filled";
    case name.endsWith("Outline"):
      return "Outline";
    default:
      return "Outline";
  }
};

const IconSearch = () => {
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
    <div className="relative flex w-full max-w-full flex-col lg:w-[816px] lg:max-w-[62vw]">
      <div className="flex w-full flex-wrap-reverse justify-between gap-x-8 gap-y-4">
        <Filter onFilterChange={handleFilterChange} />
        <DownloadButtons />
      </div>
      {categories.map((cat) => {
        return (
          <div key={cat.category}>
            <Heading level="3" size="small" spacing>
              {cat.category}
            </Heading>
            <div className="grid content-start justify-start gap-x-4 gap-y-6 pb-8 [grid-template-columns:repeat(auto-fit,12rem)]">
              {cat.icons.map((i) => {
                const T = Icons[i.name];
                return (
                  <button
                    key={i.created_at}
                    onClick={() => handleSelect(i.name)}
                    className="vk-icon_button group relative h-32 w-48 shrink rounded shadow-card hover:shadow-[0_0_0_2px_theme(colors.link)] focus:shadow-focus focus:outline-none"
                  >
                    {isNew(i.created_at) && (
                      <Detail
                        size="small"
                        className="absolute top-0 right-0 rounded-tr rounded-bl-md bg-feedback-info-background py-1 px-2 "
                      >
                        Ny!
                      </Detail>
                    )}
                    <div className="flex h-full w-full flex-col items-center justify-end gap-2 p-4">
                      <div>
                        <T
                          title={i.name}
                          className="mb-2 text-[2rem] transition-all group-hover:text-[2.4rem]"
                        />
                      </div>
                      <div className="text-center">
                        <Detail size="small" className="vk-icon_button-detail">
                          {" "}
                          {getName(i.name)}
                        </Detail>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <Heading size="small" as="div" spacing>
        Fant du ikke ønsket ikon?
      </Heading>
      <BodyLong>
        Send inn forslag til navne-alias eller nye ikoner! Skriv til oss i
        footeren ⬇ eller bare send oss en melding på{" "}
        <Link
          href="https://nav-it.slack.com/archives/C7NE7A8UF"
          target="_blank"
        >
          #designsystem slack.
        </Link>
      </BodyLong>
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedIcon && <ModalContent icon={selectedIcon} />}
        </Modal.Content>
      </Modal>
    </div>
  );
};
export default IconSearch;
