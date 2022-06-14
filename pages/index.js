import Link from "next/link";
import slugify from "slugify";

import { Layout } from "../components/Layout";
import { getDatabase } from "../lib/notion";
import styles from "./index.module.scss";
import { Text } from "./[slug].js";
import generateRss from "../lib/rss";
import { useState } from "react";
import { useEffect } from "react";

export const databaseId = process.env.NOTION_DATABASE_ID;

const sortedPosts = (posts) => {
  return posts.sort((a, b) => {
    return (
      new Date(b.properties?.date?.date?.start) -
      new Date(a.properties?.date?.date?.start)
    );
  });
};
export default function Home({ posts }) {
  const [fetchedPosts, setFetchedPosts] = useState(posts);

  useEffect(() => {
    setFetchedPosts(sortedPosts(posts));
  }, []);

  return (
    <Layout>
      <ol className={styles.posts}>
        {fetchedPosts.map((post) => {
          const lastEditedDate = new Date(post.last_edited_time).toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          );

          const date = new Date(
            post.properties?.date?.date?.start
          ).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          });

          const title = post.properties.Name.title[0]?.plain_text;

          return (
            <li
              key={post.id}
              className={styles.post + " " + styles.animatedBorder}
            >
              <h3 className={styles.postTitle}>
                <Link href={`/${slugify(title || "").toLowerCase()}`}>
                  <a data-cy="postTitle">
                    <Text text={post.properties.Name.title} postId={post.id} />
                  </a>
                </Link>
              </h3>

              <p className={styles.postDescription}>
                {date} (last updated: {lastEditedDate})
              </p>
              <Link href={`/${slugify(title || "").toLowerCase()}`}>
                <a data-cy="readPostLink">Read post →</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  generateRss(sortedPosts(database));

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
