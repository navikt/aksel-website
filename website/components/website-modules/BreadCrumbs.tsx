import NextLink from "next/link";
import { useRouter } from "next/router";

export const BreadCrumbs = ({
  href,
  text,
  auto = false,
}: {
  href?: string;
  text?: string;
  auto?: boolean;
}) => {
  const router = useRouter();

  if (!router.query?.tema && auto) {
    return null;
  }

  return (
    <NextLink href={href ?? `/tema/${router.query.tema}`} passHref>
      <a className="group mb-1 flex w-fit items-center justify-start gap-2 text-deepblue-500 transition-transform hover:text-deepblue-800 focus:underline focus:outline-none">
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[20px] w-[10px] group-hover:w-[16px]"
          aria-hidden
        >
          <path
            d="M8 17.5L2.12132 11.6213C0.949744 10.4497 0.949746 8.55025 2.12132 7.37868L8 1.5"
            stroke="#004367"
            strokeWidth="1.5"
          />
          <path
            d="M16 9.72266L8 9.72266"
            stroke="#004367"
            strokeWidth="1.5"
            className="hidden group-hover:block"
          />
        </svg>

        {text ??
          (router.query.tema as string).replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase()
          )}
      </a>
    </NextLink>
  );
};
