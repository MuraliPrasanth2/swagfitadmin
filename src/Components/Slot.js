import React from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import PaymentInfo from "./PaymentInfo";

dayjs.extend(isBetween);

export default function Slot({
    phoneNumber,
    name,
    email,
    paymentInfo,
    highlightPhoneNumber,
}) {
    // Function to check if today is between the 'from' and 'to' dates
    const isCurrent = (from, to) =>
        dayjs().isBetween(dayjs(from), dayjs(to), "day", "[]");

    // Determine the overall background color based on paymentInfo
    const hasCurrentPayment = paymentInfo.some((payment) =>
        isCurrent(payment.from, payment.to),
    );

    const cardBgColor = hasCurrentPayment ? "bg-green-950" : "bg-stone-800";

    const highlightText = (text, highlight) => {
        if (!highlight) return text;
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={index} className="text-green-300">
                    {part}
                </span>
            ) : (
                part
            ),
        );
    };

    return (
        <div
            className={`p-6 rounded-md ${cardBgColor} text-white shadow-xl transition-transform transform duration-300 w-full md:w-auto`}
        >
            <div className="mb-1 text-normal font-bold text-gray-100">{name}</div>
            <div className="mb-1 text-gray-500 text-sm">
                {highlightText(phoneNumber, highlightPhoneNumber)}
            </div>
            <div className="mb-3 text-gray-500 text-sm">{email}</div>
            <PaymentInfo paymentInfo={paymentInfo} />
        </div>
    );
}
