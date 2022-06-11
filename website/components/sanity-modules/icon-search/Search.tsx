import meta from "@navikt/ds-icons/meta.json";
import { BodyLong, Detail, Heading, Link, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { AmplitudeEvents, isNew, logAmplitudeEvent } from "@/components";
import Filter, { FilterT } from "./Filter";
import { categorizeIcons, CategoryT, IconMetaT } from "./iconCategories";
import dynamic from "next/dynamic";

const IconView = dynamic(() => import("./IconView"), {
  loading: () => <div className="min-h-screen w-full" />,
  ssr: false,
});

const ModalContent = dynamic(() => import("./ModalContent"), {
  loading: () => <div className="min-h-[90vw] w-[600px] max-w-[90%]" />,
  ssr: false,
});

const DownloadButtons = dynamic(() => import("./DownloadButtons"), {
  ssr: false,
});

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
  const [value, setValue] = useState(null);

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
    setVisibleIcons(meta.filter((x) => "Outline" === getTag(x.name)));
  }, []);

  useEffect(() => {
    router.query.icon && handlePageEntry(router.query.icon as string);
  }, [router.query]);

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

    if (filter.toggle === "ny") {
      setVisibleIcons(metaIcons.filter((x) => isNew(x.created_at)));
      return;
    }

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
  const options = categorizeIcons(meta).map((x) => x.category);

  return (
    <div className="relative flex w-full max-w-full flex-col md:w-[1000px] md:max-w-[62vw]">
      <DownloadButtons />
      <div className="flex w-full flex-wrap justify-between gap-x-8 gap-y-4">
        <Filter onFilterChange={handleFilterChange} value={value} />
        <div className="flex flex-wrap items-start justify-start gap-x-3 gap-y-2 xl:max-w-md">
          {options.map((x) => (
            <button
              onClick={() => setValue(x)}
              className="shrink-0 rounded-xl border border-gray-200 bg-gray-100 px-2 py-1 hover:bg-gray-200 focus:shadow-focus focus:outline-none"
              key={x}
            >
              <Detail className="font-semibold text-gray-800" as="span">
                {x}
              </Detail>
            </button>
          ))}
        </div>
      </div>
      <IconView categories={categories} handleSelect={handleSelect} />
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
