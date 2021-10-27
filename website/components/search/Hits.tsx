import { BodyLong, Detail } from "@navikt/ds-react";
import React, { useEffect, useRef, useState } from "react";
import { useKey, useUpdateEffect } from "react-use";
import styled from "styled-components";
import { AlgoliaIcon } from "..";
import Hit from "./Hit";

const ScHits = styled.dl`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
  border-radius: 4px;
  background-color: white;
  margin: 0;
`;

const ScCategory = styled(Detail)`
  background-color: #f7f7f7;
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

const Hits = React.forwardRef<HTMLInputElement, HitsProps>(
  ({ hits, value }: HitsProps, ref) => {
    const itemsRef = useRef<any>([ref]);
    const [activeN, setActiveN] = useState(0);
    const hitsRef = useRef<HTMLDListElement>(null);

    const handleUp = (e) => {
      e.preventDefault();
      setActiveN((n) => (n - 1 < 0 ? itemsRef.current.length - 1 : n - 1));
    };

    const handleDown = (e) => {
      e.preventDefault();
      setActiveN((n) => (n + 1 === itemsRef.current.length ? 0 : n + 1));
    };

    const handleTab = (e) => {
      setActiveN(0);
      !e.shiftKey &&
        hitsRef.current.contains(document.activeElement) &&
        itemsRef.current[0]?.current?.focus();
    };

    useKey("ArrowUp", (e) => handleUp(e));
    useKey("ArrowDown", (e) => handleDown(e));
    useKey("Tab", (e) => handleTab(e));

    /* Reset */
    useEffect(() => {
      setActiveN(0);
      itemsRef.current = [ref];
    }, [value]);

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

                {hits[category].map((hit, i) => (
                  <Hit
                    ref={(el) => (itemsRef.current[i + 1] = { current: el })}
                    key={hit.objectID}
                    hit={hit}
                    onFocus={() => setActiveN(i + 1)}
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
