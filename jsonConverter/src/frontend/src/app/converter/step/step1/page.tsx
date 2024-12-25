"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePageNavigation } from "@/hooks/usePageNavigation";
import axios from "axios";
import Cookie from 'js-cookie';

export default function Step1({ setUserLogin }) {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [login, setLogin] = useState("");  // 로그인 정보를 저장할 상태 추가
    const { navigateTo } = usePageNavigation();

    // useEffect(() => {
    //     const accessToken = Cookie.get('accessToken');
    //     axios
    //         .post("http://localhost:8080/apiCall/getUserInfo", {
    //             withCredentials : true,
    //             accessToken : accessToken,
    //         })
    //         .then((response) => {
    //             console.log("response Data:", response.data);
    //             setLogin(response.data.login);  // 로그인 값을 상태에 저장
    //             setUserLogin(response.data.login);  // 부모 컴포넌트로 login 값 전달
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching user data:", error);
    //             alert("Failed to fetch user data. Please try again.");
    //         });
    // }, []);

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            alert("Please upload a JSON file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", files[0]);

        try {
            const response = await fetch("http://localhost:8080/convert/upload", {
                method: "POST",
                body: formData,
                headers: {

                },
            } as RequestInit);

            if (response.ok) {
                const markdownContent = await response.text();
                console.log(markdownContent);
                downloadMarkdownFile(markdownContent); // Automatically download
                alert("File uploaded successfully");
                setFiles([]);
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
        }
    };

    const downloadMarkdownFile = (content) => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user-profile.md'; // Name of the downloaded file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up memory
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="w-full max-w-full sm:max-w-2xl">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                    accept=".json"
                />
                <div
                    className="w-full max-w-full sm:max-w-2xl h-48 sm:h-64 mb-4 sm:mb-8 rounded-lg border-2 border-dashed cursor-pointer flex items-center justify-center transition-colors duration-200"
                    onClick={handleClick}
                >
                    <div className="text-center">
                        <p className="text-[#c9d1d9] mb-2">
                            {files.length > 0
                                ? `${files.length} file(s) selected`
                                : "Drag and drop files here"}
                        </p>
                        <p className="text-sm text-[#8b949e]">or click to select files</p>
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full max-w-full sm:max-w-2xl px-3 sm:px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white
                    font-medium rounded-md transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2
                    focus:ring-offset-[#0d1117] touch-manipulation"
                >
                    Converter
                </button>
            </form>
        </main>
    );
}
