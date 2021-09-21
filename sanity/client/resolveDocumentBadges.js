/* Default badge */
/* import defaultResolve from "part:@sanity/base/document-badges"; */

import { updatedBadge } from "../badges/UpdatedBadge";
/* ...defaultResolve(props) */
export default function resolveDocumentBadges() {
  return [updatedBadge];
}
