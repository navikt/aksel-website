export function PrivateBadge(props) {
  const doc = props.published || props.draft;

  const isPrivate = doc?.tilgang?.privat;

  if (!isPrivate) {
    return null;
  }

  return {
    label: "Lukket side",
    title: "Innhold er bare tilgjengelig for NAV-ansatte",
    color: "warning",
  };
}
