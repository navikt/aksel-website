import { useState } from "react";
import styled from "styled-components";
import { useOverflowX } from "../..";

const ScWrapper = styled.div`
  position: relative;

  &[data-left="true"] {
    ::before {
      content: "";
      height: 100%;
      width: 30px;
      bottom: 0;
      top: 0;
      left: 0;
      position: absolute;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.16) 0%,
        rgba(0, 0, 0, 0.08) 30%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }

  &[data-right="true"] {
    ::after {
      content: "";
      height: 100%;
      width: 30px;
      bottom: 0;
      top: 0;
      right: 0;
      position: absolute;
      background: linear-gradient(
        -90deg,
        rgba(0, 0, 0, 0.16) 0%,
        rgba(0, 0, 0, 0.08) 30%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }

  @media (max-width: 564px) {
    margin: 0 -1rem;

    &[data-left="true"] {
      ::before {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.32) 0%,
          rgba(0, 0, 0, 0.16) 30%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }

    &[data-right="true"] {
      ::after {
        background: linear-gradient(
          -90deg,
          rgba(0, 0, 0, 0.32) 0%,
          rgba(0, 0, 0, 0.16) 30%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }
  }
`;

const ScOverflow = styled.div`
  overflow-x: auto;
`;

const ScInner = styled.div`
  display: inline-block;
  min-width: 100%;
`;

const OverflowDetector = ({ children }: { children: React.ReactNode }) => {
  const [outerRef, setOuterRef] = useState<HTMLDivElement>(null);
  const [innerRef, setInnerRef] = useState<HTMLDivElement>(null);

  const [left, right] = useOverflowX(innerRef, outerRef);

  return (
    <ScWrapper data-left={left} data-right={right}>
      <ScOverflow ref={setOuterRef}>
        <ScInner ref={setInnerRef}>{children}</ScInner>
      </ScOverflow>
    </ScWrapper>
  );
};

export default OverflowDetector;
