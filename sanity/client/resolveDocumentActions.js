// import the default document actions
import defaultResolve from "part:@sanity/base/document-actions";

import SetAndPublishAction from "./documentActions/updateDocumentAction";

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), SetAndPublishAction];
}
