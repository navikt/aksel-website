import React from "react";

export const NoSidebarLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main
      tabIndex={-1}
      id="hovedinnhold"
      className="aksel-artikkel bg-gray-50 pt-[8vw] focus:outline-none"
    >
      <div className="mx-auto max-w-aksel px-4 xs:w-[90%]">
        <article className="pt-[4vh] pb-16 md:pb-32">{children}</article>
      </div>
    </main>
  );
};