import { BodyShort, Heading } from "@navikt/ds-react";
import cl from "classnames";
import Color from "color";
import { Snippet } from "../../code";
import { CodeSnippet, DsColor } from "@/lib";
import ColorFormats from "./ColorFormats";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const tokenSnippet = (color: DsColor): CodeSnippet => ({
  _type: "code_snippet",
  title: `Token-snippet for ${color.title} icon`,
  code: {
    language: "css",
    code: `/* CSS */
var(${color.full_title});

/* Less */
${color.full_title.replace("--", "@")};`,
  },
});

const ColorModal = ({ color }: { color: DsColor }) => {
  return (
    <div className="flex min-w-[300px] max-w-2xl flex-shrink flex-col gap-4">
      <div>
        <Heading spacing size="medium">
          {capitalize(color.title.replaceAll("-", " "))}
        </Heading>
        <BodyShort spacing>
          {color.color_type === "semantic" ? "Semantisk farge" : "Global farge"}
        </BodyShort>
      </div>

      {color.color_type === "global" && (
        <div>
          <div
            className={cl("flex items-center rounded-lg py-4 pr-8 pl-2", {
              "text-text-inverted": Color(color.color_value).isDark(),
              "text-text": !Color(color.color_value).isDark(),
              "shadow:[0_0_0_1px_theme(colors.border-muted)]":
                Color(color.color_value).luminosity() > 0.9,
            })}
            style={{ backgroundColor: `var(${color.full_title})` }}
          >
            <BodyShort>{color.title}</BodyShort>
          </div>
        </div>
      )}
      {color.color_roles && (
        <div>
          <BodyShort className="text-text-muted" spacing>
            Roller
          </BodyShort>
          {color?.color_roles.map((role) => (
            <BodyShort key={role}>{role}</BodyShort>
          ))}
        </div>
      )}
      {color.color_type === "semantic" && (
        <div>
          <BodyShort className="text-text-muted" spacing>
            Global farge
          </BodyShort>
          <div
            className={cl("flex items-center rounded-lg py-4 pr-8 pl-2", {
              "text-text-inverted": Color(color.color_value).isDark(),
              "text-text": !Color(color.color_value).isDark(),
              "shadow:[0_0_0_1px_theme(colors.border-muted)]":
                Color(color.color_value).luminosity() > 0.9,
            })}
            style={{ backgroundColor: `var(${color.full_title})` }}
          >
            <BodyShort>{color.color_name}</BodyShort>
          </div>
        </div>
      )}
      <div>
        <Heading spacing size="small">
          Fargeverdier
        </Heading>
        <ColorFormats color={color} />
      </div>
      <div>
        <Heading spacing size="small">
          Token
        </Heading>
        <Snippet node={tokenSnippet(color)} />
      </div>
    </div>
  );
};

export default ColorModal;
