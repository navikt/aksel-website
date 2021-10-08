import { SuccessStroke } from "@navikt/ds-icons";
import { Detail } from "@navikt/ds-react";
import React, { useContext } from "react";
import styled from "styled-components";
import { SideBarContext } from "./Sidebar";

const Wrapper = styled.div`
  display: inline-flex;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-6);
`;
const Tag = styled.button<{ active: boolean }>`
  background-color: #f7f7f7;
  border-color: #6a6a6a;

  :hover {
    background-color: var(--navds-color-blue-10);
    border-color: var(--navds-color-blue-50);
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 1px white, 0 0 0 3px var(--navds-color-blue-80);
  }

  ${(props) =>
    props.active &&
    `
    background-color: var(--navds-color-blue-10);
    border-color: var(--navds-color-blue-50);
    border-width: 2px;
    padding: calc(0.125rem - 1px) calc(0.25rem - 1px);
  `}
`;

const Text = styled(Detail)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: var(--navds-color-blue-50);
  }
`;

const Tags = (): JSX.Element => {
  const [filterTags, setFilterTags] = useContext(SideBarContext);

  const handleClick = (index: number) => {
    const arr = [...filterTags];
    arr[index].active = !arr[index].active;
    setFilterTags([...arr]);
  };

  return (
    <Wrapper>
      {filterTags.map((tag, x) => (
        <Tag
          key={tag.title}
          active={tag.active}
          className="navds-tag navds-tag--small"
          onClick={() => handleClick(x)}
        >
          <Text size="small">
            {tag.active && (
              <svg
                role="presentation"
                focusable={false}
                width="1em"
                height="1em"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.01386 8L10.25 2L11 2.75L4.01386 9.5L1 6.5L1.75 5.75L4.01386 8Z"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            )}
            {tag.title}
          </Text>
        </Tag>
      ))}
    </Wrapper>
  );
};

export default Tags;
