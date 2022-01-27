import { DsCodeSandbox as SandboxT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

import dynamic from "next/dynamic";

const Sandbox = dynamic(() => import("./Sandbox"), {
  loading: () => (
    <div className="flex w-full bg-gray-50 border border-solid border-gray-200 h-[400px] mb-7" />
  ),
  ssr: false,
});

const Wrapper = ({ node }: { node: SandboxT }): JSX.Element => {
  return <Sandbox node={node} />;
};

export default withErrorBoundary(Wrapper, "Sandbox");
