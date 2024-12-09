"use client"

import React from "react";
import { usePageNavigation } from "@/hooks/usePageNavigation"

export default function Step2() {
    const { navigateTo } = usePageNavigation();

    return (
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-full sm:max-w-2xl text-center mb-8">
                <h2 className="text-xl sm:text-2xl text-[#c9d1d9] font-medium mb-2">
                    변환이 완료되었습니다
                </h2>
            </div>

            <div className="w-full max-w-full sm:max-w-2xl flex flex-col sm:flex-row gap-4">
                <button
                    className="w-full px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white
                font-medium rounded-md transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2
                focus:ring-offset-[#0d1117]"
                >
                    깃허브 푸시하기
                </button>
                <button
                    onClick={() => navigateTo('/converter/step1')}
                    className="w-full px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9]
                font-medium rounded-md transition-colors duration-200 border border-[#30363d]
                focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2
                focus:ring-offset-[#0d1117]"
                >
                    돌아가기
                </button>
            </div>
        </main>
    );
}



