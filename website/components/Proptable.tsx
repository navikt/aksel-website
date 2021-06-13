import { Title } from "@navikt/ds-react";
import "nav-frontend-tabell-style/dist/main.css";

const PropTable = ({ node }) => {
  const props = node.props;
  return (
    <div>
      <Title spacing level={2} size="xl">
        Proptable
      </Title>
      <table className="tabell">
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
          {props.map((prop) => {
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
    </div>
  );
};

export default PropTable;
