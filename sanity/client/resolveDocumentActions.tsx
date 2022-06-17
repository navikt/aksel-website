import defaultResolve, {
  PublishAction,
} from "part:@sanity/base/document-actions";
import SetAndPublishAction from "./actions/publishedAt";
import { allDocumentTypes } from "../config";

export default function resolveDocumentActions(props) {
  return defaultResolve(props).map((Action) => {
    return allDocumentTypes.includes(props.type) && Action === PublishAction
      ? SetAndPublishAction
      : Action;
  });
}
