/* https://github.com/sanity-io/dashboard-widget-document-list/blob/master/src/DocumentList.js */

import client from "@sanity/client";
import { Button, Spinner } from "@sanity/ui";
import { cosh } from "core-js/core/number";
import React, { useEffect, useState } from "react";
import config from "../../config";
import SanityConfig from "../../sanity.json";
import moment from "moment";
import styles from "./widget.css";
import { Item, List } from "part:@sanity/components/lists/default";
import { IntentLink } from "part:@sanity/base/router";
import { getPublishedId } from "part:@sanity/base/util/draft-utils";
import { Tag } from "@navikt/ds-react";

const sanityClient = client({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

const OutDatedComponents = ({ type }) => {
  const query = `*[_type in [${config.allDocumentTypes.map((x) => `"${x}"`)}]]`;
  const [docs, setDocs] = useState([]);
  const [loading, setloading] = useState(true);

  const success = (v) => {
    setDocs(
      v
        .filter((x) => {
          if (!x?.metadata?.last_update) return false;
          const lastUpdate = moment(x.metadata.last_update);
          const daysSince = moment().diff(lastUpdate, "days");
          return type === "error"
            ? daysSince > 180
            : daysSince >= 90 && daysSince < 180;
        })
        .sort((a, b) => {
          const lastUpdateA = moment(a.metadata.last_update);
          const lastUpdateB = moment(b.metadata.last_update);
          return lastUpdateA.diff(lastUpdateB, "days");
        })
    );
    setloading(false);
  };

  useEffect(() => {
    sanityClient.fetch(query).then(success, (e) => console.error(e));
  }, []);

  /* Refreshes every 5 minutes */
  useEffect(() => {
    const interval = setInterval(() => {
      setloading(true);
      sanityClient.fetch(query).then(success, (e) => console.error(e));
    }, 300000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const refresh = () => {
    setloading(true);
    sanityClient.fetch(query).then(success, (e) => console.error(e));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {type === "error" ? "Utdaterte sider" : "Stagnerte sider"}
        </h2>
      </header>
      <div className={styles.content}>
        {loading ? (
          <Spinner center message="Loading..." />
        ) : (
          <List>
            {docs &&
              docs.map((doc) => {
                const lastUpdate = moment(doc.metadata.last_update);
                const daysSince = moment().diff(lastUpdate, "days");

                return (
                  <Item key={doc._id}>
                    <IntentLink
                      intent="edit"
                      params={{
                        type: doc._type,
                        id: getPublishedId(doc._id),
                      }}
                      className={styles.link}
                    >
                      <span className={styles.spacing}>
                        <Tag size="small" variant={type}>
                          {daysSince}d
                        </Tag>
                        {doc?.heading}
                      </span>
                    </IntentLink>
                  </Item>
                );
              })}
          </List>
        )}
      </div>
      <Button
        fontSize={[2]}
        tone="primary"
        padding={[2, 2, 2]}
        text="Oppdater"
        onClick={() => refresh()}
      />
    </div>
  );
};

export default {
  name: "outdated-documents-widget",
  component: OutDatedComponents,
};
