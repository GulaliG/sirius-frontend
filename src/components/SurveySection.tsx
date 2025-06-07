import React from "react";
import type { Question } from "../types/AnswerTypes";
import type { AnswerValue } from "../types/AnswerTypes";

interface SurveySectionProps {
    sectionId: string;
    title: string;
    questions: Question[];
    answers: { [questionId: string]: AnswerValue };
    onAnswerChange: (questionId: string, value: AnswerValue) => void;
}

const frequencyLabels = ["Очень редко", "Редко", "Иногда", "Часто", "Всегда"];

const SurveySection: React.FC<SurveySectionProps> = ({
    title,
    questions,
    answers,
    onAnswerChange,
}) => {

    //UI
    return (
        <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h1>

            {questions.map((q) => {
                const currentValue = answers[q.id] || "";

                return (
                    <div key={q.id} className="mb-6">
                        <label className="block text-[#000] text-[16px] font-normal mb-2">{q.label}</label>

                        {q.type === "frequency" && (
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:gap-x-6 items-start">
                                {frequencyLabels.map((label, idx) => {
                                    const isChecked = currentValue === label;

                                    return (
                                        <label
                                            key={idx}
                                            className="flex items-center cursor-pointer space-x-1"
                                        >

                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={label}
                                                checked={isChecked}
                                                onChange={() => onAnswerChange(q.id, label)}
                                                className="peer sr-only"
                                                aria-label={`${q.label}: ${label}`}
                                            />

                                            <span
                                                className={`
                                                            w-4 h-4
                                                            rounded-full
                                                            border-2 border-gray-300
                                                            flex-shrink-0
                                                            relative
                                                            ${isChecked ? "bg-[#45A5F6] border-[#45A5F6]" : "bg-gray-300"}
                                                            peer-hover:bg-[#45a5f6]
                                                            `}
                                            >
                                                {isChecked && (
                                                    <span
                                                        className="
                                                                    absolute top-1/2 left-1/2
                                                                    transform -translate-x-1/2 -translate-y-1/2
                                                                    w-[6px] h-[6px]
                                                                    bg-white rounded-full
                                                                    "
                                                    />
                                                )}
                                            </span>

                                            <span
                                                className={`
                                                            text-[12px]
                                                            ${isChecked ? "text-[#293244] font-semibold" : "text-[#293244]"}
                                                            peer-hover:text-[#45a5f6]
                                                            `}
                                            >
                                                {label}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}

                        {q.type === "rating5" && (
                            <div className="grid grid-rows-5 gap-y-2">
                                {[
                                    "Отличное",
                                    "Хорошее",
                                    "Удовлетворительное",
                                    "Неудовлетворительное",
                                    "Очень плохое",
                                ].map((label, idx) => {
                                    const isChecked = currentValue === label;
                                    return (
                                        <label key={idx} className="flex items-center cursor-pointer space-x-2">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={label}
                                                checked={isChecked}
                                                onChange={() => onAnswerChange(q.id, label)}
                                                className="peer sr-only"
                                                aria-label={`${q.label}: ${label}`}
                                            />
                                            <span
                                                className={`
                                                            w-4 h-4
                                                            rounded-full
                                                            border-2 border-gray-300
                                                            flex-shrink-0
                                                            relative
                                                            ${isChecked ? "bg-[#45A5F6] border-[#45A5F6]" : "bg-gray-300"}
                                                            peer-hover:bg-[#45a5f6]
                                                            `}
                                            >
                                                {isChecked && (
                                                    <span className="
                                                                    absolute top-1/2 left-1/2
                                                                    transform -translate-x-1/2 -translate-y-1/2
                                                                    w-[6px] h-[6px]
                                                                    bg-white rounded-full
                                                                    "
                                                    />
                                                )}
                                            </span>
                                            <span
                                                className={`
                                                            text-[12px]
                                                            ${isChecked ? "text-[#293244] font-semibold" : "text-[#293244]"}
                                                            peer-hover:text-[#45A5F6]
                                                            `}
                                            >
                                                {label}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}

                        {q.type === "textarea" && (
                            <textarea
                                value={currentValue}
                                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                rows={4}
                                className="w-full border border-[#A0A9B8] rounded-md p-2 text-gray-700 transition-colors duration-200
                                            hover:border-[#8A6BF4]
                                            focus:border-[#8A6BF4] focus:outline-none"
                                placeholder="Введите текст..."
                                aria-label={q.label}
                                aria-required="true"
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SurveySection;
