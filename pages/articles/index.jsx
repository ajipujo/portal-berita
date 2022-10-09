import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Head from "next/head";

export default function Index() {
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
          <Link href="/articles/create">
            <div className="border py-2 px-3 rounded hover:bg-white hover:text-black cursor-pointer text-sm">
              Tulis Artikel
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
