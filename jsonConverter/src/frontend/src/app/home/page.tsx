"use client";

import Image from "next/image";
import { useState } from 'react';
import Logo from "../component/logo";
import Explanation from "../component/explanation";
import Form from "../component/form";

export default function page() {
    return (
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="flex flex-col sm:flex-row justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                        Export README.md
                    </button>
                    <button
                        type="reset"
                        className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                        Git Repository Push
                    </button>
                </div>
            </main>
    );
}
