// import the default document actions
import defaultResolve from "part:@sanity/base/document-actions";
import { PublishAction } from "./documentActions/publishAction";

import SetAndPublishAction from "./documentActions/updateDocumentAction";

export default function resolveDocumentActions(props) {
  console.log(props);

  return props.published?.metadata
    ? [PublishAction, SetAndPublishAction, ...defaultResolve(props).slice(1)]
    : [PublishAction, ...defaultResolve(props).slice(1)];
}
