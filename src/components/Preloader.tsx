import React from 'react';

export const Preloader: React.FC = () => (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div
            className=" w-36 h-36
                        border-4 border-gray-200
                        border-t-[#45A5F6]
                        rounded-full
                        animate-spin"
        />
    </div>
);
