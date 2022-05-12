import dynamic from "next/dynamic";

const IconSearch = dynamic(() => import("./Search"), {
  loading: () => <div className="min-h-screen w-full" />,
});

export default IconSearch;
