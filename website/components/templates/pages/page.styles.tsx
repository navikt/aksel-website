import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext } from "../layout/Layout";

export const SanityBlockContainer = styled.div`
  position: relative;
  max-width: 1280px;
`;

export const MaxWidthContainerDiv = styled.div<{ isMobile: boolean }>`
  max-width: 664px;
  width: 100%;
  padding: 0 var(--navds-spacing-8) 1rem var(--navds-spacing-8);
  margin: ${(props) =>
    props.isMobile ? "0 auto" : "0 auto 0 var(--navds-spacing-4)"};

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
    <MaxWidthContainerDiv isMobile={context.isMobile}>
      {children}
    </MaxWidthContainerDiv>
  );
};

export const HeadingContainer = styled.div`
  width: 100%;
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
