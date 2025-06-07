// src/components/ToastProvider.tsx
import React from 'react'
import { ToastContainer } from 'react-toastify'
import type { ToastContainerProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineClose } from 'react-icons/ai'

const ToastProvider: React.FC = () => {
    const defaultProps: ToastContainerProps = {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        className: 'p-2 top-2 right-2 sm:top-5 sm:right-5',
        toastClassName:
            'relative bg-[#B5DBFB] text-black rounded-lg shadow-lg flex items-center justify-between px-4 py-2 max-w-xs sm:max-w-md',
        closeButton: ({ closeToast }) => (
            <button
                type="button"
                onClick={closeToast}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 focus:outline-none cursor-pointer"
                aria-label="Закрыть"
            >
                <AiOutlineClose className="text-[#007EE5] h-4 w-4 sm:h-4 sm:w-4" />
            </button>
        ),
    }

    return <ToastContainer {...defaultProps} />
}

export default ToastProvider
