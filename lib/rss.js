import fs from "fs";
const packageJson = require("../package.json");

const baseUrl = "https://mihailgaberov.com";

const generateRssItem = (post) => `
    <item>
      <guid>${baseUrl}/posts/${post.id}</guid>
      <title>${post.properties.Name.title[0].text.content}</title>
      <link>${post.url}</link>
      <tags>${post.properties.Tags.multi_select
        .map((t) => t.name)
        .join(", ")}</tags>
      <lastUpdatedDate>${new Date(
        post.last_edited_time
      ).toUTCString()}</lastUpdatedDate>
    </item>`;

const generateRssChannel = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${packageJson.author}</title>
    <link>${baseUrl}</link>
    <description>Learning by sharing.</description>
    <language>en</language>
    <version>${packageJson.version}</version>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(generateRssItem).join("")}
  </channel>
</rss>`;

const generateRss = (allPostsData) => {
  const rss = generateRssChannel(allPostsData);

  fs.writeFileSync("public/rss.xml", rss);
};

export default generateRss;
