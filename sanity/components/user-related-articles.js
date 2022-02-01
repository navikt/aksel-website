import { Heading, Stack, Text } from "@sanity/ui";
import { withDocument } from "part:@sanity/form-builder";
import { getPublishedId } from "part:@sanity/base/util/draft-utils";
import schema from "part:@sanity/base/schema";
import React, { useEffect, useCallback, useState } from "react";
import moment from "moment";
import { Accordion } from "@navikt/ds-react";
import { IntentLink } from "part:@sanity/base/router";
import { Item, List } from "part:@sanity/components/lists/default";
import SanityPreview from "part:@sanity/base/preview";
import styles from "./styles.css";
const sanityClient = require("@sanity/client");
const SanityConfig = require("../sanity.json");

const client = sanityClient({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

const RelatedArticles = React.forwardRef((props, ref) => {
  const [userDocuments, setUserDocuments] = useState([]);

  const getUserDocs = useCallback(async () => {
    const userDocs = await client
      .fetch(`*["${props.document._id}" == contact._ref]`)
      .catch((e) => console.error(e.message));
    userDocs && setUserDocuments(userDocs);
  }, [props.document]);

  useEffect(() => {
    if (!props.document) {
      return;
    }
    getUserDocs();
  }, [getUserDocs]);

  if (userDocuments.length === 0) {
    return (
      <Stack space={0} ref={ref} space={[3, 1, 2, 4]}>
        <Heading as="h2" size={2}>
          Ingen sider relatert til bruker
        </Heading>
      </Stack>
    );
  }

  const outdated = userDocuments.filter((doc) => {
    if (!doc?.metadata?.last_update) return false;
    const lastUpdate = moment(doc._updatedAt);
    const daysSince = moment().diff(lastUpdate, "days");
    return daysSince > 180;
  });

  const stagnated = userDocuments.filter((doc) => {
    if (!doc?.metadata?.last_update) return false;
    const lastUpdate = moment(doc._updatedAt);
    const daysSince = moment().diff(lastUpdate, "days");
    return daysSince > 90 && daysSince <= 180;
  });

  return (
    <Stack space={0} ref={ref} space={[3, 1, 2, 4]}>
      <Accordion>
        {outdated.length > 0 && (
          <Accordion.Item>
            <Accordion.Header>Utdaterte sider</Accordion.Header>
            <Accordion.Content>
              <List>
                {outdated.map((doc) => (
                  <Item key={doc._id}>
                    <IntentLink
                      intent="edit"
                      params={{
                        type: doc._type,
                        id: getPublishedId(doc._id),
                      }}
                      className={styles.link}
                    >
                      <SanityPreview
                        layout="default"
                        type={schema.get(doc._type)}
                        value={doc}
                        key={doc._id}
                      />
                    </IntentLink>
                  </Item>
                ))}
              </List>
            </Accordion.Content>
          </Accordion.Item>
        )}

        {stagnated.length > 0 && (
          <Accordion.Item>
            <Accordion.Header>Stagnerte sider sider</Accordion.Header>
            <Accordion.Content>
              <List>
                {stagnated.map((doc) => (
                  <Item key={doc._id}>
                    <IntentLink
                      intent="edit"
                      params={{
                        type: doc._type,
                        id: getPublishedId(doc._id),
                      }}
                      className={styles.link}
                    >
                      <SanityPreview
                        layout="default"
                        type={schema.get(doc._type)}
                        value={doc}
                        key={doc._id}
                      />
                    </IntentLink>
                  </Item>
                ))}
              </List>
            </Accordion.Content>
          </Accordion.Item>
        )}

        <Accordion.Item>
          <Accordion.Header>Alle sider</Accordion.Header>
          <Accordion.Content>
            <List>
              {userDocuments.map((doc) => (
                <Item key={doc._id}>
                  <IntentLink
                    intent="edit"
                    params={{
                      type: doc._type,
                      id: getPublishedId(doc._id),
                    }}
                    className={styles.link}
                  >
                    <SanityPreview
                      layout="default"
                      type={schema.get(doc._type)}
                      value={doc}
                      key={doc._id}
                    />
                  </IntentLink>
                </Item>
              ))}
            </List>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
});

export default withDocument(RelatedArticles);
