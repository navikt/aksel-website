import styled from "styled-components";
import { Spacing as SpacingT } from "../../lib/autogen-types";

const ScSpacing = styled.div<{ $space: string }>`
  margin-top: ${({ $space }) =>
    `var(--navds-spacing-${$space.split("-")?.[1]})`};
`;

const Spacing = ({ node }: { node: SpacingT }): JSX.Element => {
  if (!node.space) {
    return null;
  }

  return <ScSpacing aria-hidden="true" $space={node.space} />;
};

export default Spacing;
