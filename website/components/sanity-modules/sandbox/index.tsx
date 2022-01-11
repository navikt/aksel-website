import { DsCodeSandbox as SandboxT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

import dynamic from "next/dynamic";
import styled from "styled-components";

const Sandbox = dynamic(() => import("./Sandbox"), {
  loading: () => <ScSkeleton />,
  ssr: false,
});

const ScSkeleton = styled.div`
  display: flex;
  width: 100%;
  background-color: var(--navds-global-color-gray-50);
  border: 1px solid var(--navds-global-color-gray-200);
  border-bottom: 1px solid var(--navds-global-color-gray-200);
  border-top: none;
  height: 300px;
  width: 100%;
`;

const Wrapper = ({ node }: { node: SandboxT }): JSX.Element => {
  return <Sandbox node={node} />;
};

export default withErrorBoundary(Wrapper, "Sandbox");
