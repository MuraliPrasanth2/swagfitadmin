import React from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const PaymentInfo = ({ paymentInfo }) => {
    // Function to check if today is between the 'from' and 'to' dates
    const isCurrent = (from, to) =>
        dayjs().isBetween(dayjs(from), dayjs(to), "day", "[]");

    // Function to check if a date is in the future
    const isFuture = (date) => dayjs().isBefore(dayjs(date), "day");

    // Sort payment info based on the 'from' date
    const sortedPayments = [...paymentInfo].sort((a, b) =>
        dayjs(a.from).isBefore(dayjs(b.from)) ? -1 : 1,
    );

    return (
        <div>
            {!sortedPayments.length && (
                <div className="text-gray-400 mt-2">
                    No payment info available for this slot.
                </div>
            )}
            {sortedPayments.length > 0 && (
                <ul className="mt-1 space-y-1">
                    {sortedPayments.map((payment, index) => {
                        let textColor = "text-gray-500"; // default for past dates
                        if (isCurrent(payment.from, payment.to)) {
                            textColor = "text-green-400";
                        } else if (isFuture(payment.from)) {
                            textColor = "text-green-100";
                        }

                        return (
                            <li key={index} className={`${textColor} text-sm`}>
                                {dayjs(payment.from).format("YYYY-MM-DD")} -{" "}
                                {dayjs(payment.to).format("YYYY-MM-DD")} - Rs. {payment.amount}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default PaymentInfo;
