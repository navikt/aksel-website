import { Link, Title } from "@navikt/ds-react";
import styled from "styled-components";
import { urlFor } from "../lib/santiy";
/* import styled from "styled-components"; */
import { SanityBlockContent } from "./templating/SanityBlockContent";

const Img = styled.img`
  width: 100%;
`;

const DoDont = ({ node }) => {
  console.log(node);
  return (
    <div>
      <Img src={urlFor(node.do_dont_1).format("jpg").quality(80).url() || ""} />
    </div>
  );
};

export default DoDont;
