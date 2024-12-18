"use client"

import { Github } from "lucide-react";
import React, {useEffect} from "react";
import Cookie from 'js-cookie';
import axios from 'axios';
import {Metadata} from "next";
import { useRouter } from 'next/router';
import {useSearchParams} from "next/navigation";

// export const metadata: Metadata = {
//     title : "Home",
// };

export default function Home() {
    const searchParams = useSearchParams()
    const code = searchParams.get('code') // 쿼리 문자열에서 'code' 값 가져오기

    useEffect(() => {
        if(!code){
            return;
        }

        const tokenChk = async () => {
            try {
                alert("success");
                // const response = await fetch('http://localhost:8080/api/your-endpoint', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // });
                //
                // if (!response.ok) {
                //     throw new Error('Failed to fetch data');
                // }
                //
                // const data = await response.json();
                // console.log('Data from Spring Boot:', data);
            } catch (error) {
                // console.error('Error fetching data:', error);
            }
        };

        tokenChk();
    }, []);

    const redirectToGitHub = () => {
        const clientId = '';
        const redirectUri = '';
        const githubAuthUrl = ``;

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