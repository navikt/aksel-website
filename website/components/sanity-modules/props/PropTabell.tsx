import { withErrorBoundary } from "@/error-boundary";
import { DsProps } from "@/lib";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { Highlighter } from "./Highlight";

export type PropT = {
  _type: "komponent";
  _key: string;
  title?: string;
  overridable?: boolean;
  propref?: DsProps;
};

const List = ({ prop, parent }: { prop: any; parent: string }) => {
  if (prop?.description && prop.description.includes("@private")) {
    return null;
  }

  return (
    <Detail
      as="span"
      className="block overflow-x-auto border border-t-0 border-gray-300 p-2 font-mono first-of-type:border-t last-of-type:rounded-b"
    >
      <dt>
        <span className="font-semibold">{`${prop.name}${
          prop?.required ? "" : "?"
        } `}</span>
        <span>{prop.type ? <>{Highlighter({ type: prop.type })}</> : ""}</span>
      </dt>
      {prop.description && (
        <dl className="font-sans text-base">{prop.description}</dl>
      )}
      {prop.name === "ref" && prop.type.includes("Ref<") && (
        <dl className="font-sans text-base">
          {`${parent} extends ${prop.type.slice(
            prop.type.indexOf("<") + 1,
            prop.type.lastIndexOf(">")
          )}`}
        </dl>
      )}
    </Detail>
  );
};

const PropTable = ({ komponent }: { komponent: PropT }): JSX.Element => {
  return (
    <div>
      <Heading
        size="xsmall"
        level="3"
        className="scroll-m-8 rounded-t border border-b-0 border-gray-300 bg-gray-50 p-2"
        id={`${komponent._key}`}
      >
        {komponent?.title ? komponent.title : "Props"}
      </Heading>

      <div className="algolia-ignore-index relative mb-8">
        {komponent?.propref?.proplist?.length === 0 && (
          <div className="mb-8 rounded-b border border-gray-300 p-2">
            <BodyShort>Fant ingen props for denne komponenten.</BodyShort>
          </div>
        )}

        <dl>
          {komponent?.overridable && (
            <List
              prop={{
                description: "OverridableComponent-api",
                required: false,
                name: "as",
                type: "React.ElementType",
              }}
              parent={komponent?.title ?? ""}
            />
          )}
          {komponent?.propref?.proplist?.map((prop) => (
            <List key={prop.name} prop={prop} parent={komponent?.title ?? ""} />
          ))}
        </dl>
      </div>
    </div>
  );
};

export default withErrorBoundary(PropTable, "Proptable");
