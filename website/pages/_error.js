import NextErrorComponent from "next/error";

/* eslint-disable react/prop-types */
const MyError = ({ statusCode }) => {
  return <NextErrorComponent statusCode={statusCode} />;
};

export default MyError;
