"use client";

import React, { useState, useRef } from "react";
import { usePageNavigation } from "@/hooks/usePageNavigation";

export default function Step1() {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const { navigateTo } = usePageNavigation();
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
    };
    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };
    const handleClick = () => {
        fileInputRef.current.click();
    };
    return (
            <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                />
                <div
                    className={`w-full max-w-full sm:max-w-2xl h-48 sm:h-64 mb-4 sm:mb-8 rounded-lg border-2 border-dashed cursor-pointer
                    ${isDragging ? "border-[#2ea043] bg-[#1b1f23]" : "border-[#30363d]"}
                    flex items-center justify-center transition-colors duration-200`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
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
                    onClick={() => navigateTo('/converter/step2')}
                    className="w-full max-w-full sm:max-w-2xl px-3 sm:px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white
                    font-medium rounded-md transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:ring-offset-2
                    focus:ring-offset-[#0d1117] touch-manipulation"
                >
                    Converter
                </button>
            </main>
    );
}