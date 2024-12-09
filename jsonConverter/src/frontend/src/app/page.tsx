"use client";

import { Github } from "lucide-react";
import React from "react";
import Link from "next/link";
export default function Home() {
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
                    >
                        <Github className="w-5 h-5" />
                        <Link href="converter/step1" className="font-medium">GitHub Login</Link>
                    </button>
                </div>
            </div>
        </main>
    );
}