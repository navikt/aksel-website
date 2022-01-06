import { BodyLong, Detail } from "@navikt/ds-react";
import React, { useEffect, useRef, useState } from "react";
import { useKey, useUpdateEffect } from "react-use";
import styled from "styled-components";
import { AlgoliaIcon } from "../..";
import Hit from "./Hit";

const ScHits = styled.dl`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
  border-radius: 4px;
  background-color: var(--navds-semantic-color-canvas-background-light);
  margin: 0;
`;

const ScCategory = styled(Detail)`
  background-color: var(--navds-global-color-gray-50);
  padding: 0.5rem;
  text-transform: uppercase;
`;

const ScAlgoliaIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
`;

const ScNoHit = styled.div`
  display: flex;
  padding: 0.75rem;
`;

interface HitsProps {
  hits: { [key: string]: any[] };
  value: string;
}

// TODO: Fix unreliable wayt o handle refs here
const Hits = React.forwardRef<HTMLInputElement, HitsProps>(
  ({ hits, value }: HitsProps, ref) => {
    const itemsRef = useRef<any>([ref]);
    const [activeN, setActiveN] = useState(0);
    const hitsRef = useRef<HTMLDListElement>(null);
    const [counterList, setCounterList] = useState([]);

    useEffect(() => {
      setCounterList([
        ...Object.values(hits).reduce((prev, next) => [...prev, ...next], []),
      ]);
    }, [hits]);

    const handleUp = (e) => {
      e.preventDefault();
      setActiveN(() => (activeN - 1 < 0 ? counterList.length : activeN - 1));
    };

    const handleDown = (e) => {
      e.preventDefault();
      setActiveN(() => (activeN === counterList.length ? 0 : activeN + 1));
    };

    const handleTab = (e) => {
      setActiveN(0);
      !e.shiftKey &&
        hitsRef.current?.contains(document.activeElement) &&
        itemsRef.current[0]?.current?.focus();
    };

    useKey("ArrowUp", (e) => handleUp(e), {}, [counterList, activeN]);
    useKey("ArrowDown", (e) => handleDown(e), {}, [counterList, activeN]);
    useKey("Tab", (e) => handleTab(e), {}, [counterList]);

    /* Reset */
    useEffect(() => {
      setActiveN(0);
      itemsRef.current = [ref];
    }, [hits]);

    /* Only runs when updated, not on mount */
    useUpdateEffect(() => {
      const el: any = itemsRef.current?.[activeN];
      el && el?.current && el.current?.focus();
    }, [activeN]);

    return (
      <ScHits ref={hitsRef}>
        {Object.keys(hits).length === 0 ? (
          <ScNoHit>
            <BodyLong> Ingen treff for: {value}...</BodyLong>
          </ScNoHit>
        ) : (
          <>
            {Object.keys(hits).map((category) => (
              <div key={category}>
                <ScCategory forwardedAs="dt" size="small">
                  {category}
                </ScCategory>

                {hits[category].map((hit) => (
                  <Hit
                    ref={(el) => {
                      if (
                        counterList.findIndex((x) => hit.path === x.path) === -1
                      ) {
                        return;
                      }
                      return (itemsRef.current[
                        counterList.findIndex((x) => hit.path === x.path) + 1
                      ] = { current: el });
                    }}
                    key={hit.objectID}
                    hit={hit}
                    onFocus={() =>
                      setActiveN(
                        counterList.findIndex((x) => hit.path === x.path) + 1
                      )
                    }
                  />
                ))}
              </div>
            ))}
            <ScAlgoliaIcon>
              <AlgoliaIcon />
            </ScAlgoliaIcon>
          </>
        )}
      </ScHits>
    );
  }
);

export default Hits;
