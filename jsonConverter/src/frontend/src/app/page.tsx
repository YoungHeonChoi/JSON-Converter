"use client"

import { Github } from "lucide-react";
import React from "react";
import {Metadata} from "next";

// export const metadata: Metadata = {
//     title : "Home",
// };

export default function Home() {
    const redirectToGitHub = () => {
        const clientId = '';
        const redirectUri = '';
        const githubAuthUrl = ``;

        window.location.href = '';
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