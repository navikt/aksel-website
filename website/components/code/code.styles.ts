import styled from "styled-components";

/* Example */
export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: var(--navds-spacing-12);
  display: flex;
  flex-direction: column;
`;

export const Example = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  border: 1px solid var(--navds-color-gray-20);
  border-bottom: none;

  :only-child {
    border-bottom: 1px solid var(--navds-color-gray-20);
  }
`;

export const Button = styled.button`
  border: none;
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  background-color: transparent;

  :hover {
    background-color: var(--navds-color-gray-80);
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }

  &[aria-selected="true"] {
    box-shadow: inset 0 -2px 0 0 white;
    color: white;
  }
`;

export const CopyButton = styled(Button)`
  position: absolute;
  top: 3px;
  right: 8px;
  border-radius: 4px;
  background-color: var(--navds-color-darkgray);
`;

/* Snippet/Block */
export const PreWrapper = styled.div<{ active: boolean }>`
  position: relative;
  background-color: var(--navds-color-darkgray);
  display: ${(props) => (props.active ? "block" : "none")};
  margin-bottom: var(--navds-spacing-8);
`;

export const Pre = styled.pre`
  overflow-x: auto;
  align-items: center;
  display: flex;
  background-color: var(--navds-color-darkgray);
  margin: 0;
  padding: 1rem 1rem 1rem 1rem;
`;

export const Code = styled.code`
  color: white;
  font-size: 1rem;
`;

export const SnippetCode = styled.code<{ language: string }>`
  color: white;
  font-size: 1rem;

  ${(props) => {
    return props.language === "bash"
      ? `
    ::before {
      content: "$ ";
    }`
      : ``;
  }}
`;

/* Tabs */
export const Tabs = styled.div`
  border-bottom: 1px solid var(--navds-color-gray-60);
  background-color: var(--navds-color-darkgray);
  padding: 1px;
  min-height: 50px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
`;

export const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
`;

export const Li = styled.li`
  list-style: none;
`;

export const LinkButton = styled.a`
  color: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 0.75rem;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  text-decoration: none;

  :hover {
    background-color: rgba(255, 255, 255, 0.15);
    text-decoration: underline;
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -2px;
    text-decoration: underline;
  }
`;

export const CopyWrapper = styled.div`
  display: flex;
`;
