import {
  BodyLong,
  BodyShort,
  Detail,
  Heading,
  Label,
  Link,
  Tag,
} from "@navikt/ds-react";
import NextLink from "next/link";
import React from "react";
import { DsProps } from "../../../../lib";
import { withErrorBoundary } from "../../../ErrorBoundary";

export type PropT = {
  _type: "komponent";
  title?: string;
  overridable?: boolean;
  propref?: DsProps;
};

const Table = ({ prop }: { prop: any }) => (
  <table className="mb-0 border-separate border-t border-t-divider pt-5 last-of-type:mb-12 last-of-type:border-b last-of-type:border-b-divider">
    <caption className="m-0 mb-2 flex flex-col text-left">
      {prop.required && (
        <Detail className="text-feedback-danger-text">Required</Detail>
      )}
      <Tag
        variant="info"
        size="small"
        className="border-none bg-deepblue-50 font-mono text-deepblue-600"
      >
        {prop.name}
      </Tag>
    </caption>
    <tbody className="border-none">
      <tr>
        <Label
          as="th"
          size="small"
          className="min-w-[100px] pr-4 pb-3 pl-[0.125rem] text-left text-text-muted"
        >
          Type
        </Label>
        <BodyShort as="td" className="w-full pb-2 pl-1">
          <pre style={{ margin: 0 }}>
            <code className="text-medium text-lightblue-800">
              {prop.type ?? "-"}
            </code>
          </pre>
        </BodyShort>
      </tr>
      {prop.description && (
        <tr>
          <Label
            as="th"
            size="small"
            className="pr-4 pb-3 pl-[0.125rem] text-left text-text-muted"
          >
            Description
          </Label>
          <BodyShort as="td" className="w-full pb-2 pl-1">
            {prop.description ?? "-"}
          </BodyShort>
        </tr>
      )}
      {prop.defaultValue && (
        <tr>
          <Label
            as="th"
            size="small"
            className="min-w-[100px] pr-4 pb-3 pl-[0.125rem] text-left text-text-muted"
          >
            Default
          </Label>
          <BodyShort as="td" className="w-full pb-2 pl-1">
            {prop.defaultValue ? (
              <code className="text-medium text-lightblue-800">
                {prop.defaultValue}
              </code>
            ) : (
              <span>-</span>
            )}
          </BodyShort>
        </tr>
      )}
    </tbody>
  </table>
);

const PropTable = ({ komponent }: { komponent: PropT }): JSX.Element => {
  return (
    <details className="algolia-ignore-index">
      {komponent.title ? (
        <Heading
          size="small"
          as="summary"
          className="mb-2 cursor-pointer p-2 hover:bg-interaction-primary-hover-subtle focus:shadow-focus focus:outline-none"
        >
          {komponent.title}
        </Heading>
      ) : (
        <summary>Props</summary>
      )}

      <div className="relative mb-8 mt-4 overflow-x-auto">
        <BodyLong as="ul" className="mb-8">
          {komponent.overridable && (
            <li>
              Komponenten er implementert med{" "}
              <NextLink
                href="/designsystem/side/overridable-component"
                passHref
              >
                <Link>OverridableComponent</Link>
              </NextLink>
            </li>
          )}
        </BodyLong>

        {komponent?.propref?.proplist?.map((prop) => (
          <Table key={prop.name} prop={prop} />
        ))}
        <Detail className="-mt-6 text-text-muted">
          * Props er autogenerert fra kode, så avvik kan forekomme. Ta kontakt
          hvis noe ikke stemmer!
        </Detail>
      </div>
    </details>
  );
};

export default withErrorBoundary(PropTable, "Proptable");
