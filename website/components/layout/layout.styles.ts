import styled from "styled-components";

export const SidebarMain = styled.div`
  display: flex;
  min-height: calc(100vh - var(--header-height));
  background-color: var(--navds-semantic-color-canvas-background-light);
`;

export const MainFooter = styled.div`
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const Main = styled.main<{ fullwidth?: boolean; graybg?: boolean }>`
  min-height: calc(100vh - var(--header-height));
  width: 100%;
  max-width: calc(100vw - var(--sidebar-max-width));
  display: flex;
  flex-direction: column;
  position: relative;

  ${(props) =>
    props.graybg &&
    `background-color: var(--navds-semantic-color-component-background-alternate);`}

  ${(props) => props.fullwidth && `max-width: 100%;`}

  @media (max-width: 768px) {
    max-width: 100%;
  }

  :focus {
    outline: none;
  }
`;

export const Grow = styled.div`
  flex: 1 1;
  height: 100%;
  margin-bottom: auto;
`;

export const SkipLink = styled.a`
  background: var(--navds-semantic-color-focus);
  color: var(--navds-semantic-color-text-inverted);
  left: 0;
  padding: 1rem;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.1s;
  text-decoration: none;
  z-index: 1200;

  :focus-within {
    transform: translateY(0%);
    outline: none;
    box-shadow: inset 0 0 0 2px
      var(--navds-semantic-color-canvas-background-light);
  }
`;
