const markDef = `
markDefs[]{
  ...,
  _type == 'internalLink' => {
      "slug": @.reference->slug,
  },
}`;

const relatedCards = `_type == "related_pages" =>{
  links[]{
    ...,
    "internal_link": internal_link->slug.current,
    category_ref->{...}
  }
}`;

const linkPanel = `_type == "link_panel" =>{
  ...,
  internal_link-> {_id, slug}
}`;

const alert = `_type == "alert" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const tips = `_type == "tips" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const uniqueModules = `_type == "code_example_ref" =>{
  "ref": @.ref->
},
_type == "code_sandbox_ref" =>{
  ...@.ref->
}`;

const pictureWText = `_type == "picture_text" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const doDont = `_type == "do_dont" =>{
  ...,
  blocks[]{
    ...,
    body[]{
      ...,
      ${markDef}
    },
  }
}`;

const introSeksjon = `_type == "intro_komponent" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
}`;

const relatertInnhold = `_type == "relatert_innhold" =>{
  lenker[]{
    ...,
    "intern_lenke": intern_lenke->slug.current,
  }
}`;

const anatomiSeksjon = `_type == "anatomi" =>{
  ...,
  intro[]{
    ...,
    ${markDef}
  }
}`;

const liveSeksjon = `_type == "live_demo" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  },
  "sandbox_ref": sandbox_ref->{...},
  "code_ref": code_ref->{...},
}`;

const uuSeksjon = `_type == "uu_seksjon" =>{
  ...,
  interaksjon_skjermleser[]{
    ...,
    ${markDef}
  },
  interaksjon_mus[]{
    ...,
    ${markDef}
  },
  interaksjon_touch[]{
    ...,
    ${markDef}
  },
  interaksjon_tastatur[]{
    ...,
    ${markDef}
  },
}`;

const doDontV2 = `_type == "do_dont_v2" =>{
  ...,
  forklaring[]{
    ...,
    ${markDef}
  }
}`;

const installSeksjon = `_type == "installasjon_seksjon" =>{
  ...,
  "code_ref": code_ref->{...},
}`;

const defaultBlock = `
 _type == "riktekst_blokk" =>{
    ...,
    body[]{
      ...,
      ${markDef}
    }
 },
 _type == "bilde" =>{
    ...,
    floating_text[]{
      ...,
      ${markDef}
    }
 },
 _type == "alert_v2" =>{
    ...,
    body[]{
      ...,
      ${markDef}
    }
 },
 _type == "kode" =>{
    ...,
    "ref": ref->{...},
 },
 _type == "kode_ref" => @->,
 ${tips},
 ${relatertInnhold},
 ${doDontV2}
`;

const accordionBlock = `
  _type == "accordion_v2"=>{
    ...,
    list[]{
      ...,
      innhold[]{
        ...,
        ${defaultBlock}
      }
    }
  }
`;

const genericBlock = `
  ${defaultBlock},
  ${accordionBlock}
`;

const spesialSeksjon = `_type == "spesial_seksjon" =>{
  ...,
  modul == "endringslogg" =>{
    "logs": *[_type == 'ds_changelog' && !(_id in path("drafts.**"))]{
      ...,
      packages[]{
        ...,
        "pack": @.pack->{...}
      },
      body[]{
        ...,
        ${markDef}
      },
    }
  },
  modul == "komponentoversikt" =>{
    "oversikt": *[_id == 'ds_component_overview_id' && !(_id in path("drafts.**"))][0]{
      ...,
      components[]{
        ...,
        linked_package->{...},
        "doc_link": doc_link->slug.current
      }
    }
  },
  modul == "farge_kategori" =>{
      "farge": farge_ref->{..., description[]{
        ...,
        ${markDef}
      }
    }
  }
}`;

const generiskSeksjon = `_type == "generisk_seksjon" =>{
  ...,
  brikker[]{
    ...,
    ${genericBlock},
    ${spesialSeksjon}
  },
}`;

const deRefs = `
${relatedCards},
${linkPanel},
${alert},
${tips},
${uniqueModules},
${pictureWText},
${doDont},
${markDef},
${introSeksjon},
${relatertInnhold},
${anatomiSeksjon},
${liveSeksjon},
${uuSeksjon},
${generiskSeksjon},
${installSeksjon},
${spesialSeksjon},
${defaultBlock}
`;

export const allDocuments = `*[]{...,'slug': slug.current }`;

export const vkFrontpageQuery = `*[_id == "frontpage_vk_praksis"]
{
 ...,
  cards[]{
    _type == "card" =>{
      ...,
      category_ref->{...}
    }
  }
}`;

export const akselArtikkelDocuments = `*[_type in ["aksel_artikkel"]]{ _type, _id, 'slug': slug.current }`;

export const akselDocumentBySlug = `*[slug.current == $slug]
{
  ...,
  "slug": slug.current,
  innhold[]{
    ...,
    ${deRefs}
  }
}`;

export const dsDocuments = `*[_type in ["ds_component_page", "komponent_artikkel", "ds_artikkel"]]{ ..., 'slug': slug.current }`;

const dsNavQuery = `"nav": *[_type == 'ds_navigation'][0] {
  "headings": headings[]{
    ...,
    link_ref->{_id, slug},
    category_ref->{...},
    menu[]{
      ...,
      link->{_id, slug, tags},
    }
  }
}`;

export const dsFrontpageQuery = `{
  "page": *[_id == "frontpage_designsystem"]
  {
   ...,
    body[]{
      ...,
      ${deRefs}
    },
    cards[]{
      _type == "card" =>{
        ...,
        link_ref->{_id, "slug": slug.current}
      }
    }
  },
  ${dsNavQuery}
}`;

export const dsSlugQuery = `{
  "page": *[_type in ["ds_component_page", "komponent_artikkel", "ds_artikkel"] && slug.current == $slug]
    {
      ...,
      "slug": slug.current,
      linked_package {
        "title": @->title,
        "github_link": @->github_link,
        "status": @->status
      },
      content_bruk[]{
        ...,
        ${deRefs}
      },
      content_kode[]{
        ...,
        ${deRefs}
      },
      usage[]{
        ...,
        ${deRefs}
      },
      design[]{
          ...,
          ${deRefs}
      },
      development[]{
          ...,
          ${deRefs}
      },
      accessibility[]{
        ...,
        ${deRefs}
      },
      innhold[]{
        ...,
        ${deRefs}
      },
      innhold_tabs[]{
        ...,
        innhold[]{
          ...,
          ${deRefs}
        }
      },
  },
  ${dsNavQuery}
}`;

export const dsDocumentBySlug = `*[_type in ["ds_component_page", "komponent_artikkel", "ds_artikkel"] && slug.current == $slug]
{
  ...,
  "slug": slug.current,
  linked_package {
    "title": @->title,
    "github_link": @->github_link,
    "status": @->status
  },
  content_bruk[]{
    ...,
    ${deRefs}
  },
  content_kode[]{
    ...,
    ${deRefs}
  },
	usage[]{
    ...,
    ${deRefs}
  },
  design[]{
      ...,
      ${deRefs}
  },
  development[]{
      ...,
      ${deRefs}
  },
  accessibility[]{
    ...,
    ${deRefs}
  },
  innhold[]{
    ...,
    ${deRefs}
  },
  innhold_tabs[]{
    ...,
    innhold[]{
      ...,
      ${deRefs}
    }
  },
}`;

export const dsNavigationQuery = `
*[_type == 'ds_navigation'][0] {
  "headings": headings[]{
    ...,
    link_ref->{_id, slug},
    category_ref->{...},
    menu[]{
      ...,
      link->{_id, slug, tags},
    }
  }
}
`;

export const akselTemaNames = `*[_type == "aksel_tema" && count(*[references(^._id)]) > 0].title`;

export const akselTemaDocs = `*[_type == "aksel_tema" && count(*[references(^._id)]) > 0]{
  ...,
  "artikler": *[_type=='aksel_artikkel' && references(^._id)]{
    _id,
    heading,
    "slug": slug.current,
    "tema": tema[]->tag
  }
}`;

export const akselTema = `*[_type == "aksel_tema" && count(*[references(^._id)]) > 0]`;
