import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Forside
 *
 *
 */
export interface VkFrontpage extends SanityDocument {
  _type: "vk_frontpage";

  /**
   * Cards — `array`
   *
   *
   */
  cards?: Array<
    SanityKeyed<{
      _type: "card";
      /**
       * Kategori — `reference`
       *
       *
       */
      category_ref?: SanityReference<MainCategories>;

      /**
       * Lenke url — `url`
       *
       *
       */
      link?: string;

      /**
       * Side under design.nav.no — `boolean`
       *
       *
       */
      internal?: boolean;

      /**
       * Krever innlogging for tilgang — `boolean`
       *
       *
       */
      locked?: boolean;

      /**
       * Tittel — `string`
       *
       *
       */
      title?: string;

      /**
       * Innhold — `string`
       *
       *
       */
      content?: string;
    }>
  >;
}

/**
 * Hovedkategorier
 *
 *
 */
export interface MainCategories extends SanityDocument {
  _type: "main_categories";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Nivå — `string`
   *
   *
   */
  level?: "top" | "designsystem";

  /**
   * Pictogram — `image`
   *
   *
   */
  picture?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt-tekst — `string`
     *
     * Beskriv bildet for skjermlesere
     */
    title?: string;
  };
}

/**
 * Komponentartikkel
 *
 *
 */
export interface DsComponentPage extends SanityDocument {
  _type: "ds_component_page";

  /**
   * Dokument-info — `object`
   *
   *
   */
  metadata?: {
    _type: "metadata";
    /**
     * Oppdatering av innhold — `string`
     *
     *
     */
    last_update?: string;

    /**
     * Redaktør/kontakt — `reference`
     *
     *
     */
    contact?: SanityReference<Editor>;

    /**
     * Bidragsytere — `array`
     *
     * Legg til de som har bidratt med denne siden!
     */
    contributors?: Array<SanityKeyedReference<Editor>>;

    /**
     * Dokument type — `string`
     *
     *
     */
    doctype?: string;
  };

  /**
   * Dokument tittel (For søk og visning i Sanity) — `string`
   *
   * Eks Guide: <tekst> eller Prinsipp: <tekst>
   */
  title?: string;

  /**
   * Sidetittel — `string`
   *
   * Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
   */
  heading?: string;

  /**
   * url — `slug`
   *
   * Strukturen bestemmes ikke av URL-en
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Tags — `array`
   *
   * Tagger siden slik at vi i fremtiden kan forbedre søk og visning.
   */
  tags?: Array<SanityKeyed<string>>;

  /**
   * Status — `string`
   *
   *
   */
  status?: "published" | "beta" | "wip" | "legacy";

  /**
   * Ingress (valgfritt) — `array`
   *
   *
   */
  ingress?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Bruk-tab — `blockContent`
   *
   *
   */
  usage?: BlockContent;

  /**
   * Design-tab — `blockContent`
   *
   *
   */
  design?: BlockContent;

  /**
   * Utvikling-tab — `blockContent`
   *
   *
   */
  development?: BlockContent;

  /**
   * Tilgjengelighet-tab — `blockContent`
   *
   *
   */
  accessibility?: BlockContent;

  /**
   * Relaterte pakker — `array`
   *
   * Kobler komponenten til en eller flere pakker
   */
  linked_packages?: Array<SanityKeyedReference<DsPackage>>;

  /**
   * Npm-pakke lenke (optional) — `url`
   *
   *
   */
  npm_link?: string;

  /**
   * Github-kode lenke (optional) — `url`
   *
   *
   */
  github_link?: string;

  /**
   * Figma lenke (optional) — `url`
   *
   *
   */
  figma_link?: string;

  /**
   * Søk — `object`
   *
   *
   */
  metadata_search?: {
    _type: "metadata_search";
    /**
     * Høyere prioritet i søk — `boolean`
     *
     * Bruk bare hvis siden virkeling trenger det!
     */
    high_priority?: boolean;

    /**
     * Søkbare tags — `array`
     *
     * Tags som skiller seg ut fra selve innholdet eller heading
     */
    tags?: Array<SanityKeyed<string>>;
  };

  /**
   * Tilbakemeldinger — `object`
   *
   *
   */
  metadata_feedback?: {
    _type: "metadata_feedback";
    /**
     * Skjul artikkel feedback modul — `boolean`
     *
     * Gjemmer <<Var denne artikkelen til hjelp?>> modulen.
     */
    hide_feedback?: boolean;
  };
}

/**
 * Artikkel
 *
 *
 */
export interface DsArticlePage extends SanityDocument {
  _type: "ds_article_page";

  /**
   * Dokument-info — `object`
   *
   *
   */
  metadata?: {
    _type: "metadata";
    /**
     * Oppdatering av innhold — `string`
     *
     *
     */
    last_update?: string;

    /**
     * Redaktør/kontakt — `reference`
     *
     *
     */
    contact?: SanityReference<Editor>;

    /**
     * Bidragsytere — `array`
     *
     * Legg til de som har bidratt med denne siden!
     */
    contributors?: Array<SanityKeyedReference<Editor>>;

    /**
     * Dokument type — `string`
     *
     *
     */
    doctype?: string;
  };

  /**
   * Dokument tittel (For søk og visning i Sanity) — `string`
   *
   * Eks Guide: <tekst> eller Prinsipp: <tekst>
   */
  title?: string;

  /**
   * Sidetittel — `string`
   *
   * Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
   */
  heading?: string;

  /**
   * url — `slug`
   *
   * Strukturen bestemmes ikke av URL-en
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Tags — `array`
   *
   * Tagger siden slik at vi i fremtiden kan forbedre søk og visning.
   */
  tags?: Array<SanityKeyed<string>>;

  /**
   * Status — `string`
   *
   *
   */
  status?: "published" | "beta" | "wip" | "legacy";

  /**
   * Ingress (valgfritt) — `array`
   *
   *
   */
  ingress?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Sideinnhold — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Søk — `object`
   *
   *
   */
  metadata_search?: {
    _type: "metadata_search";
    /**
     * Høyere prioritet i søk — `boolean`
     *
     * Bruk bare hvis siden virkeling trenger det!
     */
    high_priority?: boolean;

    /**
     * Søkbare tags — `array`
     *
     * Tags som skiller seg ut fra selve innholdet eller heading
     */
    tags?: Array<SanityKeyed<string>>;
  };

  /**
   * Tilbakemeldinger — `object`
   *
   *
   */
  metadata_feedback?: {
    _type: "metadata_feedback";
    /**
     * Skjul artikkel feedback modul — `boolean`
     *
     * Gjemmer <<Var denne artikkelen til hjelp?>> modulen.
     */
    hide_feedback?: boolean;
  };
}

/**
 * Artikkel med tabs
 *
 *
 */
export interface DsTabbedArticlePage extends SanityDocument {
  _type: "ds_tabbed_article_page";

  /**
   * Dokument-info — `object`
   *
   *
   */
  metadata?: {
    _type: "metadata";
    /**
     * Oppdatering av innhold — `string`
     *
     *
     */
    last_update?: string;

    /**
     * Redaktør/kontakt — `reference`
     *
     *
     */
    contact?: SanityReference<Editor>;

    /**
     * Bidragsytere — `array`
     *
     * Legg til de som har bidratt med denne siden!
     */
    contributors?: Array<SanityKeyedReference<Editor>>;

    /**
     * Dokument type — `string`
     *
     *
     */
    doctype?: string;
  };

  /**
   * Dokument tittel (For søk og visning i Sanity) — `string`
   *
   * Eks Guide: <tekst> eller Prinsipp: <tekst>
   */
  title?: string;

  /**
   * Sidetittel — `string`
   *
   * Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
   */
  heading?: string;

  /**
   * url — `slug`
   *
   * Strukturen bestemmes ikke av URL-en
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Tags — `array`
   *
   * Tagger siden slik at vi i fremtiden kan forbedre søk og visning.
   */
  tags?: Array<SanityKeyed<string>>;

  /**
   * Status — `string`
   *
   *
   */
  status?: "published" | "beta" | "wip" | "legacy";

  /**
   * Ingress (valgfritt) — `array`
   *
   *
   */
  ingress?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Tabs — `array`
   *
   *
   */
  tabs?: Array<
    SanityKeyed<{
      _type: "tab";
      /**
       * Tittel — `string`
       *
       * Innhold vil da legges under url/tab-tittel
       */
      title?: string;

      /**
       * Sideinnhold — `blockContent`
       *
       *
       */
      body?: BlockContent;

      /**
       * Søk — `object`
       *
       *
       */
      metadata_search?: {
        _type: "metadata_search";
        /**
         * Høyere prioritet i søk — `boolean`
         *
         * Bruk bare hvis siden virkeling trenger det!
         */
        high_priority?: boolean;

        /**
         * Søkbare tags — `array`
         *
         * Tags som skiller seg ut fra selve innholdet eller heading
         */
        tags?: Array<SanityKeyed<string>>;
      };

      /**
       * Tilbakemeldinger — `object`
       *
       *
       */
      metadata_feedback?: {
        _type: "metadata_feedback";
        /**
         * Skjul artikkel feedback modul — `boolean`
         *
         * Gjemmer <<Var denne artikkelen til hjelp?>> modulen.
         */
        hide_feedback?: boolean;
      };
    }>
  >;
}

/**
 * Forside
 *
 *
 */
export interface DsFrontpage extends SanityDocument {
  _type: "ds_frontpage";

  /**
   * Innhold — `blockContent_simple`
   *
   *
   */
  body?: BlockContentSimple;

  /**
   * Cards — `array`
   *
   *
   */
  cards?: Array<
    SanityKeyed<{
      _type: "card";
      /**
       * Lenke — `reference`
       *
       *
       */
      link_ref?: SanityReference<
        DsComponentPage | DsArticlePage | DsTabbedArticlePage
      >;

      /**
       * Tittel — `string`
       *
       *
       */
      title?: string;

      /**
       * Innhold — `string`
       *
       *
       */
      content?: string;
    }>
  >;
}

/**
 * Navigation
 *
 *
 */
export interface DsNavigation extends SanityDocument {
  _type: "ds_navigation";

  /**
   * Designsystem navigajsons-struktur — `string`
   *
   *
   */
  title?: string;

  /**
   * Header linker — `array`
   *
   *
   */
  headings?: Array<SanityKeyed<DsNavigationHeading>>;
}

/**
 * Kodepakke
 *
 *
 */
export interface DsPackage extends SanityDocument {
  _type: "ds_package";

  /**
   * Navn — `string`
   *
   *
   */
  title?: string;

  /**
   * Scope — `string`
   *
   *
   */
  scope?: "core" | "internal" | "navno";
}

/**
 * Komponentoversikt
 *
 *
 */
export interface DsComponentOverview extends SanityDocument {
  _type: "ds_component_overview";

  /**
   * Komponent — `array`
   *
   *
   */
  components?: Array<
    SanityKeyed<{
      _type: "component";
      /**
       * Komponentnavn — `string`
       *
       *
       */
      title?: string;

      /**
       * Pakkenavn — `reference`
       *
       * Kobler komponenten til en pakke og da om den er core/intern/navno. Alle tilgjengelige valg ligge under <Kodepakker>
       */
      linked_package?: SanityReference<DsPackage>;

      /**
       * Er komponenten ny? — `boolean`
       *
       *
       */
      new?: boolean;

      /**
       * Er komponenten i Figma/designet? — `boolean`
       *
       *
       */
      in_design?: boolean;

      /**
       * Figma bibliotek — `string`
       *
       *
       */
      figma_version?: "new" | "old" | "beta";

      /**
       * Er komponenten Kodet? — `boolean`
       *
       *
       */
      in_code?: boolean;

      /**
       * Er komponenten fortsatt i Beta? — `boolean`
       *
       *
       */
      in_code_beta?: boolean;

      /**
       * Er komponentkoden i synk med Figma? — `boolean`
       *
       *
       */
      figma_sync?: boolean;

      /**
       * Er komponenten i dokumentert? — `boolean`
       *
       *
       */
      in_doc?: boolean;

      /**
       * Legger til link til dokumentasjonen — `reference`
       *
       *
       */
      doc_link?: SanityReference<
        DsComponentPage | DsArticlePage | DsTabbedArticlePage
      >;
    }>
  >;
}

/**
 * Fargekategori
 *
 *
 */
export interface DsColorCategories extends SanityDocument {
  _type: "ds_color_categories";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Beskrivelse — `blockContent_simple`
   *
   *
   */
  description?: BlockContentSimple;

  /**
   * Farger — `array`
   *
   *
   */
  colors?: Array<SanityKeyed<DsColor>>;
}

/**
 * Artikkelside
 *
 *
 */
export interface GpArticlePage extends SanityDocument {
  _type: "gp_article_page";

  /**
   * Innhold — `string`
   *
   *
   */
  visningstekst?: string;

  /**
   * Notater — `text`
   *
   * Redaktør-notater. Noe som ble igjen på TODO lista? Legg det til her!
   */
  notes?: string;

  /**
   * Dokument-info — `object`
   *
   *
   */
  metadata?: {
    _type: "metadata";
    /**
     * Oppdatering av innhold — `string`
     *
     *
     */
    last_update?: string;

    /**
     * Redaktør/kontakt — `reference`
     *
     *
     */
    contact?: SanityReference<Editor>;

    /**
     * Bidragsytere — `array`
     *
     * Legg til de som har bidratt med denne siden!
     */
    contributors?: Array<SanityKeyedReference<Editor>>;

    /**
     * Dokument type — `string`
     *
     *
     */
    doctype?: string;
  };

  /**
   * Dokument tittel (For søk og visning i Sanity) — `string`
   *
   * Eks Guide: <tekst> eller Prinsipp: <tekst>
   */
  title?: string;

  /**
   * Sidetittel — `string`
   *
   * Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
   */
  heading?: string;

  /**
   * url — `slug`
   *
   * Strukturen bestemmes ikke av URL-en
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Status — `string`
   *
   *
   */
  status?: "published" | "beta" | "wip" | "legacy";

  /**
   * Ingress (valgfritt) — `array`
   *
   *
   */
  ingress?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Sideinnhold — `gp_blockContent`
   *
   *
   */
  body?: GpBlockContent;

  /**
   * Søk — `object`
   *
   *
   */
  metadata_search?: {
    _type: "metadata_search";
    /**
     * Høyere prioritet i søk — `boolean`
     *
     * Bruk bare hvis siden virkeling trenger det!
     */
    high_priority?: boolean;

    /**
     * Søkbare tags — `array`
     *
     * Tags som skiller seg ut fra selve innholdet eller heading
     */
    tags?: Array<SanityKeyed<string>>;
  };

  /**
   * Tilbakemeldinger — `object`
   *
   *
   */
  metadata_feedback?: {
    _type: "metadata_feedback";
    /**
     * Skjul artikkel feedback modul — `boolean`
     *
     * Gjemmer <<Var denne artikkelen til hjelp?>> modulen.
     */
    hide_feedback?: boolean;
  };
}

/**
 * Forside
 *
 *
 */
export interface GpFrontpage extends SanityDocument {
  _type: "gp_frontpage";

  /**
   * Innhold — `string`
   *
   *
   */
  content?: string;
}

/**
 * Situasjoner
 *
 *
 */
export interface GpSituations extends SanityDocument {
  _type: "gp_situations";

  /**
   * Situasjoner — `string`
   *
   *
   */
  title?: string;

  /**
   * Situasjoner med faser — `array`
   *
   *
   */
  situations?: Array<
    SanityKeyed<{
      _type: "situation_list";
      /**
       * Situasjon — `string`
       *
       *
       */
      title?: string;

      /**
       * Faser — `array`
       *
       *
       */
      phases?: Array<SanityKeyed<string>>;
    }>
  >;

  /**
   * Fagfelt — `array`
   *
   *
   */
  fields?: Array<SanityKeyed<string>>;
}

/**
 * Kode med eksempel
 *
 *
 */
export interface DsCodeExample extends SanityDocument {
  _type: "ds_code_example";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Lenke til eksempel — `url`
   *
   * Alle eksempler kan finnes under /examples på nettsiden
   */
  preview?: string;

  /**
   * Hent kode automatisk fra selve eksemplet? — `boolean`
   *
   * Prøver å hente React og HTML kode automatisk fra storybook
   */
  infercode?: boolean;

  /**
   * Setter om koden er autegenerert — `boolean`
   *
   *
   */
  autogenerated?: boolean;

  /**
   * Kode — `array`
   *
   *
   */
  tabs?: Array<SanityKeyed<CodeExampleExample>>;

  /**
   * Lenke til github-kode (optional) — `url`
   *
   *
   */
  github?: string;
}

/**
 * Sandbox for komponent
 *
 *
 */
export interface DsCodeSandbox extends SanityDocument {
  _type: "ds_code_sandbox";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Sier om navnet er autegenerert — `boolean`
   *
   *
   */
  autogenerated?: boolean;
}

/**
 * Changelog
 *
 *
 */
export interface DsChangelog extends SanityDocument {
  _type: "ds_changelog";

  /**
   * Tittel for endring — `string`
   *
   *
   */
  title?: string;

  /**
   * Dato — `date`
   *
   * Endringer sortes basert på datoen gitt her
   */
  change_date?: string;

  /**
   * Pull request (optional) — `url`
   *
   *
   */
  pull_request?: string;

  /**
   * Truffede komponenter — `string`
   *
   * Linker endringen til alle/spesifike komponenter
   */
  dependents?: "all" | "spesific";

  /**
   * Spesifike komponenter — `array`
   *
   *
   */
  spesific_component?: Array<SanityKeyedReference<DsComponentPage>>;

  /**
   * Tekst — `blockContent_simple`
   *
   * Beskrivelse av hva endringen gjorde
   */
  body?: BlockContentSimple;
}

/**
 * Redaktører
 *
 *
 */
export interface Editor extends SanityDocument {
  _type: "editor";

  /**
   * Navn — `string`
   *
   *
   */
  title?: string;

  /**
   * Team — `string`
   *
   *
   */
  team?: string;

  /**
   * Relaterte artikler — `string`
   *
   *
   */
  user_related_articles?: string;
}

/**
 * Navigation
 *
 *
 */
export interface Navigation extends SanityDocument {
  _type: "navigation";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Sidemeny — `array`
   *
   * Linker eller dropdowns med linker. Maks dybde på 2 dropdowns er støttet. Sider må være publisert før de kan linkes her.
   */
  sidemenu?: Array<
    SanityKeyed<NavigationDropdown> | SanityKeyed<NavigationLink>
  >;
}

export type DsNavigationHeading = {
  _type: "ds_navigation_heading";
  /**
   * Heading tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Hovedkategori — `reference`
   *
   *
   */
  category_ref?: SanityReference<MainCategories>;

  /**
   * Side selve headingen linker til — `reference`
   *
   * Husk å legge denne til i menyen også, hvis ikke blir den bare tilgjengelig via headern
   */
  link_ref?: SanityReference<
    DsComponentPage | DsArticlePage | DsTabbedArticlePage
  >;

  /**
   * Meny for denne headingen — `array`
   *
   *
   */
  menu?: Array<
    | SanityKeyed<{
        _type: "item";
        /**
         * Menypunkt tittel — `string`
         *
         *
         */
        title?: string;

        /**
         * Link til side — `reference`
         *
         *
         */
        link?: SanityReference<
          DsComponentPage | DsArticlePage | DsTabbedArticlePage
        >;
      }>
    | SanityKeyed<{
        _type: "subheading";
        /**
         * Subheading — `string`
         *
         *
         */
        title?: string;
      }>
  >;
};

export type DsColor = {
  _type: "ds_color";
  /**
   * Navn — `string`
   *
   *
   */
  title?: string;

  /**
   * CSS variabelnavn — `string`
   *
   *
   */
  full_title?: string;

  /**
   * Fargetype/nivå — `string`
   *
   *
   */
  color_type?: "global" | "semantic";

  /**
   * Brukt fargenavn — `string`
   *
   *
   */
  color_name?: string;

  /**
   * Fargeroller — `array`
   *
   *
   */
  color_roles?: Array<SanityKeyed<string>>;

  /**
   * Brukt farge — `string`
   *
   *
   */
  color_value?: string;

  /**
   * Fargeindeks — `number`
   *
   * Brukes for å endre rekkefølgen på listen. Farger med indeks 0 vil være først, større tall sorteres under der igjen
   */
  color_index?: number;
};

export type CodeSnippet = {
  _type: "code_snippet";
  /**
   * Tittel (for preview internt i sanity) — `string`
   *
   *
   */
  title?: string;

  /**
   * Kode — `code`
   *
   *
   */
  code?: Code;
};

export type CodeExampleRef = {
  _type: "code_example_ref";
  /**
   * Kode eksempel — `reference`
   *
   *
   */
  ref?: SanityReference<DsCodeExample>;
};

export type CodeSandboxRef = {
  _type: "code_sandbox_ref";
  /**
   * Sandbox — `reference`
   *
   *
   */
  ref?: SanityReference<DsCodeSandbox>;
};

export type ColorCategoryRef = {
  _type: "color_category_ref";
  /**
   * Fargekategori — `reference`
   *
   *
   */
  ref?: SanityReference<DsColorCategories>;
};

export type CodeExampleExample = {
  _type: "code_example_example";
  /**
   * Tab tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Kode eksempel — `code`
   *
   *
   */
  example?: Code;
};

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<Spacing>
  | SanityKeyed<Picture>
  | SanityKeyed<PictureText>
  | SanityKeyed<Tips>
  | SanityKeyed<Alert>
  | SanityKeyed<Accordion>
  | SanityKeyed<RelatedPages>
  | SanityKeyed<LinkPanel>
  | SanityKeyed<CodeSnippet>
  | SanityKeyed<DoDont>
  | SanityKeyed<Table>
  | SanityKeyed<CodeSandboxRef>
  | SanityKeyed<CodeExampleRef>
  | SanityKeyed<ColorCategoryRef>
  | SanityKeyed<PropTable>
  | SanityKeyed<IconSearch>
  | SanityKeyed<ComponentOverview>
>;

export type BlockContentSimple = Array<SanityKeyed<SanityBlock>>;

export type BlockContentAccordion = Array<
  SanityKeyed<SanityBlock> | SanityKeyed<Tips> | SanityKeyed<CodeSnippet>
>;

export type GpBlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<Spacing>
  | SanityKeyed<Picture>
  | SanityKeyed<PictureText>
  | SanityKeyed<Accordion>
  | SanityKeyed<Tips>
  | SanityKeyed<Alert>
  | SanityKeyed<CodeSnippet>
  | SanityKeyed<DoDont>
>;

export type PropTable = {
  _type: "prop_table";
  /**
   * children-prop required av type React.ReactNode — `boolean`
   *
   *
   */
  preset_children?: boolean;

  /**
   * className-prop — `boolean`
   *
   *
   */
  preset_classname?: boolean;

  /**
   * Props — `array`
   *
   * Liste med props, tilsvarer en rad i tabellen
   */
  props?: Array<SanityKeyed<PropTableProp>>;

  /**
   * Bruker OverridableComponent — `boolean`
   *
   *
   */
  overridable?: boolean;

  /**
   * Hvor settes ref — `string`
   *
   * Eks: root element
   */
  refplacement?: string;

  /**
   * Hvilken props ekstender komponent-props — `string`
   *
   * Eks: HtmlDivElement, ButtonProps
   */
  extends?: string;
};

export type PropTableProp = {
  _type: "prop_table_prop";
  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Type — `string`
   *
   *
   */
  type?: string;

  /**
   * Beskrivelse (optional) — `string`
   *
   *
   */
  description?: string;

  /**
   * Default (optional) — `string`
   *
   *
   */
  default?: string;

  /**
   * Required — `boolean`
   *
   *
   */
  required?: boolean;
};

export type DoDont = {
  _type: "do_dont";
  /**
   * Tittel (vises bare internt i sanity) — `string`
   *
   *
   */
  title?: string;

  /**
   * Do / donts — `array`
   *
   * Liste med do/donts
   */
  blocks?: Array<SanityKeyed<DoDontBlock>>;
};

export type DoDontBlock = {
  _type: "do_dont_block";
  /**
   * Fullwidth — `boolean`
   *
   * Tar opp ~ 40% eller 100% av tilgjengelig bredde
   */
  fullwidth?: boolean;

  /**
   * Bilde — `image`
   *
   *
   */
  picture?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * alt tekst for bilde — `string`
   *
   *
   */
  alt?: string;

  /**
   * Fritekst — `text`
   *
   * Korte konsise beskrivelser. Bruk fullbredde bilde i dodont med egen tekst for legnre forklaringer
   */
  description?: string;

  /**
   * Variant — `string`
   *
   *
   */
  variant?: "do" | "dont" | "warning";
};

export type UuInteraction = {
  _type: "uu_interaction";
  /**
   * Fokus håndtering (optional) — `blockContent_simple`
   *
   *
   */
  focus?: BlockContentSimple;

  /**
   * Mus håndtering (optional) — `blockContent_simple`
   *
   *
   */
  mouse?: BlockContentSimple;

  /**
   * Keyboard håndtering (optional) — `array`
   *
   * Liste med interaksjoner som rendres i en tabell
   */
  keyboard?: Array<SanityKeyed<UuInteractionKeyboard>>;

  /**
   * Skjermleser (optional) — `blockContent_simple`
   *
   *
   */
  screen_reader?: BlockContentSimple;
};

export type UuInteractionKeyboard = {
  _type: "uu_interaction_keyboard";
  /**
   * Kommando — `blockContent`
   *
   *
   */
  command?: BlockContent;

  /**
   * Beskrivelse — `blockContent`
   *
   *
   */
  description?: BlockContent;
};

export type Picture = {
  _type: "picture";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Alt-tekst — `string`
   *
   * Beskriv bildet for skjermlesere
   */
  title?: string;

  /**
   * Bilde-tekst — `string`
   *
   * Dette vil stå under bildet
   */
  caption?: string;
};

export type PictureText = {
  _type: "picture_text";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Alt-tekst — `string`
   *
   * Beskriv bildet for skjermlesere
   */
  title?: string;

  /**
   * Bilde plassering — `string`
   *
   *
   */
  placement?: "right" | "left";

  /**
   * Innhold — `blockContent_simple`
   *
   *
   */
  body?: BlockContentSimple;
};

export type Alert = {
  _type: "alert";
  /**
   * Variant — `string`
   *
   *
   */
  variant?: "success" | "info" | "warning" | "error";

  /**
   * Størrelse — `string`
   *
   *
   */
  size?: "medium" | "small";

  /**
   * Heading (optional) — `string`
   *
   *
   */
  heading?: string;

  /**
   * Heading nivå — `string`
   *
   *
   */
  heading_level?: "h2" | "h3" | "h4";

  /**
   * Innhold — `blockContent_simple`
   *
   *
   */
  body?: BlockContentSimple;
};

export type Accordion = {
  _type: "accordion";
  /**
   * Accordions — `array`
   *
   *
   */
  list?: Array<
    SanityKeyed<{
      _type: "element";
      /**
       * Heading (optional) — `string`
       *
       *
       */
      heading?: string;

      /**
       * Innhold — `blockContent_accordion`
       *
       *
       */
      body?: BlockContentAccordion;
    }>
  >;
};

export type LinkPanel = {
  _type: "link_panel";
  /**
   * Ekstern side — `boolean`
   *
   *
   */
  external?: boolean;

  /**
   * Lenke til ekstern side — `url`
   *
   *
   */
  external_link?: string;

  /**
   * Lenke til Intern sanity-side — `reference`
   *
   *
   */
  internal_link?: SanityReference<
    DsComponentPage | DsArticlePage | DsTabbedArticlePage | GpArticlePage
  >;

  /**
   * Tittel — `string`
   *
   *
   */
  heading?: string;

  /**
   * Heading nivå — `string`
   *
   *
   */
  heading_level?: "h2" | "h3" | "h4";

  /**
   * Innhold (optional) — `text`
   *
   *
   */
  body?: string;
};

export type NavigationLink = {
  _type: "navigation_link";
  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Link — `reference`
   *
   *
   */
  link_ref?: SanityReference<
    DsComponentPage | DsArticlePage | DsTabbedArticlePage
  >;
};

export type NavigationDropdown = {
  _type: "navigation_dropdown";
  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Meny — `array`
   *
   *
   */
  dropdown?: Array<
    SanityKeyed<NavigationLink> | SanityKeyed<NavigationDropdown>
  >;
};

export type IconSearch = {
  _type: "icon_search";
  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;
};

export type ComponentOverview = {
  _type: "component_overview";
  /**
   * Ref til kodeoversikt — `reference`
   *
   * Legger til en tabell med komponentoversikt. Skal bare brukes for siden Komponenter oversikt
   */
  ref?: SanityReference<DsComponentOverview>;
};

export type Spacing = {
  _type: "spacing";
  /**
   * Spacing-verdi — `string`
   *
   *
   */
  space?: "s-4" | "s-8" | "s-12" | "s-16";
};

export type RelatedPages = {
  _type: "related_pages";
  /**
   * Sider — `array`
   *
   *
   */
  links?: Array<
    SanityKeyed<{
      _type: "link";
      /**
       * Tittel — `string`
       *
       *
       */
      title?: string;

      /**
       * Beskrivelse — `string`
       *
       *
       */
      description?: string;

      /**
       * Intern side i Sanity — `boolean`
       *
       *
       */
      internal?: boolean;

      /**
       * Lenke til Intern sanity-side — `reference`
       *
       *
       */
      internal_link?: SanityReference<
        DsComponentPage | DsArticlePage | DsTabbedArticlePage | GpArticlePage
      >;

      /**
       * Lenke til ekstern side — `url`
       *
       *
       */
      external_link?: string;

      /**
       * Tagging — `string`
       *
       * Velg hvordan kortet skal tagges
       */
      tags?: "default" | "main_categories";

      /**
       * Kategori — `reference`
       *
       *
       */
      category_ref?: SanityReference<MainCategories>;
    }>
  >;
};

export type Table = {
  _type: "table";
  /**
   * Tabell tittel (Brukes bare internt i sanity) — `string`
   *
   *
   */
  title?: string;

  /**
   * Tabell headers — `string`
   *
   * Definerer hva som regnes som tabell-headers for semantisk visning
   */
  header_direction?: "row" | "column";

  /**
   * Rader — `array`
   *
   *
   */
  rows?: Array<SanityKeyed<Row>>;
};

export type Cell = {
  _type: "cell";
  /**
   * Innhold — `blockContent_simple`
   *
   *
   */
  body?: BlockContentSimple;

  /**
   * Plassering av innhold — `string`
   *
   * Ved ingen valgt er venstre standard
   */
  alignment?: "left" | "center" | "right";
};

export type Row = {
  _type: "row";
  /**
   * cells — `array`
   *
   *
   */
  cells?: Array<SanityKeyed<Cell>>;
};

export type Tips = {
  _type: "tips";
  /**
   * Innhold — `blockContent_simple`
   *
   *
   */
  body?: BlockContentSimple;
};

export type Documents =
  | VkFrontpage
  | MainCategories
  | DsComponentPage
  | DsArticlePage
  | DsTabbedArticlePage
  | DsFrontpage
  | DsNavigation
  | DsPackage
  | DsComponentOverview
  | DsColorCategories
  | GpArticlePage
  | GpFrontpage
  | GpSituations
  | DsCodeExample
  | DsCodeSandbox
  | DsChangelog
  | Editor
  | Navigation;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Code = any;