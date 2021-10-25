import { Modal } from "@navikt/ds-react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "J64I2SIG7K",
  "92d2ac76eba4eba628a34baa11743fc1"
);

const index = "vk_designsystemet";

const Search = () => {
  return (
    <Modal open={true} onClose={() => null}>
      <InstantSearch indexName={index} searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </Modal>
  );
};

const Hit = ({ hit, ...rest }: { hit: any }) => (
  console.log(rest), (<pre>{JSON.stringify(hit, null, 2)}</pre>)
);
export default Search;
