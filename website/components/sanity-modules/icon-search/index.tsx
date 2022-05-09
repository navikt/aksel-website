import dynamic from "next/dynamic";

const IconSearch = dynamic(() => import("./Search"), {
  loading: () => <div className="min-h-screen" />,
});

export default IconSearch;
