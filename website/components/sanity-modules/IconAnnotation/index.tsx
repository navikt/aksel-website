import { Success } from "@navikt/ds-icons";
import dynamic from "next/dynamic";

const Annotation = dynamic(() => import("./Annotation"), {
  loading: () => <Success aria-hidden className="inline-block" />,
});

export const DsIconAnnotation = {
  ds_icon: ({ mark }: { mark: { color?: string; name?: string } }) => {
    return <Annotation mark={mark} />;
  },
};

export default DsIconAnnotation;
