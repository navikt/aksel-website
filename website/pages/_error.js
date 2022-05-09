import { Heading } from "@navikt/ds-react";

/* eslint-disable react/prop-types */
const MyError = ({ statusCode }) => {
  return (
    <div id="vk-notFoundId">
      <div>
        <Heading spacing level="1" size="large">
          {statusCode} - En feil oppstod.
        </Heading>
      </div>
    </div>
  );
};

export default MyError;
