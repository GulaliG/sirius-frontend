import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import UploadBox from "../components/UploadBox";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPreview, setTaskId } from "../store/slices/uploadSlice";

const UploadPage: React.FC = () => {
    //navigate
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    //redux store
    const previews = useAppSelector((state) => state.upload.previews);

    // Her kutu için seçilen File nesnelerini yerel state'te saklıyoruz:
    const [files, setFiles] = useState<{
        [key: string]: File | null;
    }>({
        box1: null,
        box2: null,
        box3: null,
    });

    //disabled button api
    const [isSubmitting, setIsSubmitting] = useState(false);

    // uploadbox func
    const handleFileSelect = (boxKey: string, file: File, previewUrl: string) => {
        setFiles((prev) => ({
            ...prev,
            [boxKey]: file,
        }));
        //redux store
        dispatch(setPreview({ key: boxKey, url: previewUrl }));
    };

    // active/passive next button
    const allFilled = files.box1 && files.box2 && files.box3;

    // next button clicked
    const handleSubmit = async () => {
        if (!allFilled) {
            alert("Пожалуйста, выберите все три фотографии.");
            return;
        }
        setIsSubmitting(true);

        const formData = new FormData();

        formData.append("files", files.box1!);
        formData.append("files", files.box2!);
        formData.append("files", files.box3!);

        try {
            const res = await fetch("/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                let errorDetails: any = {};
                try {
                    errorDetails = await res.json();
                } catch {
                    const text = await res.text();
                    console.warn("С сервера пришел не JSON-ответ в виде посылки:", text);
                }
                console.error("Подробности об ошибке сервера:", errorDetails);
                alert(
                    `Ошибка сервера ${res.status}:\n${JSON.stringify(errorDetails, null, 2)}`
                );
                throw new Error(`Сервер не отвечает: ${res.status}`);
            }

            const data = await res.json();
            const taskId = data.task_id as string;
            dispatch(setTaskId(taskId));
            navigate(`/survey?task_id=${taskId}`);
        } catch (err: any) {
            console.error("Upload hatası:", err);
            alert(`При отправке фотографий произошла ошибка:\n${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    //UI
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
            <div className="relative w-full max-w-[904px]">
                <div className="absolute top-0 left-0 right-0 h-[16px] bg-[#C7E4FC] rounded-t-[20px] overflow-hidden">
                    <div className="h-full bg-[#7abef8] w-1/3" />
                </div>

                <div className="bg-white flex flex-col shadow-lg w-full rounded-[20px]">
                    <div className="px-8 py-8">
                        <h1 className="text-[20px] font-bold text-[#3A353E] mb-2">
                            Загрузите фотографии рисунков
                        </h1>

                        <div className="flex w-fit items-center bg-red-50 text-red-700 text-sm rounded-[100px] px-3 py-2 mb-6">
                            <FiAlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                            <p className="font-semibold">Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6
                                        justify-items-stretch sm:justify-items-center
                                        "
                        >
                            <UploadBox
                                label="Дом,Дерево,Человек"
                                boxKey="box1"
                                previewUrl={previews.box1}
                                onFileSelect={handleFileSelect}
                            />
                            <UploadBox
                                label="Несуществующее животное"
                                boxKey="box2"
                                previewUrl={previews.box2}
                                onFileSelect={handleFileSelect}
                            />
                            <UploadBox
                                label="Автопортрет"
                                boxKey="box3"
                                previewUrl={previews.box3}
                                onFileSelect={handleFileSelect}
                            />
                        </div>
                        <div className="mt-16 flex justify-between items-center">
                            <div className="flex mt-5 items-center text-[#A0A9B8] text-[14px] font-bold">
                                <span>Шаг 1/3</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!allFilled || isSubmitting}
                                className={`flex items-center space-x-2 px-6 py-[8px] rounded-[100px] text-white font-medium transition-colors duration-200 ${!allFilled || isSubmitting
                                    ? "bg-[#4453711A] cursor-not-allowed"
                                    : "bg-[#45A5F6] hover:bg-[#007EE5] cursor-pointer"
                                    }`}
                            >
                                <span>{isSubmitting ? "Загрузка..." : "Далее"}</span>
                                <FaArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
