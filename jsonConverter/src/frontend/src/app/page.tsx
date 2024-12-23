"use client"

import { Github } from "lucide-react";
import React, {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios";

// export const metadata: Metadata = {
//     title : "Home",
// };


export default function Home({ code }) {
    const params = useSearchParams();
    const githubCode = params.get("code");
    const router = useRouter();

    if(githubCode != null){
        axios
            .post("controller url", {
                code : githubCode
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log("response Info:", response); // 사용자 정보 출력

                    // 사용자 정보가 정상적으로 조회되었으면 step1으로 이동
                    router.push("/converter/step1");
                }
            })
            .catch((error) => {
                // 토큰이 유효하지 않거나 다른 오류 처리
                console.error("Error fetching user data:", error);
                alert("Failed to fetch user data. Please try again.");
            });
    }

    const redirectToGitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=Ov23liYD7eo0bvhsMMk6&redirect_uri=http://localhost:3000/';
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8 transform transition-transform hover:scale-[1.02]">
                <div className="flex flex-col items-center">
                    <Github className="w-16 h-16 mb-6 text-white" />

                    <h1 className="text-2xl font-semibold text-white mb-8">
                        Json Converter
                    </h1>

                    <button
                        className="w-full bg-gray-700 text-white rounded-md py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        onClick={redirectToGitHub}
                    >
                        <Github className="w-5 h-5" />
                        <p className="font-medium">GitHub Login</p>
                    </button>
                </div>
            </div>
        </main>
    );
}