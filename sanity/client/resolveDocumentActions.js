// import the default document actions
import defaultResolve from "part:@sanity/base/document-actions";
import { PublishAction } from "./documentActions/publishAction";

import SetAndPublishAction from "./documentActions/updateDocumentAction";

console.log(defaultResolve);
export default function resolveDocumentActions(props) {
  return [
    PublishAction,
    SetAndPublishAction,
    ...defaultResolve(props).slice(1),
  ];
}
