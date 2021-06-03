import client from "../../client";
import { useRouter } from "next/router";
import groq from "groq";

const Post = (props) => {
  const { title = "Missing title", categories } = props;
  return (
    <article>
      <h1>{title}</h1>
      <ul>
        Posted in
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </article>
  );
};

const query = groq`*[_type == "article" && slug.current == $slug][0]{
  title,
  "categories": category[]->title
}`;

Post.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.query;
  return await client.fetch(query, { slug });
};

export default Post;
