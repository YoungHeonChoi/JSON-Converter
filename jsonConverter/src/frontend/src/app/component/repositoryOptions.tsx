import React from 'react';

interface RepositoryOptionsProps {
    onClose: () => void;
}

const RepositoryOptions: React.FC<RepositoryOptionsProps> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("README exported");
        onClose();
    };

    return (
        <div className="mt-4 space-y-4 w-full">
            {/* 셀렉트 박스 */}
            <div className="flex flex-col sm:flex-row justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4">
                <select className="w-full border border-gray-300 rounded-md p-2 text-gray-500">
                    <option value="test1">기존 저장소에 연결</option>
                    <option value="test2">새로운 저장소 생성</option>
                </select>
            </div>

            {/* 인풋 필드 */}
            <div className="flex flex-col sm:flex-row justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                    type="text"
                    placeholder="Enter value"
                    className="w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            {/* 실행 버튼 */}
            <div className="flex flex-col sm:flex-row justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white text-black border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    onClick={handleSubmit}
                >
                    excute
                </button>
            </div>
        </div>
    );
};

export default RepositoryOptions;
