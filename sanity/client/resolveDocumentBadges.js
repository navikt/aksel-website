/* Default badge */
import defaultResolve from "part:@sanity/base/document-badges";

import { updatedBadge } from "../badges/UpdatedBadge";

export default function resolveDocumentBadges() {
  return [...defaultResolve(props), updatedBadge];
}
