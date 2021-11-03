import Error from "next/error";

function Page() {
  return <Error statusCode={404}></Error>;
}

export default Page;
