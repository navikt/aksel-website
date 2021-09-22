import moment from "moment";

export function updatedBadge(props) {
  if (props.published === null) return null;
  if (
    props.published.metadata === undefined ||
    props.published.metadata.updates === undefined
  ) {
    return null;
  }

  const updates = props.published.metadata.updates;
  const lastUpdate = moment(updates.last_update);

  const toStagnant = lastUpdate.diff(updates.stagnant, "days");
  const toExpired = lastUpdate.diff(updates.expired, "days");

  switch (true) {
    case toExpired > 0:
      return {
        label: "Utdatert innhold",
        title: "Innholdet må ses over igjen!",
        color: "danger",
      };
    case toStagnant > 0:
      return {
        label: "Stagnert innhold",
        title: "Begynner å bli en stund siden innholdet ble oppdatert nå!",
        color: "warning",
      };
    default:
      return null;
  }
}
