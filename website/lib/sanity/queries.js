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

const accordion = `_type == "accordion" =>{
  ...,
  list[]{
    ...,
    body[]{
      ...,
      ${markDef},
      ${relatedCards},
      ${linkPanel},
      ${alert},
      ${tips},
    },
  }
}`;

const componentOverview = `_type == "component_overview" =>{
  ...@.ref->{
    ...,
    components[]{
      ...,
      linked_package->{...},
      "doc_link": doc_link->slug.current
    }
  }
}`;

const uniqueModules = `_type == "code_example_ref" =>{
  "ref": @.ref->
},
_type == "code_sandbox_ref" =>{
  ...@.ref->
},
_type == "color_category_ref" => {
  "ref": @.ref->{..., description[]{
    ...,
    ${markDef}
  }}
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

const changelogs = `_type == "changelogs_ref" =>{
  ...,
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

const deRefs = `
${relatedCards},
${linkPanel},
${alert},
${tips},
${accordion},
${componentOverview},
${uniqueModules},
${pictureWText},
${doDont},
${changelogs},
${markDef},
${introSeksjon},
${relatertInnhold},
${anatomiSeksjon},
${liveSeksjon},
${uuSeksjon}
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

export const gpDocuments = `*[_type in ["gp_article_page"]]{ _type, 'slug': slug.current }`;

export const gpDocumentBySlug = `*[slug.current == $slug]
{
  ...,
  "slug": slug.current,
  ingress[]{
    ...,
    ${deRefs}
  },
  body[]{
    ...,
    ${deRefs}
  }
}`;

export const dsDocuments = `*[_type in ["ds_component_page", "ds_article_page", "komponent_artikkel"]]{ _type, 'slug': slug.current, article_type, tabs, design, development, accessibility }`;

export const dsFrontpageQuery = `*[_id == "frontpage_designsystem"]
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
}`;

export const dsDocumentBySlug = `*[slug.current == $slug]
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
  ingress[]{
    ...,
    ${deRefs}
  },
	body[]{
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
  tabs[]{
    ...,
    body[]{
      ...,
      ${deRefs}
    }
  }
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
