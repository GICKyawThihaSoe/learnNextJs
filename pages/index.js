import Head from "next/head";
import Layout, { siteTitle } from "./components/Layout";
import utilStyles from "../styles/utils.module.css";
import useSWR from "swr";

async function fetcher(url) {
  const response = await fetch(url);
  return response.json();
}

export default function Home() {
  const { data, error } = useSWR("http://localhost:8080/blogs/blog", fetcher);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section>
        <h2>Latest Blog Posts</h2>
        {error && <div>Error loading data...</div>}
        {data && (
          <ul>
            {data.map((post) => (
              <li key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>Author: {post.authorId}</p>
                <p>Published: {new Date(post.time).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
