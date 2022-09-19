import { ComponentType } from "react";
import styles from "./examples.module.css";

export const withDsExample = (Component: ComponentType) => {
  const DsHOC = (props: any) => (
    <div className={styles.container}>
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
