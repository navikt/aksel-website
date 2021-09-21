import moment from "moment";
import { outdatedContent } from "../config";

export function updatedBadge(props) {
  if (props.published === null) return null;
  if (outdatedContent.error <= outdatedContent.warning)
    console.error(
      "outdatedContent.error cant be smaller than outdatedContent.warning"
    );

  const lastUpdate = moment(props.published._updatedAt);

  const daysSince = Math.abs(lastUpdate.diff(moment(), "days"));

  switch (true) {
    case daysSince > outdatedContent.error:
      return {
        label: "Utdatert innhold",
        title: "Innholdet må ses over igjen!",
        color: "danger",
      };
    case daysSince > outdatedContent.warning:
      return {
        label: "Stagnert innhold",
        title: "Begynner å bli en stund siden innholdet ble oppdatert nå!",
        color: "warning",
      };
    default:
      return {
        label: "Fresh",
        title: "Innholdet er nylig oppdatert!",
        color: "success",
      };
  }
}
