import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReportResult } from "../components/ReportResult";
import { toast } from 'react-toastify'
import { HiHome } from "react-icons/hi";

//env API
const API = __API_BASE__ as string

export default function StatusPage() {
    //param
    const [searchParams] = useSearchParams();
    //navigate
    const navigate = useNavigate();
    //taskId
    const taskId = searchParams.get("task_id") || "";
    //circ
    const [reportStatus, setReportStatus] = useState<"processing" | "ready" | "error" | "timeout">("processing");
    //states
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [reportMd, setReportMd] = useState<string>("");
    //refs
    const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triesRef = useRef<number>(0);
    //api timeout
    const POLL_INTERVAL_MS = 10_000;
    const MAX_POLLS = 30;

    //api navigate
    useEffect(() => {
        if (!taskId) navigate("/upload");
    }, [taskId, navigate]);

    //polling
    useEffect(() => {
        if (!taskId) return;

        const checkStatus = async () => {
            try {
                const res = await fetch(`${API}/report/${taskId}`);
                if (res.status === 404) {
                    if (++triesRef.current < MAX_POLLS) {
                        pollTimer.current = setTimeout(checkStatus, POLL_INTERVAL_MS);
                    } else {
                        setReportStatus("timeout");
                    }
                    return;
                }
                if (res.status === 500) {
                    toast.error("Серверная ошибка при получении отчёта.");
                    setReportStatus("error");
                    return;
                }
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setPdfUrl(data.pdf_url!);
                setReportMd(data.report_md!);
                setReportStatus("ready");
            } catch (e) {
                toast.error("Ошибка сети при проверке отчёта.");
                setReportStatus("error");
            }
        };

        checkStatus();
        return () => { if (pollTimer.current) clearTimeout(pollTimer.current); };
    }, [taskId, navigate]);

    // error/timeout 5 second
    useEffect(() => {
        if (reportStatus === "timeout") {
            toast.warn("Отчёт ещё не готов. Вы будете перенаправлены на главную страницу.");
        }
        if (reportStatus === "timeout" || reportStatus === "error") {
            const t = setTimeout(() => navigate("/"), 5000);
            return () => clearTimeout(t);
        }
    }, [reportStatus, navigate]);

    //UI
    return (
        <main
            role="main"
            className="min-h-screen bg-gray-100 flex justify-center px-4 py-8"
            aria-labelledby="status-page-title"
            {...(reportStatus === "processing"
                ? { "aria-busy": "true" }
                : { "aria-busy": "false" })}
        >
            <h1
                id="status-page-title"
                className="sr-only"
            >
                Статус отчёта
            </h1>
            <div className="relative w-full max-w-[600px] mx-auto">
                <div className="absolute top-0 left-0 right-0 h-[16px] bg-[#C7E4FC] rounded-t-[20px] overflow-hidden">
                    <div className="h-full bg-[#7abef8] w-full animate-pulse" />
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-5 right-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-100 transition cursor-pointer"
                    aria-label="На главную"
                >
                    <HiHome className="w-[24px] h-[24px] text-[#45A5F6] hover:text-[#007EE5]" />
                </button>

                <div className="pt-6 px-8 pb-10 bg-white rounded-[20px] shadow-lg">

                    {reportStatus === "processing" && (
                        <div
                            role="status"
                            aria-live="polite"
                            aria-label="Отчёт обрабатывается, подождите"
                            className="flex flex-col items-center space-y-4 mt-10"
                        >
                            <div
                                className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#45A5F6]"
                                aria-hidden="true"
                            />
                            <p className="text-gray-600 text-lg">Анализ в процессе…</p>
                            <p className="text-sm text-gray-500">
                                Обычно это занимает 1-3 минут. Пожалуйста, подождите.
                            </p>
                        </div>
                    )}

                    {reportStatus === "timeout" && (
                        <div
                            role="alert"
                            className="mt-8 p-4 bg-yellow-50 border border-yellow-300 rounded-md"
                        >
                            <h2 className="sr-only">Отложено</h2>
                            <p className="text-yellow-700 font-medium mb-2">Отчёт ещё не готов.</p>
                            <p className="text-sm text-yellow-600">
                                Попробуйте обновить страницу позже. Вы будете перенаправлены на
                                главную.
                            </p>
                        </div>
                    )}

                    {reportStatus === "error" && (
                        <div
                            role="alert"
                            className="mt-8 p-4 bg-red-50 border border-red-300 rounded-md"
                        >
                            <h2 className="sr-only">Ошибка</h2>
                            <p className="text-red-700 font-medium mb-2">
                                Ошибка сервера при получении отчёта.
                            </p>
                            <p className="text-sm text-red-600">
                                Пожалуйста, попробуйте позже или обновите страницу.
                            </p>
                        </div>
                    )}

                    {reportStatus === "ready" && (
                        <section aria-labelledby="report-ready-title">
                            <h2 id="report-ready-title" className="sr-only">Отчёт готов</h2>
                            <ReportResult
                                reportMd={reportMd}
                                pdfUrl={pdfUrl}
                                stepLabel="Шаг 3/3"
                            />
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
