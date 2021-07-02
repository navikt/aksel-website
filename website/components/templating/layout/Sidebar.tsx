import * as React from "react";
import styled from "styled-components";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 256px;
  padding-top: var(--navds-spacing-4);
  position: relative;
  flex-shrink: 0;
  background-color: #fafafa;
  border-right: 1px solid var(--navds-color-gray-20);

  @media (max-width: 1068px) {
    display: none;
  }
`;
const dummyMenu = [
  { title: "Ea dolor ullamco", pathName: "#123" },
  {
    title: "Adipisicing",
    pathName: "#123",
    children: [
      {
        title: "Adipisicing",
        pathName: "#123",
        children: [
          { title: "Link3", pathName: "#123" },
          { title: "Link4", pathName: "#123" },
          { title: "Link5", pathName: "#123" },
        ],
      },
      { title: "Link4", pathName: "#123" },
      { title: "Link5", pathName: "#123" },
    ],
  },
  { title: "Nulla anim commodo aliquip", pathName: "#123" },
  {
    title: "Ea est nulla commodo est",
    pathName: "#123",
    children: [
      { title: "Link3", pathName: "#123" },
      {
        title: "Link4",
        pathName: "#123",
        children: [
          { title: "Link3", pathName: "#123" },
          { title: "Link4", pathName: "#123" },
          { title: "Link5", pathName: "#123" },
        ],
      },
      { title: "Link5", pathName: "#123" },
    ],
  },
  { title: "Aliquip exercitation", pathName: "#123" },
  {
    title: "Exercitation",
    pathName: "#123",
    children: [
      { title: "Link3", pathName: "#123" },
      { title: "Link4", pathName: "#123" },
      { title: "Link5", pathName: "#123" },
    ],
  },
  { title: "Minim labore duis", pathName: "#123" },
  { title: "Et culpa sunt nostrud qui ", pathName: "#123" },
  {
    title: "Culpa irure nostrud labore mollit",
    pathName: "#123",
    children: [
      { title: "Link3", pathName: "#123" },
      { title: "Link4", pathName: "#123" },
      { title: "Link5", pathName: "#123" },
    ],
  },
  { title: "Minim", pathName: "#123" },
  { title: "Nostrud qui ", pathName: "#123" },
  {
    title: "Do nostrud elit proident veniam sit",
    pathName: "#123",
    children: [
      { title: "Link3", pathName: "#123" },
      { title: "Link4", pathName: "#123" },
      { title: "Link5", pathName: "#123" },
    ],
  },
  {
    title: "Exercitation commodo eiusmod sit voluptate mollit",
    pathName: "#123",
  },
  { title: "Qui culpa do", pathName: "#123" },
];

function Sidebar() {
  return (
    <Wrapper>
      <Menu menu={dummyMenu} />
    </Wrapper>
  );
}

export default Sidebar;
