import {Github} from "lucide-react";
import React from "react";

export default function Footer(){
    return (
        <footer className="w-full p-4 sm:p-6 bg-[#0d1117] border-t border-[#30363d]">
            <div className="flex items-center justify-center gap-2 text-[#8b949e]">
                <Github size={16} />
                <a
                    href="https://github.com/okerry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c9d1d9] hover:underline transition-colors duration-200"
                >
                    okerry
                </a>
            </div>
        </footer>
    );
}