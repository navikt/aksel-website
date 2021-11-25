const markDef = `
markDefs[]{
  ...,
  _type == 'internalLink' => {
      "slug": @.reference->slug,
  },
},`;

const deRefs = `
_type == "related_pages" =>{
  links[]{
    ...,
    "internal_link": internal_link->slug.current
  }
},
_type == "component_overview" =>{
  ...@.ref->{
    ...,
    components[]{
      ...,
      linked_package->{...},
      "doc_link": doc_link->slug.current
    }
  }
},
_type == "code_example_ref" =>{
  "ref": @.ref->
},
_type == "link_panel" =>{
  ...,
  internal_link-> {_id, slug}
},
_type == "alert" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
},
_type == "picture_text" =>{
  ...,
  body[]{
    ...,
    ${markDef}
  }
},
_type == "do_dont" =>{
  ...,
  blocks[]{
    ...,
    body[]{
      ...,
      ${markDef}
    },
  }
},
_type == "uu_interaction" =>{
  ...,
  focus[]{
    ...,
    ${markDef}
  },
  mouse[]{
    ...,
    ${markDef}
  },
  screen_reader[]{
    ...,
    ${markDef}
  }
},
${markDef}
`;

export const allDocuments = `*[]{...,'slug': slug.current }`;

export const changelogQuery = `*[_type == "ds_changelog"]{
  ...,
  body[]{
    ...,
    ${deRefs}
  }
}`;

export const gpDocuments = `*[_type in ["gp_article_page"]]{ _type, 'slug': slug.current }`;

export const gpDocumentBySlug = `*[slug.current == $slug][0]
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

export const dsDocuments = `*[_type in ["ds_component_page", "ds_article_page", "ds_tabbed_article_page"]]{ _type, 'slug': slug.current, tabs[]{title} }`;
export const isDraftQuery = `*[slug.current == $slug && !(_id in path("drafts.**"))]`;

export const dsDocumentBySlug = `*[slug.current == $slug][0]
{
  ...,
  "slug": slug.current,
  linked_packages[]{
    "title": @->title
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
    menu[]{
      ...,
      link->{_id, slug, tags},
    }
  }
}
`;
