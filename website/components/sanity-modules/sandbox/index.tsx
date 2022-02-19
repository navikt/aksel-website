import { DsCodeSandbox as SandboxT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

import dynamic from "next/dynamic";

const Sandbox = dynamic(() => import("./Sandbox"), {
  loading: () => (
    <div className="mb-8 flex h-[300px] w-full border border-solid border-gray-200 bg-gray-50" />
  ),
  ssr: false,
});

const Wrapper = ({ node }: { node: SandboxT }): JSX.Element => {
  return <Sandbox node={node} />;
};

export default withErrorBoundary(Wrapper, "Sandbox");
