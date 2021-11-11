import styled from "styled-components";

export const SidebarMain = styled.div`
  display: flex;
  min-height: calc(100vh - var(--header-height));
  background-color: #ffffff;

  p {
    max-width: var(--text-max-width);
  }
`;

export const MainFooter = styled.div`
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const Main = styled.main<{ fullwidth?: boolean }>`
  min-height: calc(100vh - var(--header-height));
  width: calc(100vw - var(--sidebar-max-width));
  display: flex;
  flex-direction: column;
  position: relative;

  ${(props) => props.fullwidth && `width: 100%;`}
  @media (max-width: 768px) {
    width: 100%;
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
  background: var(--navds-color-deepblue-80);
  color: white;
  left: 0;
  padding: 1rem;
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.1s;
  text-decoration: none;
  z-index: 1;

  :focus-within {
    transform: translateY(0%);
    outline: none;
    box-shadow: inset 0 0 0 2px white;
  }
`;
