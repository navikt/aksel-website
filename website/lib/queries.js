export const allDocuments = `*[]{...,'slug': slug.current }`;

export const changelogQuery = `*[_type == "ds_changelog"]`;

export const gpDocuments = `*[_type in ["gp_article_page"]]{ _type, 'slug': slug.current }`;

export const gpDocumentBySlug = `*[slug.current == $slug][0]
{
  ...,
  "slug": slug.current,

  _type == "link_panel"=>{
    ...,
    internal_link-> {_id, slug}
   }
}`;

export const dsDocuments = `*[_type in ["ds_component_page", "ds_article_page", "ds_tabbed_article_page"]]{ _type, 'slug': slug.current }`;

const deRefs = `
_type == "code_example_ref" =>{
  "ref": @.ref->
},
_type == "link_panel" =>{
  ...,
  internal_link-> {_id, slug}
},
markDefs[]{
  ...,
  _type == 'internalLink' => {
      "slug": @.reference->slug,
  },
},
`;

export const dsDocumentBySlug = `*[slug.current == $slug][0]
{
  ...,
  "slug": slug.current,
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
