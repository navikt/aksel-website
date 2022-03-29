import { useDsNavigation } from "../..";
import Menu from "../menu/DsMenu";

const DesignsystemSidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, activeHeading] = useDsNavigation();

  if (!activeHeading) return null;

  return (
    <div className="index-ignore sticky top-0 z-[1002] hidden h-screen w-sidebar shrink-0 self-start overflow-y-auto border-r border-r-divider bg-white py-8 pl-8 pr-6 lg:block">
      <Menu heading={activeHeading} />
    </div>
  );
};

export default DesignsystemSidebar;
