import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getPosts() {
    setIsLoading(true);
    let res = await fetch(
      "https://my-json-server.typicode.com/ajipujo/portal-berita/posts"
    );

    let responseData = await res.json();

    setPosts(responseData);
    setIsLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Coretan Mahasiswa</title>
      </Head>
      <div className="w-11/12 md:w-1/3 mx-auto px-3">
        <div className="w-full flex justify-between items-center my-3">
          <div className="w-auto space-x-3 flex items-center">
            <Link href="/">
              <AiOutlineArrowLeft className="cursor-pointer" />
            </Link>
            <span className="text-xl font-bold">Coretan Mahasiswa</span>
          </div>
          {/* <Link href="/articles/create">
            <div className="border py-2 px-3 rounded hover:bg-white hover:text-black cursor-pointer text-sm">
              Tulis Artikel
            </div>
          </Link> */}
        </div>
        {isLoading ? (
          <div className="w-full py-5 flex justify-center">Loading...</div>
        ) : (
          <div className="w-full flex flex-wrap">
            {posts.map((post) => {
              return (
                <div className="w-full py-2" key={post.id}>
                  <div className="card border rounded">
                    <div className="w-full mb-2">
                      <span className="font-bold text-xl">{post.title}</span>
                    </div>
                    <div className="w-full mb-4">
                      <p className="text-md line-clamp-3">{post.content}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between w-full mt-2">
                      <div className="text-sm">
                        Created By{" "}
                        <span className="font-bold">{post.author}</span>
                      </div>
                      <Link href={`/articles/${post.id}`}>
                        <div className="flex items-center cursor-pointer">
                          <span className="mr-2">Read More</span>
                          <AiOutlineArrowRight />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
