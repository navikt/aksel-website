import Error from "next/error";

function Page() {
  return <Error statusCode={404} />;
}

export default Page;
