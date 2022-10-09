import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Head from "next/head";
import { GrReactjs } from "react-icons/gr";
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";
import draftToHtml from "draftjs-to-html";

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Index() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formState, setFormState] = useState({
    title: "",
    author: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    let data = {
      id: uuidv4(),
      author: formState.author,
      title: formState.title,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };

    let res = await fetch(
      "https://my-json-server.typicode.com/ajipujo/portal-berita/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log(res);
  }

  return (
    <>
      <Head>
        <title>Coretan Mahasiswa</title>
      </Head>
      <div className="w-11/12 md:w-1/3 mx-auto px-3">
        <div className="w-full flex justify-between items-center my-3">
          <div className="w-auto space-x-3 flex items-center">
            <Link href="/articles">
              <AiOutlineArrowLeft className="cursor-pointer" />
            </Link>
            <span className="text-xl font-bold">Tulis Artikel</span>
          </div>
          <GrReactjs className="text-xl" />
        </div>
        <hr className="text-white mb-3" />
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <div className="w-full mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Author..."
                onChange={handleChange}
                value={formState.author}
                className="text-sm rounded-lg block w-full p-2.5 bg-black border placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-full mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title..."
                onChange={handleChange}
                value={formState.title}
                className="text-sm rounded-lg block w-full p-2.5 bg-black border placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="w-full mb-6">
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="border rounded w-full bg-black border placeholder-gray-400 text-white px-2.5"
                onEditorStateChange={setEditorState}
              />
            </div>
            <div className="w-full mb-6">
              <button
                type="submit"
                className="px-3 py-2 border rounded w-full bg-white text-black hover:bg-gray-200 hover:text-black"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
