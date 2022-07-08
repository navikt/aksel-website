import { BodyLong } from "@navikt/ds-react";
import { SandboxComponentT } from "../types";

const BodyLongSandbox: SandboxComponentT = (props: any) => {
  const newProps = {
    ...(props?.as !== "" ? { as: props?.as } : {}),
  };

  return (
    <BodyLong {...newProps} spacing={props?.spacing} size={props?.size}>
      {props?.tekst}
    </BodyLong>
  );
};

BodyLongSandbox.args = {
  props: {
    size: ["medium", "small"],
    spacing: false,
    tekst:
      "Amet dolore non tempor incididunt dolor est enim aute commodo cillum quis. Ex esse veniam ipsum quis. Pariatur duis do qui exercitation ut laboris sit veniam nostrud nulla esse. In aute sint enim reprehenderit ut voluptate do id. Laborum irure qui officia aute ipsum. Exercitation dolor sunt deserunt non anim.",
    as: "",
  },
};

BodyLongSandbox.getCode = (props: any) => {
  return `<BodyLong
  ${props?.spacing ? "spacing" : ""}
  ${props?.size !== "medium" ? `size="${props?.size}"` : ""}
  ${props?.as !== "" ? `as="${props?.as}"` : ""}
>
  ${props?.tekst}
</BodyLong>`;
};

export default BodyLongSandbox;
