import css from "css";
import { readFileSync } from "fs";

const semantic = "semantic-color";
const global = "global-color";

type Color = {
  name: string;
  value: string;
};

type SemanticColorEntry = {
  example: Color;
  token: string;
  type: string;
  category: string;
};

type GlobalColorEntry = {
  token: string;
  value: string;
  category: string;
};

function parseProperty(property): [string, string, string] {
  if (!property.startsWith("--navds-")) {
    return ["", "", null];
  }
  property = property.replace("--navds-", "");
  var category: string;
  if (property.startsWith(semantic)) {
    category = semantic;
    property = property.replace("semantic-color-", "");
    const index = property.indexOf("-");
    if (index === -1) {
      return ["", property, category];
    }
    return [property.slice(0, index), property.slice(index + 1), category];
  } else if (property.startsWith(global)) {
    category = global;
    property = property.replace("global-color-", "");
    return ["", property, category];
  }
}

function declarationToColor(declaration, declarationList): Color | null {
  var value: string;
  var name: string;
  if (declaration.value.startsWith("var(")) {
    const target = declaration.value.slice(4, -1);
    const resolved = declarationList.find((d) => d.property == target);
    if (resolved === null) {
      return null;
    }
    value = resolved.value;
    name = resolved.property.replace("--navds-global-color-", "");
  } else {
    value = declaration.value;
    name = declaration.property.replace("--navd-global-color-", "");
  }
  return {
    name,
    value,
  };
}

function declarationToColorEntry(
  declaration,
  declarationList
): SemanticColorEntry | GlobalColorEntry {
  const [type, token, category] = parseProperty(declaration.property);
  const example = declarationToColor(declaration, declarationList);
  if (category === global) {
    return {
      token: token,
      value: example.value,
      category: category,
    };
  }
  return {
    example,
    type,
    token,
    category,
  };
}

const cssData = readFileSync(
  "../node_modules/@navikt/ds-tokens/dist/tokens.css"
);
const parsed = css.parse(cssData.toString());
const root = parsed.stylesheet.rules.find((r) =>
  r.selectors?.includes(":root")
);
const filtered = root.declarations.filter(
  (d) => d.property.includes("semantic") || d.property.includes("global")
);

const colorEntries = filtered.map((d) =>
  declarationToColorEntry(d, root.declarations)
);

console.log(JSON.stringify(colorEntries, null, 2));
