/* https://github.com/sanity-io/dashboard-widget-document-list/blob/master/src/DocumentList.js */

import React from "react";
import PropTypes from "prop-types";
import { IntentLink } from "part:@sanity/base/router";
import SanityPreview from "part:@sanity/base/preview";
import Spinner from "part:@sanity/components/loading/spinner";
import schema from "part:@sanity/base/schema";
import { getSubscription } from "./sanityConnector";
import Button from "part:@sanity/components/buttons/default";
import IntentButton from "part:@sanity/components/buttons/intent";
import { List, Item } from "part:@sanity/components/lists/default";
import { getPublishedId } from "part:@sanity/base/util/draft-utils";
import moment from "moment";
import { Tag } from "@navikt/ds-react";

import styles from "./Widget.css";

const schemaTypeNames = schema.getTypeNames();

class DatedDocuments extends React.Component {
  static propTypes = {
    imageWidth: PropTypes.number,
  };

  state = {
    documents: null,
    loading: true,
    error: null,
  };

  componentDidMount = () => {
    const { assembledQuery, params } = this.assembleQuery();

    this.unsubscribe();
    this.subscription = getSubscription(assembledQuery, params, "v1").subscribe(
      {
        next: (documents) =>
          this.setState({
            documents: documents
              .sort((a, b) => {
                const lastUpdateA = moment(a._updatedAt);
                const lastUpdateB = moment(b._updatedAt);
                return lastUpdateA.diff(lastUpdateB, "days");
              })
              .filter((doc) => {
                const lastUpdate = moment(doc._updatedAt);
                return Math.abs(lastUpdate.diff(moment(), "days")) > 60;
              }),
            loading: false,
          }),
        error: (error) => this.setState({ error, loading: false }),
      }
    );
  };

  assembleQuery = () => {
    /* const documentTypes = schemaTypeNames.filter((typeName) => {
      const schemaType = schema.get(typeName);
      return schemaType.type && schemaType.type.name === "document";
    }); */

    return {
      assembledQuery: `*[_type in $types] | order(_updatedAt asc)`,
      params: {
        types: [
          "ds_component_page",
          "ds_article_page",
          "ds_tabbed_article_page",
        ],
      },
    };
  };

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const { documents, loading, error } = this.state;

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Utdaterte sider</h2>
        </header>
        <div className={styles.content}>
          {error && <div>{error.message}</div>}
          {!error && loading && <Spinner center message="Loading..." />}
          {!error && !documents && !loading && (
            <div>Could not locate any documents :/</div>
          )}
          <List>
            {documents &&
              documents.map((doc) => {
                const lastUpdate = moment(doc._updatedAt);
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
                        <Tag
                          size="small"
                          variant={daysSince > 75 ? "error" : "warning"}
                        >
                          {daysSince}
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
