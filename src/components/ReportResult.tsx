import React from "react";
import ReactMarkdown from "react-markdown";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface ReportResultProps {
    reportMd?: string;
    pdfUrl: string;
    stepLabel?: string;
}

export const ReportResult: React.FC<ReportResultProps> = ({
    reportMd,
    pdfUrl,
    stepLabel = "Шаг 3/3",
}) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Результаты психодиагностики",
                    text: "Посмотрите результаты теста",
                    url: window.location.href,
                })
                .catch(console.error);
        } else {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => alert("Ссылка скопирована в буфер обмена"))
                .catch(console.error);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 mb-6 overflow-hidden rounded-lg [&>*]:mt-1 [&>*]:mb-2 leading-[1]">
                <div className="h-full overflow-x-auto
                                break-words whitespace-pre-wrap px-2"
                >
                    {reportMd
                        ? <ReactMarkdown>{reportMd}</ReactMarkdown>
                        : <p>Нет данных для отображения</p>}
                </div>
            </div>

            <div className="mt-6 flex flex-col space-y-4 w-full">
                <div className="flex flex-col space-y-4 w-full
                                sm:flex-row sm:space-x-4 sm:space-y-0 sm:justify-center
                                "
                >
                    <a
                        href={pdfUrl}
                        download
                        className="w-full sm:w-auto px-6 py-3 bg-[#45A5F6] hover:bg-[#007EE5]
                text-white rounded-[100px] flex items-center justify-center sm:justify-start space-x-2"
                    >
                        <span>Скачать отчет PDF</span>
                        <ArrowDownTrayIcon className="h-[24px] w-[24px]" />
                    </a>

                    <button type="button"
                        onClick={handleShare}
                        className="w-full sm:w-auto px-6 py-3 bg-[#45A5F6] hover:bg-[#5bb5f0]
                                text-white rounded-[100px] flex items-center justify-center sm:justify-start space-x-2
                                "
                    >
                        <span>Поделиться результатами</span>
                        <img
                            src="/assets/share.svg"
                            alt="Share"
                            className="h-[24px] w-[24px]"
                        />
                    </button>
                </div>


                <div className="text-[#A0A9B8] text-[14px] font-bold">{stepLabel}</div>

            </div>
        </div>
    );
};
