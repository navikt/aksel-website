import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext } from "../..";

export const SanityBlockContainer = styled.div`
  position: relative;
  max-width: 1280px;
  display: flex;
`;

export const MaxWidthContainerDiv = styled.div<{ isTablet: boolean }>`
  max-width: calc(var(--content-max-width) + 5rem);
  width: 100%;
  padding: 0 2rem 1rem 3rem;
  margin: ${(props) => (props.isTablet ? "0 auto" : "0 auto 0 0")};

  @media (max-width: 564px) {
    margin: 0;
    padding-left: var(--navds-spacing-4);
    padding-right: var(--navds-spacing-4);
  }
`;

export const MaxWidthContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const context = useContext(LayoutContext);
  return (
    <MaxWidthContainerDiv isTablet={context.isTablet}>
      {children}
    </MaxWidthContainerDiv>
  );
};

export const HeadingContainer = styled.div`
  /* max-width: var(--content-max-width); */
  padding-top: 2rem;
  padding-bottom: var(--navds-spacing-6);
`;

export const Inline = styled.span`
  display: inline-flex;
  gap: var(--navds-spacing-2);
  align-items: center;
  flex-wrap: wrap;
`;

export const PreviewBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background: repeating-linear-gradient(
    -55deg,
    #fff,
    #fff 10px,
    #eee 10px,
    #eee 20px
  );
`;
