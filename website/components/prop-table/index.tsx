import "nav-frontend-tabell-style/dist/main.css";
import React from "react";
import { PreviewBox } from "../templates/pages/page.styles";
import * as S from "./prop-table.styles";

const PropTable = ({ node }: { node: { props: any } }): JSX.Element => {
  return <PreviewBox>🚧 Proptable 🚧</PreviewBox>;
  const propRows = node.props;
  if (propRows.length === 0) return null;
  return (
    <S.PropTable>
      <table
        className="tabell"
        summary="Oversikt over react-props komponenten bruker"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Req</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {propRows.map((prop) => {
            return (
              <tr key={prop._key}>
                <td>{prop.prop_name}</td>
                <td>{prop.prop_type}</td>
                <td>{prop.prop_required ? "✔️" : "❌"}</td>
                {<td>{prop.prop_default ? prop.prop_default : ""}</td>}
                {<td>{prop.prop_description ? prop.prop_description : ""}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </S.PropTable>
  );
};

export default PropTable;
