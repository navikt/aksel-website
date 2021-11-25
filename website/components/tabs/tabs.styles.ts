import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  position: sticky;
  top: 0;
  z-index: 1001;
`;

export const Nav = styled.nav<{ isTablet: boolean }>`
  overflow-x: auto;
  background-color: var(--navds-semantic-color-canvas-background-light);

  /* Firefox */
  scrollbar-width: none;

  /* Internet Explorer 10+ */
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  ${(props) => {
    return !props.isTablet
      ? `margin-left: 0;
      margin-right: 0;`
      : `margin: 0;
         max-width: none;
         padding-right: 0.5rem;
         padding-left: 0.5rem;`;
  }};

  ::after {
    content: "";
    background-color: var(--navds-semantic-color-divider);
    height: 1px;
    width: 100%;
    bottom: 0px;
    left: 0;

    position: absolute;
  }
`;

export const Ul = styled.ul<{ isTablet: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  /* overflow-x: auto; */
  max-width: ${(props) => (props.isTablet ? "" : "600px")};
  margin-top: 0.5rem;
  margin-left: ${(props) => (!props.isTablet ? "3rem" : "")};
  gap: 0.25rem;

  > * {
    list-style: none;
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

export const A = styled.a`
  border-bottom: 3px solid transparent;
  background: none;
  cursor: pointer;
  text-decoration: none;
  text-transform: capitalize;
  color: var(--navds-global-color-gray-800);
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  min-height: 48px;
  font-weight: 400;

  &[aria-selected="true"] {
    border-color: var(--navds-semantic-color-canvas-background-inverted);
    color: var(--navds-semantic-color-text-default);
    font-weight: 600;
  }

  :hover {
    color: var(--navds-semantic-color-text-default);
    border-color: var(--navds-semantic-color-canvas-background-inverted);
  }

  :focus {
    outline: 3px solid var(--navds-semantic-color-focus);
    outline-offset: -3px;
  }
`;

const ScButtonCss = css`
  background: none;
  border: none;
  position: absolute;
  display: flex;
  align-items: center;
  height: 48px;
  width: 48px;
  top: 50%;
  justify-content: center;
  transform: translateY(-50%);
  background: var(--navds-semantic-color-canvas-background-light);
  z-index: 1002;

  :focus {
    box-shadow: 0 0 0 2px var(--navds-global-color-focus);
  }
`;

export const ScrollLeftButton = styled.button`
  ${ScButtonCss}
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 60%,
    rgba(255, 255, 255, 0) 100%
  );
`;

export const ScrollRightButton = styled.button`
  ${ScButtonCss}
  right: 0;
  background: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 1) 60%,
    rgba(255, 255, 255, 0) 100%
  );
`;
