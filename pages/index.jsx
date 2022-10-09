import Head from "next/head";
import Link from "next/link";
import {AiOutlineArrowRight} from "react-icons/ai";

export default function Index() {
  return (
    <>
      <Head>
        <title>Aji - Next Project </title>
      </Head>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-5/6 sm:w-1/3">
            <div className="w-full flex justify-center mb-5">
                <span className="font-bold py-3">WELCOME</span>
            </div>
            <div className="w-full mb-5">
                <Link href="/news">
                    <div className="card border border-white-500 cursor-pointer flex justify-between items-center">
                        <span>Portal Berita</span>
                        <AiOutlineArrowRight />
                    </div>
                </Link>
            </div>
            <div className="w-full mb-10">
                <Link href="/articles">
                    <div className="card border border-white-500 cursor-pointer flex justify-between items-center">
                        <span>Coretan Mahasiswa</span>
                        <AiOutlineArrowRight />
                    </div>
                </Link>
            </div>
            <div className="w-full flex justify-center mt-5">
                <span className="font-bold text-sm">Copyright &#169; 2022 Aji Pujo</span>
            </div>
        </div>
      </div>
    </>
  );
}
