"use client";

import React, {useState} from "react";
import Step1 from "@/app/converter/step/step1/page";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [userLogin, setUserLogin] = useState("");  // userLogin 상태를 추가

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
        <Header login={userLogin} />
            <Step1 setUserLogin={setUserLogin} />  {/* Step1에 setUserLogin 함수 전달 */}
        <Footer />
    </div>
  );
}
