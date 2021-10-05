export const allDocuments = `*[]{...,'slug': slug.current }`;

export const changelogQuery = `*[_type == "ds_changelog"]`;

export const gpDocuments = `*[_type in ["gp_article_page"]]{ _type, 'slug': slug.current }`;

export const gpDocumentBySlug = `*[slug.current match $slug][0]
{
  ...,
  "slug": slug.current,
}`;

export const dsDocuments = `*[_type in ["ds_component_page", "ds_article_page", "ds_tabbed_article_page"]]{ _type, 'slug': slug.current }`;

export const dsDocumentBySlug = `*[slug.current match $slug][0]
{
  ...,
  "slug": slug.current,
	usage[]{
    ...,
    _type == "code_example_ref" =>{
    	"ref": @.ref->
  	}
  },
  design[]{
      ...,
      _type == "code_example_ref" =>{
        "ref": @.ref->
      }
  },
  development[]{
      ...,
      _type == "code_example_ref" =>{
        "ref": @.ref->
      }
  },
  accessibility[]{
      ...,
      _type == "code_example_ref" =>{
        "ref": @.ref->
      }
  },
}`;

export const sidebarQuery = (doc) => `
*[_id == '${doc}'][0] {
  "sidebar": sidemenu[]{
   ...,
   link_ref->{_id, slug},
    dropdown[]{
      ...,
       link_ref->{_id, slug},
      dropdown[]{
        ...,
        link_ref->{_id, slug},
      }
    }
  }
 }
`;
