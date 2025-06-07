import React, { useRef } from "react";
import type { ChangeEvent } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

interface UploadBoxProps {
    label: string;
    boxKey: string;
    previewUrl?: string;
    onFileSelect: (boxKey: string, file: File, previewUrl: string) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({
    label,
    boxKey,
    previewUrl,
    onFileSelect,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const url = reader.result as string;
                onFileSelect(boxKey, file, url);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div
                className={`
                            relative
                            ${previewUrl ? "bg-white" : "bg-[#F6F6F8]"}
                            border-gray-200 rounded-lg
                            w-full h-[150px]
                            sm:w-[216px] sm:max-w-[216px] sm:h-[191px]
                            flex items-center justify-center
                            hover:border-blue-300 transition-colors
                            cursor-pointer
                            overflow-hidden
                        `}
                onClick={handleClick}
            >
                {!previewUrl ? (
                    <div className="bg-[#DAEDFD] rounded-lg w-[64px] h-[64px] flex items-center justify-center">
                        <HiOutlineArrowDownTray className="h-[36px] w-[36px] text-[#293244]" />
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <img
                            src={previewUrl}
                            alt={label}
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="
                                        absolute
                                        top-1/2 left-1/2
                                        -translate-x-1/2 -translate-y-1/2
                                        bg-[#DAEDFD] rounded-lg
                                        w-[64px] h-[64px]
                                        flex items-center justify-center
                                    "
                        >
                            <FiRefreshCw className="h-[36px] w-[36px] text-[#293244]" />
                        </div>
                    </div>
                )}

                <input
                    aria-label="upload"
                    title="upload"
                    type="file"
                    accept="image/png, image/jpeg, application/pdf"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleChange}
                />
            </div>

            <span className="mt-2 text-[#3A353E] text-[16px]">{label}</span>
        </div>
    );
};

export default UploadBox;
