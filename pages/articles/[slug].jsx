import Head from "next/head";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GrReactjs } from "react-icons/gr";

export default function Detail({ article }) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <div className="w-11/12 md:w-1/3 mx-auto px-3">
        <div className="w-full flex justify-between items-center my-5">
          <div className="w-auto space-x-3 flex items-center">
            <Link href="/articles">
              <AiOutlineArrowLeft className="cursor-pointer" />
            </Link>
            <span className="text-xl font-bold">Back</span>
          </div>
          <GrReactjs className="text-xl" />
        </div>
        <div className="w-full mb-5">
          <div className="w-full font-bold text-xl mb-3">{article.title}</div>
          <div className="w-full">
            <p>{article.content}</p>
          </div>
        </div>
        <hr />
        <div className="w-full mt-3">
          <div className="text-sm">
            Created by <span className="font-bold">{article.author}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  let res = await fetch(
    `https://my-json-server.typicode.com/ajipujo/portal-berita/posts/${slug}`
  );

  let post = await res.json();
  return {
    props: {
      article: post,
    },
  };
}

export async function getStaticPaths() {
  let res = await fetch(
    "https://my-json-server.typicode.com/ajipujo/portal-berita/posts"
  );

  let posts = await res.json();
  let paths = posts.map((post) => ({ params: { slug: String(post.id) } }));

  return {
    paths: paths,
    fallback: false,
  };
}
