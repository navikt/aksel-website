/* fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        page: {
          _type: "reference",
          _ref: docId,
          _weak: true,
        },
        feedbacktype: feedbackType,
        comment: feedbackValue,
      }),
    }); */

/* import { NavLogoWhite } from "../.."; */

/* const LogoWrapper = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`; */

import React, { useContext } from "react";
import styled from "styled-components";
import { LayoutContextProps, LayoutContext } from "../Layout";

const ScFooter = styled.footer<{ context: LayoutContextProps }>`
  width: 100%;
  background-color: var(--navds-color-gray-90);

  padding: ${(props) => (props.context.isTablet ? "1rem" : "1rem 2rem")};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
`;

const DesignsystemFooter = () => {
  const context = useContext(LayoutContext);

  return <ScFooter context={context}></ScFooter>;
};

export default DesignsystemFooter;
