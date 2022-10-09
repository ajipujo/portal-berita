import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Head from "next/head";
import { GrReactjs } from "react-icons/gr";
import { useState } from "react";
import { EditorState } from "draft-js";

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Index() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full mb-6">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="border rounded w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white px-2.5"
              onEditorStateChange={setEditorState}
            />
          </div>
          <div className="w-full mb-6">
            <button
              type="submit"
              className="px-3 py-2 border rounded w-full hover:bg-white hover:text-black"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
