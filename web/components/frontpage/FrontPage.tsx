import {
  ContentContainer,
  Title,
  LinkPanel,
  LinkPanelTitle,
  BodyLong,
} from "@navikt/ds-react";
import { SignLanguageTwoHands } from "@navikt/ds-icons";
import styles from "./frontpage.module.css";
import { SanityFrontpage } from "../../sanity-types";

const FrontPage = (props) => {
  /* console.log(JSON.stringify(props, null, 2)); */

  const frontpage = props;
  /* console.log(JSON.stringify(frontpage, null, 2)); */
  /* console.log(frontpage.panels[0].pagereference); */
  return (
    <div className={styles.wrapper}>
      <ContentContainer className={styles.content}>
        <div className={styles.topContent}>
          <Title level={1} size="xl">
            {frontpage.headline}
          </Title>
        </div>
        <div className={styles.panels}>
          {frontpage.panels.map((panel, i) => (
            <LinkPanel
              key={panel.slug + 1}
              href={panel.slug}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  padding: "1rem",
                  display: "grid",
                  gridAutoFlow: "column",
                  gap: "2rem",
                  alignItems: "center",
                }}
              >
                <SignLanguageTwoHands style={{ fontSize: "5rem" }} />
                <div>
                  {/* <LinkPanelTitle>{panel.title}</LinkPanelTitle> */}
                  <h2>{panel.title}</h2>
                  <BodyLong>{panel.content}</BodyLong>
                </div>
              </div>
            </LinkPanel>
          ))}
        </div>
      </ContentContainer>
    </div>
  );
};

export default FrontPage;
