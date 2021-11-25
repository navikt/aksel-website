import css from "css";
import { readFileSync } from "fs";
import { noCdnClient } from ".";
import dotenv from "dotenv";

dotenv.config();

type SemanticColorEntry = {
  title: string;
  color_value: string;
  color_name: string;
  category: string;
  subcategory: string;
};

type GlobalColorEntry = {
  title: string;
  color_value: string;
  category: string;
  subcategory: string;
};

function declarationToColor(declaration, declarationList): [string, string] {
  var value: string;
  var name: string;
  if (declaration.value.startsWith("var(")) {
    const target = declaration.value.slice(4, -1);
    const resolved = declarationList.find((d) => d.property == target);
    if (resolved === null) {
      return null;
    }
    value = declaration.value;
    name = resolved.property.replace("--navds-global-color-", "");
  } else {
    value = declaration.value;
  }
  return [name, value];
}

function parseDeclaration(
  declaration,
  declarationList
): SemanticColorEntry | GlobalColorEntry {
  const property = declaration.property;
  const value = declaration.value;
  const ignoredTags = ["navds"];
  const globalAndSemanticTags = ["semantic", "global"];
  const specialCases = ["text", "divider", "focus", "border"];
  const propOrMainCategory = (prev: string, cur: string) =>
    globalAndSemanticTags.includes(prev) ? `${prev}-${cur}` : cur;

  const props = property
    .split("-") // split on -
    .map((prop, idx, array) =>
      !globalAndSemanticTags.includes(prop)
        ? propOrMainCategory(array[idx - 1], prop)
        : ""
    )
    .filter((prop: string) => prop?.length != 0 && !ignoredTags.includes(prop)); // remove empty and ignored tags

  // now props should look something like
  // ["global-color", "blue", "500"]
  // the first element is always global/semantic-color, so we can say that's the category
  const category = props[0];

  // subcategory will always be something like "blue", "text", or "feedback", etc.
  const subcategory = props[1];
  if (category === global) {
    // in the case of global, we can just put "blue" and "500" together to form the name
    return {
      title: props.slice(1).join("-"),
      color_value: value, // this'll be something like rgba(0, 0, 1, 1) in this case
      subcategory,
      category,
    };
  }

  // we'll grab the used color name and color value for the semantic colors
  // this'll be references to a global color
  const [color_name, color_value] = declarationToColor(
    declaration,
    declarationList
  );

  if (specialCases.includes(subcategory)) {
    const title = props.slice(2).join("-");
    // in special cases, we'd like to prepend the title with the subcategory
    // e.g. "text-inverted" and not just "inverted"
    // TODO: we might need some more checks at this point, since this approach
    // produces "text-link" as well, and not just "link" :thinking:
    return {
      title: title === "" ? subcategory : `${subcategory}-${title}`,
      color_value,
      color_name,
      subcategory,
      category,
    };
  }

  // in every other case, we can say the title is everything after category/subcategory joined with "-"
  // e.g. "warning-background" in the "feedback" category
  return {
    title: props.slice(2).join("-"),
    color_value,
    color_name,
    subcategory,
    category,
  };
}

const semantic = "semantic-color";
const global = "global-color";

const cssData = readFileSync(
  "../node_modules/@navikt/ds-tokens/dist/tokens.css"
);

const parsed = css.parse(cssData.toString());
const root = parsed.stylesheet.rules.find((r) =>
  r.selectors?.includes(":root")
);

const colors = root.declarations
  .filter((d) => d.property.includes(global) || d.property.includes(semantic))
  .map((d) => parseDeclaration(d, root.declarations));

var colorMap = new Map();

// for simplicity's sake later on, we'll shape our list into a map
colors.forEach((color) => {
  const colors =
    colorMap.get(color.subcategory) === undefined
      ? new Array()
      : colorMap.get(color.subcategory);
  const key = `${color.title.replace("-", "_")}_autogen_color`;
  if (color.category === global) {
    colors.push({
      _key: key,
      _type: "ds_color",
      title: color.title,
      color_type: "global",
      color_value: color.color_value,
    });
  } else {
    colors.push({
      _key: key,
      _type: "ds_color",
      title: color.title,
      color_type: "semantic",
      color_value: color.color_value,
      color_name: color.color_name,
    });
  }
  colorMap.set(color.subcategory, colors);
});

const updateColors = async () => {
  const token = process.env.SANITY_WRITE_KEY;

  // first let's fetch the current state from sanity,
  // we'll use it to reuse non-generated content like
  // category descriptions and color roles in semantic colors
  const query = `*[_type == "ds_color_categories"]`;
  const remoteColors = await noCdnClient(token).fetch(query);

  // this is our transactional client, it won't push anything until we say .commit() later
  const transactionClient = noCdnClient(token).transaction();

  for (const key of colorMap.keys()) {
    const localColor = colorMap.get(key);

    // fetch the remote color if it exists
    const remoteColor = remoteColors.find(
      (c) => c._id.replace("_autogen_color", "") === key
    );

    // these'll be undefined if the color doesn't exist and that's fine,
    // but we'll reuse the description from remote if it exists!
    const description = remoteColor?.description;

    var colorList = localColor.map((c) => {
      const remoteRoles = remoteColor?.colors.find(
        (f) => c._id == f._id
      ).color_roles;
      // we'll shape our final color list with the color_role from remote,
      // as to not overwrite it!
      return {
        color_roles: remoteRoles,
        ...c,
      };
    });

    // sort so that we'll get gray-50 before gray-100, etc.
    colorList.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

    transactionClient.createOrReplace({
      _id: `${key}_autogen_color_example`,
      _type: "ds_color_categories",
      title: key,
      description: description,
      colors: colorList,
    });
  }
  await transactionClient
    .commit()
    .then(() => console.log(`Updated color categories`))
    .catch((e) => console.error(e.message));
};

updateColors();
