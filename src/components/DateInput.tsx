import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import { toast } from "react-toastify";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

interface DateInputProps {
    id?: string;
    label: string;
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    ariaRequired?: boolean;
    ariaInvalid?: boolean;
}

const MonthYearHeader: React.FC<ReactDatePickerCustomHeaderProps> = ({
    date,
    decreaseMonth,
    increaseMonth,
    changeMonth,
    changeYear,
}) => {
    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август",
        "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ];
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const yearStart = new Date().getFullYear() - 25;
    const years = Array.from({ length: 50 }, (_, i) => yearStart + i);
    const [editingMonth, setEditingMonth] = useState(false);
    const [editingYear, setEditingYear] = useState(false);

    return (
        <div className="flex items-center justify-between px-3 py-2 bg-white">
            <button
                type="button"
                onClick={decreaseMonth}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Предыдущий месяц"
            >
                <HiChevronLeft className="h-[24px] w-[24px] cursor-pointer" />
            </button>

            <div className="flex items-baseline space-x-2">
                {editingMonth ? (
                    <select
                        aria-label="month"
                        title="month"
                        autoFocus
                        value={currentMonth}
                        onBlur={() => setEditingMonth(false)}
                        onChange={(e) => {
                            changeMonth(Number(e.target.value));
                            setEditingMonth(false);
                        }}
                        className="rounded p-1 text-gray-800"
                    >
                        {monthNames.map((m, idx) => (
                            <option key={idx} value={idx}>
                                {m}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span
                        onClick={() => setEditingMonth(true)}
                        className="text-base font-bold text-gray-800 cursor-pointer"
                    >
                        {monthNames[currentMonth]}
                    </span>
                )}

                {editingYear ? (
                    <select
                        aria-label="year"
                        title="year"
                        autoFocus
                        value={currentYear}
                        onBlur={() => setEditingYear(false)}
                        onChange={(e) => {
                            changeYear(Number(e.target.value));
                            setEditingYear(false);
                        }}
                        className="rounded p-1 text-gray-600"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span
                        onClick={() => setEditingYear(true)}
                        className="text-base text-gray-600 cursor-pointer"
                    >
                        {currentYear}
                    </span>
                )}
            </div>

            <button
                type="button"
                onClick={increaseMonth}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Следующий месяц"
            >
                <HiChevronRight className="h-[24px] w-[24px] cursor-pointer" />
            </button>
        </div>
    );
};

const DateInput: React.FC<DateInputProps> = ({
    id,
    label,
    selectedDate,
    onChange,
    ariaRequired,
    ariaInvalid
}) => {
    const handleDateChange = (date: Date | null) => {
        if (date && date > new Date()) {
            toast.error("Нельзя выбрать дату из будущего. Пожалуйста, укажите корректную дату рождения.");
            return onChange(null);
        }
        onChange(date);
    };

    //UI
    return (
        <div className="flex flex-col mb-6">
            <label htmlFor={id} className="block text-[#293244] text-[16px] mb-1">{label}</label>
            <DatePicker
                id={id}
                selected={selectedDate}
                onChange={handleDateChange}
                maxDate={new Date()}
                aria-required={ariaRequired}
                aria-invalid={ariaInvalid}
                locale="ru"
                dateFormat="dd.MM.yyyy"
                placeholderText="02.03.2000"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                popperPlacement="bottom-start"
                showPopperArrow={false}
                className="
                        w-[95px] border border-[#69758E] rounded-[6px]
                        px-3 py-2 focus:outline-none text-gray-700 text-sm
                        placeholder-gray-400 caret-transparent
                        transition-colors duration-200
                        hover:border-[#8A6BF4]
                        focus:border-[#8A6BF4] focus:outline-none
                        "
                calendarClassName="
                                drop-shadow-lg bg-white rounded-xl mt-1
                                "
                renderCustomHeader={(props) => <MonthYearHeader {...props} />}
                dayClassName={(date) => {
                    const sel = selectedDate;
                    return sel &&
                        date.getDate() === sel.getDate() &&
                        date.getMonth() === sel.getMonth() &&
                        date.getFullYear() === sel.getFullYear()
                        ? "bg-[#7abef8] text-white rounded-full"
                        : "";
                }}
                renderDayContents={(day) => <span>{day}</span>}
            />
        </div>
    );
};
export default DateInput;
