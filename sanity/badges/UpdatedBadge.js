import moment from "moment";

export function updatedBadge(props) {
  const warningDays = 120;
  const errorDays = 180;

  if (props.published === null) return null;

  const lastUpdate = moment(props.published._updatedAt);

  const daysSince = Math.abs(lastUpdate.diff(moment(), "days"));

  switch (true) {
    case daysSince > errorDays:
      return {
        label: "Utdatert innhold",
        title: "Innholdet må ses over igjen!",
        color: "danger",
      };
    case daysSince > warningDays:
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
