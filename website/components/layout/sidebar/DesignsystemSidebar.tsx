import { useDsNavigation } from "../..";
import Menu from "../menu/DsMenu";

const DesignsystemSidebar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, activeHeading] = useDsNavigation();

  if (!activeHeading) return null;

  return (
    <div className="index-ignore z-[1002] hidden w-sidebar shrink-0 self-start  bg-white py-4 pr-2 lg:block">
      <Menu heading={activeHeading} />
    </div>
  );
};
/* h-screen overflow-y-auto sticky top-0 */
export default DesignsystemSidebar;
