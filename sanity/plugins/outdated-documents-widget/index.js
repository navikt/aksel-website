/* https://github.com/sanity-io/dashboard-widget-document-list/blob/master/src/DocumentList.js */

import { Tag } from "@navikt/ds-react";
import moment from "moment";
import { IntentLink } from "part:@sanity/base/router";
import { getPublishedId } from "part:@sanity/base/util/draft-utils";
import { Item, List } from "part:@sanity/components/lists/default";
import Spinner from "part:@sanity/components/loading/spinner";
import React from "react";
import config from "../../config";
import { getSubscription } from "./sanityConnector";
import styles from "./widget.css";

class DatedDocuments extends React.Component {
  state = {
    documents: null,
    loading: true,
    error: null,
  };

  componentDidMount = () => {
    const assembledQuery = `*[_type in $types] | order(_updatedAt asc)`;
    const params = {
      types: [...config.allDocumentTypes],
    };

    /*     if (props.published?.metadata === null) return null; */

    const { type } = this.props;

    this.unsubscribe();
    this.subscription = getSubscription(assembledQuery, params, "v1").subscribe(
      {
        next: (documents) =>
          this.setState({
            documents: documents
              .filter((doc) => {
                return doc.metadata && doc.metadata.updates;
              })
              .sort((a, b) => {
                const lastUpdateA = moment(a.metadata?.updates.last_update);
                const lastUpdateB = moment(b.metadata?.updates.last_update);
                return lastUpdateA.diff(lastUpdateB, "days");
              })
              .filter((doc) => {
                const lastUpdate = moment(doc.metadata.updates.last_update);
                const toStagnant = lastUpdate.diff(
                  doc.metadata.updates.stagnant,
                  "days"
                );
                const toExpired = lastUpdate.diff(
                  doc.metadata.updates.expired,
                  "days"
                );
                return type === "error"
                  ? toExpired > 0
                  : toExpired <= 0 && toStagnant > 0;
              }),
            loading: false,
          }),
        error: (error) => this.setState({ error, loading: false }),
      }
    );
  };

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const { documents, loading, error } = this.state;
    const { type } = this.props;

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            {type === "error" ? "Utdaterte sider" : "Stagnerte sider"}
          </h2>
        </header>
        <div className={styles.content}>
          {error && <div>{error.message}</div>}
          {!error && loading && <Spinner center message="Loading..." />}
          {!error && !documents && !loading && (
            <div>Could not locate any documents </div>
          )}
          <List>
            {documents &&
              documents.map((doc) => {
                const lastUpdate = moment(doc.metadata.updates.last_update);
                const daysSince = Math.abs(lastUpdate.diff(moment(), "days"));
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
                        {doc.title}
                      </span>
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

export default {
  name: "outdated-documents-widget",
  component: DatedDocuments,
};
