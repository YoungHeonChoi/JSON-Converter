import React from "react";

export default function Header ({ login }){
    return (
        <header className="w-full p-3 sm:p-4 bg-[#0d1117] border-b border-[#30363d]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-base sm:text-lg text-[#c9d1d9] font-medium">
                    {login ? `${login}님 환영합니다` : "로그인 중..."}  {/* 로그인 값이 있으면 표시 */}
                </h1>
            </div>
        </header>
    );
}