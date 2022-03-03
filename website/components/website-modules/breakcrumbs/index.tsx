import { Next } from "@navikt/ds-icons";
import { Label, Link } from "@navikt/ds-react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const ArtikkelBreadcrumbs = () => {
  const router = useRouter();

  if (!router.query?.tema) {
    return null;
  }

  return (
    <div className="absolute top-0 flex items-center gap-1 pt-3">
      <NextLink href="/" passHref>
        <Link>Temaer</Link>
      </NextLink>
      <Next />
      <NextLink href={`/tema/${router.query.tema}`} passHref>
        <Link>{router.query.tema}</Link>
      </NextLink>
      <Next />
      <Label>{(router.query.slug as string).split("-").join(" ")}</Label>
    </div>
  );
};

export const TemaBreadcrumbs = () => {
  const router = useRouter();

  const linkPath = router.asPath.split("/");
  linkPath.shift();

  const crumbs = linkPath.map((path, i) => {
    return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
  });

  const replaceStrings = (s) => s.replace("tema", "Temaer");

  return (
    <div className="absolute top-0 flex items-center gap-1 pt-3">
      <NextLink href="/" passHref>
        <Link>Hjem</Link>
      </NextLink>
      <Next />
      {crumbs.map((crumb, i) =>
        crumbs.length - 1 !== i ? (
          <>
            <NextLink href={crumb.href} passHref>
              <Link key={crumb.breadcrumb + i + "link"}>
                {replaceStrings(crumb.breadcrumb)}
              </Link>
            </NextLink>
            <Next />
          </>
        ) : (
          <Label key={crumb.breadcrumb + i}>
            {replaceStrings(crumb.breadcrumb)}
          </Label>
        )
      )}
    </div>
  );
};
