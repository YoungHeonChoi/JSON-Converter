"use client";

import Image from "next/image";
import { useState } from 'react';

export default function Home() {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    let chkType = e.target.files[0].type;

    if(chkType === "application/json"){
      setFile(e.target.files[0]);
    }else{
      window.alert("json파일만 업로드 할 수 있습니다.");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      console.log("업로드된 파일", file);
    } else {
      alert("json파일을 업로드 해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
        headers: {

        },
      } as RequestInit);

      if (response.ok) {
        alert("업로드 성공");
      } else {
        alert("업로드 실패");
      }
    } catch (error) {
      console.error("업로드 에러", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold underline">
          Json Converter
        </h1>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            {" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              .json
            </code>
            파일을 업로드하세요
          </li>
          <li>
            {" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              README.md
            </code>
            로 추출하거나
            {" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              Git Repository
            </code>
            에
            {" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              Push
            </code>
            하세요.
          </li>
        </ol>

        <form
            onSubmit={handleSubmit}
            className="flex gap-4 items-center flex-col sm:flex-row p-2 border-2 border-dashed border-gray-300 rounded-lg"
        >
          <label className="cursor-pointer">
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".json"
            />
            <div className="flex flex-col items-center justify-center h-16 w-64 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center text-gray-500 hover:bg-[#383838] dark:hover:bg-[#ccc]">
              {file ? (
                  <span className="font-semibold text-gray-700">{file.name}</span>
              ) : (
                  <>
                    <span className="font-semibold text-background">Click to upload a json file</span>
                    <span className="text-xs mt-1 text-background">or drag and drop</span>
                  </>
              )}
            </div>
          </label>
        </form>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
            rel="noopener noreferrer"
            onClick={handleSubmit}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Export README.md
          </a>
          <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
            />
            Git Repository Push
          </a>
        </div>

      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/YoungHeonChoi/JSON-Converter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Okerry Github →
        </a>
      </footer>

    </div>
  );
}
