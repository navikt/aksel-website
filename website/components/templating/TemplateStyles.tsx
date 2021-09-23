import styled from "styled-components";

export const SanityBlockContainer = styled.div`
  position: relative;
  max-width: 1256px;
`;

export const MaxWidthContainer = styled.div`
  max-width: 700px;
  margin: 0;
  margin-right: auto;
  margin-left: var(--navds-spacing-8);
  padding: 0 var(--navds-spacing-8);
  overflow-x: auto;

  @media (max-width: 564px) {
    margin: 0;
    padding-left: var(--navds-spacing-4);
    padding-right: var(--navds-spacing-4);
  }
`;

export const HeadingContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: var(--navds-spacing-6);
`;

export const Inline = styled.span`
  display: inline-flex;
  gap: var(--navds-spacing-3);
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
    #ddd 10px,
    #ddd 20px
  );
`;
