import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex flex-col">
            <video
                className="
                            absolute inset-0
                            w-full h-[100vh]
                            sm:h-full
                            object-cover
                            "
                src="/bg/bg_video.webm"
                autoPlay
                muted
                loop
            />
            <div className="absolute inset-0 bg-black opacity-30" />
            <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
                <div className="relative bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#3A353E] mb-2 sm:mb-4">
                        Добро пожаловать в Sirius!
                    </h1>
                    <p className="text-sm sm:text-base text-[#5B5B5B] mb-6 sm:mb-8">
                        Здесь вы можете загрузить рисунки вашего ребёнка и пройти опрос.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/upload")}
                        className="
                                    inline-flex items-center justify-center space-x-2
                                    bg-[#45A5F6] hover:bg-[#007EE5]
                                    text-white text-sm sm:text-base font-medium
                                    px-4 sm:px-6 py-2 sm:py-3
                                    rounded-full
                                    transition-colors duration-200
                                    shadow
                                    cursor-pointer
                                    "
                    >
                        <span>Начать Тест</span>
                        <FaArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
                    </button>
                    <div className="absolute bottom-4 right-4 text-[#000] text-sm opacity-70">
                        Made by GulaliG
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
