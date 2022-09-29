import { ComponentType } from "react";
import styles from "./examples.module.css";
import cl from "classnames";

export const withDsExample = (Component: ComponentType, inverted?: boolean) => {
  const DsHOC = (props: any) => (
    <div className={cl(styles.container, { "bg-gray-900": inverted })}>
      <div id="ds-example">
        <Component {...props} />
      </div>
    </div>
  );

  if (Component.displayName) {
    DsHOC.displayName = `DsExample${Component.displayName}`;
  }

  return DsHOC;
};
