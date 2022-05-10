export default function preview(req, res) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: encodeURI(req?.query?.slug ? `/${req?.query?.slug}` : `/`),
  });

  return res.end();
}
