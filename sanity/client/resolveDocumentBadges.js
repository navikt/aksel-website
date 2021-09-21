/* Default badge */
import defaultResolve from "part:@sanity/base/document-badges";

import { updatedBadge } from "../badges/UpdatedBadge";

export default function resolveDocumentBadges(props) {
  return [...defaultResolve(props), updatedBadge];
}
