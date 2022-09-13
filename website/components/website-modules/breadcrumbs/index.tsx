import NextLink from "next/link";

const BreadCrumbs = ({ href, text }: { href: string; text: string }) => {
  return (
    <NextLink href={href} passHref>
      <a className="group mb-1 flex w-fit items-center justify-start gap-3 text-deepblue-500 transition-transform hover:text-deepblue-800 focus:underline focus:outline-none">
        <svg
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.8 13.5L1.58234 9C0.805887 8.17157 0.805888 6.82843 1.58234 6L5.8 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1.80078 7.5H10.8008"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-transform group-hover:[transform:_rotateY(60deg)]"
          />
          <path
            d="M14.8008 7.5H16.8008"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14.8008 7.5H16.8008"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-transform group-hover:[transform:_translateX(-2px)]"
          />
          <path
            d="M14.8008 7.5H16.8008"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-transform group-hover:[transform:_translateX(-4px)]"
          />
          <path
            d="M14.8008 7.5H16.8008"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-transform group-hover:[transform:_translateX(-6px)]"
          />
        </svg>
        {text}
      </a>
    </NextLink>
  );
};

export default BreadCrumbs;
