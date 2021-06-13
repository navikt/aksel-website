const PropTable = ({ node }) => {
  const props = node.sections;
  return (
    <table>
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
              {prop.prop_default && <td>{prop.prop_default}</td>}
              {prop.prop_description && <td>{prop.prop_description}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PropTable;
