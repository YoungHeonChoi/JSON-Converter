import { useState } from 'react';
export default function form() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        let chkType = e.target.files[0].type;

        if(chkType === "application/json"){
            setFile(e.target.files[0]);
        }else{
            alert("json파일만 업로드 할 수 있습니다.");
            return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            console.log("업로드된 파일", file);
        } else {
            alert("json파일을 업로드 해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8080/convert", {
                method: "POST",
                body: formData,
                headers: {

                },
            } as RequestInit);

            if (response.ok) {
                const markdownContent = await response.text();
                console.log(markdownContent);
                downloadMarkdownFile(markdownContent); // 자동으로 다운로드
                alert("업로드 성공");
                setFile(null);
            } else {
                alert("업로드 실패");
            }
        } catch (error) {
            console.error("업로드 에러", error);
        }
    };

    const downloadMarkdownFile = (content) => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user-profile.md'; // 다운로드할 파일 이름
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // 메모리 해제
    };

    return (
        <form
            className="flex flex-col items-center gap-4 p-4 w-full border-2 border-dashed border-gray-300 rounded-lg"
        >
            {/* 파일 업로드 영역 */}
            <label className="cursor-pointer w-full">
                <input
                    type="file"
                    className="hidden"
                    accept=".json"
                />
                <div className="flex flex-col items-center justify-center h-16 w-full p-4 bg-gray-100 border border-gray-300 rounded-lg text-center text-gray-500 hover:bg-[#383838] dark:hover:bg-[#ccc]">
                    <span className="font-semibold text-gray-500">Click to upload a JSON file</span>
                    <span className="text-xs mt-1 text-gray-400">or drag and drop</span>
                </div>
            </label>

            {/* 가로 정렬된 버튼 (점선 테두리 안) */}
            <div className="flex flex-col sm:flex-row justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    type="submit"
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
        </form>
    );
}