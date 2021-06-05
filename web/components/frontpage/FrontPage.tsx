import {
  ContentContainer,
  Title,
  LinkPanel,
  LinkPanelTitle,
  BodyLong,
} from "@navikt/ds-react";
import { SignLanguageTwoHands } from "@navikt/ds-icons";
import styles from "./frontpage.module.css";

const FrontPage = (props) => {
  console.log(props.panels);
  return (
    <div className={styles.wrapper}>
      <ContentContainer className={styles.content}>
        <div className={styles.topContent}>
          <Title level={1} size="xl">
            Hjemmeside verktøykasse
          </Title>
        </div>
        <div className={styles.panels}>
          {props.panels.map((panel) => (
            <LinkPanel href={panel.url} style={{ textDecoration: "none" }}>
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
