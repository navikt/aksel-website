/* https://github.com/sanity-io/dashboard-widget-document-list/blob/master/src/DocumentList.js */

import { Tag } from "@navikt/ds-react";
import { IntentLink } from "part:@sanity/base/router";
import { getPublishedId } from "part:@sanity/base/util/draft-utils";
import { Item, List } from "part:@sanity/components/lists/default";
import Spinner from "part:@sanity/components/loading/spinner";
import SanityPreview from "part:@sanity/base/preview";
import schema from "part:@sanity/base/schema";
import React from "react";
import config from "../../config";
import { getSubscription } from "./sanityConnector";
import styles from "./widget.css";

class InNavDocuments extends React.Component {
  state = {
    documents: null,
    navigation_documents: null,
    loading: true,
    error: null,
  };

  componentDidMount = () => {
    this.unsubscribe();
    this.subscription = getSubscription(
      `*[_type in $types] | order(_updatedAt asc)`,
      {
        types: [...config.allDocumentTypes],
      },
      "v1"
    ).subscribe({
      next: (documents) =>
        this.setState({
          documents: documents,
          loading: false,
        }),
      error: (error) => this.setState({ error, loading: false }),
    });
    this.navSubscription = getSubscription(
      `*[_id in $ids] | order(_updatedAt desc)`,
      {
        ids: ["navigation_designsystem"],
      },
      "v1"
    ).subscribe({
      next: (documents) =>
        this.setState({
          navigation_documents: JSON.stringify(documents),
          loading: false,
        }),
      error: (error) => this.setState({ error, loading: false }),
    });
  };

  unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
    this.navSubscription && this.navSubscription.unsubscribe();
  }

  render() {
    const { documents, navigation_documents, loading, error } = this.state;

    const filteredDocs =
      documents &&
      navigation_documents &&
      documents.filter((doc) => navigation_documents.indexOf(doc._id) === -1);

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Sider ikke i navigasjon</h2>
        </header>
        <div className={styles.content}>
          {error && <div>{error.message}</div>}
          {!error && loading && <Spinner center message="Loading..." />}
          {!error && !documents && !loading && (
            <div>Alt fungerer som det skal! :/</div>
          )}
          <List>
            {filteredDocs &&
              filteredDocs.map((doc) => {
                const type = schema.get(doc._type);
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
                      <SanityPreview
                        layout="default"
                        type={type}
                        value={doc}
                        key={doc._id}
                      />
                    </IntentLink>
                  </Item>
                );
              })}
          </List>
        </div>
      </div>
    );
  }
}

class DisabledComp extends React.Component {
  render() {
    return null;
  }
}

export default {
  name: "document-in-nav-widget",
  component: DisabledComp,
};
