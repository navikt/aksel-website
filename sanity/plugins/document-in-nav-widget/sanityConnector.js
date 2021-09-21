/* https://github.com/sanity-io/dashboard-widget-document-list/blob/master/src/sanityConnector.js */

import { of as observableOf } from "rxjs";
import { switchMap, delay, tap, mergeMap } from "rxjs/operators";
import sanityClient from "part:@sanity/base/client";

const withConfig = (config) => {
  return typeof sanityClient.withConfig === "function"
    ? sanityClient.withConfig(config)
    : sanityClient;
};

const prepareDocumentList = (incoming, apiVersion) => {
  if (!incoming) {
    return Promise.resolve([]);
  }
  const documents = Array.isArray(incoming) ? incoming : [incoming];

  return documents.filter((doc) => !doc._id.startsWith("drafts."));
};

const getSubscription = (query, params, apiVersion) =>
  withConfig({ apiVersion })
    .listen(query, params, {
      events: ["welcome", "mutation"],
      includeResult: false,
      visibility: "query",
    })
    .pipe(
      switchMap((event) => {
        return observableOf(1).pipe(
          event.type === "welcome" ? tap() : delay(1000),
          mergeMap(() =>
            withConfig({ apiVersion })
              .fetch(query, params)
              .then((incoming) => {
                return prepareDocumentList(incoming, apiVersion);
              })
              .catch((error) => {
                if (error.message.startsWith("Problems fetching docs")) {
                  throw error;
                }
                throw new Error(
                  `Query failed ${query} and ${JSON.stringify(
                    params
                  )}. Error: ${error.message}`
                );
              })
          )
        );
      })
    );

module.exports = {
  getSubscription,
};
