import defaultResolve from "part:@sanity/base/document-badges";

import { PrivateBadge } from "./badges/PrivateBadge";

export default function resolveDocumentBadges(props) {
  return [...defaultResolve(props), PrivateBadge];
}
