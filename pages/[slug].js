import { Fragment, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import slugify from "slugify";

import { getBlocks, getDatabase } from "../lib/notion";
import { databaseId } from "./index.js";
import styles from "./post.module.css";
import { Layout } from "../components/Layout";

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, idx) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    return (
      <span
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={idx}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderBlock = (block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <p>
          <Text text={value.text} />
        </p>
      );
    case "heading_1":
      return (
        <h1>
          <Text text={value.text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text text={value.text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text text={value.text} />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.text} />
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <blockquote className={styles.quote} key={id}>
          {value.text[0].plain_text}
        </blockquote>
      );
    case "code":
      return value.text?.map((t, idx) => {
        if (!t.plain_text) return "";

        return (
          <pre key={idx} className={styles.pre}>
            <code className={`language-${block.code.language}`} key={idx}>
              {t.plain_text}
            </code>
          </pre>
        );
      });
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "callout":
      const fullText = value.text?.map((t) => {
        if (!t.plain_text) return "";
        return t.plain_text;
      });
      return (
        <h1 key={"callout" + id} className={styles.callout}>
          {value.icon.emoji}
          {fullText}
        </h1>
      );
    case "bookmark":
      return (
        <div className={styles.bookmark}>
          <a href={value.url}>{value.caption[0].plain_text}</a>
        </div>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return "";
  }

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const lastEditedDate = new Date(page.last_edited_time).toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
  );

  return (
    <Layout>
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article className={styles.container}>
        <h1 className={styles.name}>
          <Text text={page.properties.Name.title} />
        </h1>
        <p className={styles.figcaption}>Last updated: <strong>{lastEditedDate}</strong></p>
        <section>
          {blocks.map((block, idx) => {
            return (
              <Fragment key={block.id + idx}>{renderBlock(block)}</Fragment>
            );
          })}
          <Link href="/">
            <a className={styles.back}>← Go home</a>
          </Link>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);

  return {
    paths: database.map((page) => {
      return {
        params: {
          slug: slugify(page.properties.Name.title[0].plain_text).toLowerCase(),
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;

  const pages = await getDatabase(databaseId);

  const page = pages.find((page) => {
    const title = page.properties.Name.title[0].plain_text;
    const resultSlug = slugify(title).toLowerCase();
    return resultSlug === slug;
  });
  const blocks = await getBlocks(page.id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
