import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { Section } from "../types/AnswerTypes";
import type { SurveyFormData, AnswerValue } from "../types/AnswerTypes";
import SurveySection from "../components/SurveySection";
import DateInput from "../components/DateInput";
import { HiChevronLeft, HiChevronDoubleRight } from "react-icons/hi";

const API = __API_BASE__ as string

//constant
const SurveyPage: React.FC = () => {
    //param
    const [searchParams] = useSearchParams();
    //navigate
    const navigate = useNavigate();
    const taskId = searchParams.get("task_id");
    //states
    const [childDOBDate, setChildDOBDate] = useState<Date | null>(null);

    //effects
    useEffect(() => {
        if (!taskId) navigate("/upload");
    }, [taskId, navigate]);

    //json
    const [sections, setSections] = useState<Section[]>([]);

    //forms
    const [formData, setFormData] = useState<SurveyFormData>({
        childName: "",
        childDOB: "",
        childGender: "",
        parentName: "",
        q1_5: "",
        q1_6: "",
        q1_7: "",
        q1_8: "",
        q1_9: "",
        q1_10: "",
        q2_5: "",
        q2_6: "",
        q2_7: "",
        q2_8: "",
        q2_9: "",
        q2_10: "",
        q3_5: "",
        q3_6: "",
        q3_7: "",
        q3_8: "",
        q3_9: "",
        q3_10: "",
        q4_5: "",
        q4_6: "",
        q4_7: "",
        q4_8: "",
        q4_9: "",
        q4_10: "",
        emotionalState: ""
    });

    // fetch quest
    useEffect(() => {
        fetch("/questions.json")
            .then((res) => {
                if (!res.ok) throw new Error("Не удалось загрузить вопросы");
                return res.json();
            })
            .then((data: Section[]) => {
                setSections(data);
                const initial: SurveyFormData = { ...formData };
                data.forEach((section) =>
                    section.questions.forEach((q) => {
                        initial[q.id] = "";
                    })
                );
                setFormData(initial);
            })
            .catch((err) => {
                console.error("Ошибка загрузки вопросов:", err);
                alert("При загрузке вопросов опроса произошла ошибка.");
            });
    }, []);

    //update formData
    const handleChange = (key: string, value: AnswerValue) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // update childDOB
    useEffect(() => {
        if (childDOBDate) {
            const yyyy = childDOBDate.getFullYear();
            const mm = String(childDOBDate.getMonth() + 1).padStart(2, "0");
            const dd = String(childDOBDate.getDate()).padStart(2, "0");
            handleChange("childDOB", `${dd}.${mm}.${yyyy}`);
        } else {
            handleChange("childDOB", "");
        }
    }, [childDOBDate]);

    // allanswered
    const allAnswered =
        taskId !== null &&
        formData.childName.trim() !== "" &&
        formData.childDOB.trim() !== "" &&
        formData.childGender.trim() !== "" &&
        formData.parentName.trim() !== "" &&
        sections.every((section) =>
            section.questions.every((q) => {
                const v = formData[q.id];
                return v !== undefined && v.trim() !== "";
            })
        );

    // sending func
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async () => {
        if (!allAnswered || !taskId) return;
        setIsSubmitting(true);
        try {
            const payload = { task_id: taskId, survey: formData };
            const res = await fetch(`${API}/submit-survey`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.clone().json();
                console.error("Ошибка опроса", err);
                alert(`Ошибка сервера ${res.status}:\n${JSON.stringify(err, null, 2)}`);
                return;
            }

            navigate(`/status?task_id=${taskId}`);
        } catch (err: any) {
            console.error("Ошибка при отправке опроса:", err);
            alert(`При отправке опроса произошла ошибка:\n${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    //UI
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-8 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full max-w-[600px] mx-auto">
                    <div className="absolute top-0 left-0 right-0 h-[16px] bg-[#C7E4FC] rounded-t-[20px] overflow-hidden">
                        <div className="h-full bg-[#7abef8] w-2/3" />
                    </div>

                    <div className="px-8 py-8 bg-white rounded-[20px] shadow-lg">
                        <h1 className="text-[20px] mt-3 font-bold text-[#000] mb-6">
                            Общая информация о ребенке
                        </h1>

                        <div className="space-y-6 mb-8">
                            <div>
                                <label className="block text-[#293244] text-[16px] mb-1">Имя ребенка</label>
                                <input
                                    type="text"
                                    value={formData.childName || ""}
                                    onChange={(e) => handleChange("childName", e.target.value)}
                                    className="
                                            w-full
                                            border border-[#69758E]
                                            rounded-[6px]
                                            px-3 py-2
                                            placeholder-gray-400 text-[#293244]
                                            transition-colors duration-200
                                            hover:border-[#8A6BF4]
                                            focus:border-[#8A6BF4] focus:outline-none
                                            "
                                    placeholder="Введите имя ребенка"
                                />
                            </div>

                            <DateInput
                                label="Дата рождения ребенка"
                                selectedDate={childDOBDate}
                                onChange={(date) => setChildDOBDate(date)}
                            />

                            <div>
                                <label className="block text-[#293244] text-[16px] mb-1">Пол ребенка</label>
                                <div className="flex gap-x-2">
                                    <label className="flex items-center space-x-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="childGender"
                                            value="male"
                                            checked={formData.childGender === "male"}
                                            onChange={() => handleChange("childGender", "male")}
                                            className="peer sr-only"
                                        />
                                        <span
                                            className={`
                                                    w-4 h-4
                                                    rounded-full
                                                    border-2 border-gray-300
                                                    flex-shrink-0
                                                    relative
                                                    ${formData.childGender === "male"
                                                    ? "bg-[#7abef8] border-[#7abef8]"
                                                    : "bg-gray-300"}
                                                    peer-hover:bg-[#45a5f6]
                                                `}
                                        >
                                            {formData.childGender === "male" && (
                                                <span className="absolute top-1/2 left-1/2 w-[6px] h-[6px] bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                                            )}
                                        </span>
                                        <span
                                            className={`
                                                    text-sm
                                                    ${formData.childGender === "male"
                                                    ? "text-[#293244] font-semibold"
                                                    : "text-gray-700"}
                                                    peer-hover:text-[#7abef8]
                                                `}
                                        >
                                            Мужской
                                        </span>
                                    </label>

                                    <label className="flex items-center space-x-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="childGender"
                                            value="female"
                                            checked={formData.childGender === "female"}
                                            onChange={() => handleChange("childGender", "female")}
                                            className="peer sr-only"
                                        />
                                        <span
                                            className={`
                                                    w-4 h-4
                                                    rounded-full
                                                    border-2 border-gray-300
                                                    flex-shrink-0
                                                    relative
                                                    ${formData.childGender === "female"
                                                    ? "bg-pink-400 border-pink-300"
                                                    : "bg-gray-300"}
                                                    peer-hover:bg-pink-300
                                                `}
                                        >
                                            {formData.childGender === "female" && (
                                                <span className="absolute top-1/2 left-1/2 w-[6px] h-[6px] bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                                            )}
                                        </span>
                                        <span
                                            className={`
                                                    text-sm
                                                    ${formData.childGender === "female"
                                                    ? "text-[#293244] font-semibold"
                                                    : "text-gray-700"}
                                                    peer-hover:text-pink-500
                                                `}
                                        >
                                            Женский
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Имя родителя, заполняющего анкету
                                </label>
                                <input
                                    type="text"
                                    value={formData.parentName || ""}
                                    onChange={(e) => handleChange("parentName", e.target.value)}
                                    className="
                                            w-full
                                            border border-[#69758E]
                                            rounded-[6px]
                                            px-3 py-2
                                            placeholder-gray-400 text-[#293244]
                                            transition-colors duration-200
                                            hover:border-[#8A6BF4]
                                            focus:border-[#8A6BF4] focus:outline-none
                                            "
                                    placeholder="Введите имя родителя"
                                />
                            </div>
                        </div>

                        <div className="flex items-start bg-[#FADEE0] rounded-[8px] p-4 mb-8">
                            <img
                                src="/assets/like.svg"
                                alt="Уведомление"
                                className="h-[31.91px] w-[30.91px] flex-shrink-0 mr-3"
                            />

                            <div className="space-y-1 flex-1">
                                <p className="text-[14px]">
                                    Пожалуйста, внимательно прочитайте каждый вопрос и выберите наиболее
                                    подходящий вариант ответа, отражающий поведение и эмоциональное
                                    состояние вашего ребенка в течение последних 2–4 недель. Отвечайте
                                    максимально честно и искренне, так как от этого зависит точность оценки
                                    психоэмоционального развития вашего ребенка.
                                </p>

                                <div className="flex items-center space-x-2 ml-[-43px]">
                                    <img
                                        src="/assets/flag.svg"
                                        alt="Флаг"
                                        className="h-[31.91px] w-[30.91px] flex-shrink-0 mr-3"
                                    />
                                    <span className="text-[14px]">
                                        Все вопросы обязательны к заполнению
                                    </span>
                                </div>
                            </div>
                        </div>

                        {sections.length === 0 ? (
                            <p>Загрузка...</p>
                        ) : (
                            <>
                                {sections.map((sec) => (
                                    <SurveySection
                                        key={sec.sectionId}
                                        sectionId={sec.sectionId}
                                        title={sec.title}
                                        questions={sec.questions}
                                        answers={Object.fromEntries(
                                            sec.questions.map((q) => [q.id, formData[q.id] || ""])
                                        )}
                                        onAnswerChange={(questionId, value) =>
                                            handleChange(questionId, value)
                                        }
                                    />
                                ))}

                                <div className="mt-4 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row sm:justify-between sm:items-center">
                                    <span className="mt-6 text-[#A0A9B8] text-[14px] font-bold">Шаг 2/3</span>
                                    <div className="flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row sm:space-x-4 sm:space-y-0">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/upload")}
                                            className="
                                                    flex items-center space-x-2 justify-center sm:justify-start
                                                    bg-[#DAEDFD] hover:bg-[#B5DBFB]
                                                    cursor-pointer
                                                    px-6 py-3
                                                    rounded-[100px]
                                                    text-[#293244] text-[16px] font-normal
                                                    transition-colors duration-200
                                                    w-full sm:w-auto
                                                "
                                        >
                                            <HiChevronLeft className="h-[24px] w-[24px] text-[#293244]" />
                                            <span>К загрузке рисунков</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={!allAnswered || isSubmitting}
                                            className={`
                                                    flex items-center gap-x-4 sm:gap-x-2 justify-center sm:justify-start
                                                    px-6 py-3
                                                    rounded-[100px]
                                                    text-[#fff] text-[16px] font-normal
                                                    transition-colors duration-200
                                                    w-full sm:w-auto
                                                    ${!allAnswered || isSubmitting
                                                    ? "bg-[#4453711A] cursor-not-allowed"
                                                    : "bg-[#45A5F6] hover:bg-[#007EE5] text-[#45A5F6] cursor-pointer"
                                                }
                                                `}
                                        >
                                            {isSubmitting ? "Загрузка..." : "Узнать результаты"}
                                            <HiChevronDoubleRight className={`h-[24px] w-[24px] ${(!allAnswered || isSubmitting) ? "text-[#44537180]" : "text-[#fff]"}`} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyPage;
