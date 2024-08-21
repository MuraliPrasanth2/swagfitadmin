import React from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { MdDelete } from "react-icons/md";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { slotName } from "../Helpers/slotNames";

dayjs.extend(isBetween);

const PaymentInfo = ({
	paymentInfo,
	valuesInDb,
	phoneNumber,
	programName,
	name,
	program,
}) => {
	// Function to check if today is between the 'from' and 'to' dates
	const isCurrent = (from, to) =>
		dayjs().isBetween(dayjs(from), dayjs(to), "day", "[]");

	// Function to check if a date is in the future
	const isFuture = (date) => dayjs().isBefore(dayjs(date), "day");

	// Sort payment info based on the 'from' date
	const sortedPayments = [...paymentInfo].sort((a, b) =>
		dayjs(a.from).isBefore(dayjs(b.from)) ? -1 : 1,
	);

	function handleDeletePayment(paymentToDelete) {
		console.log(valuesInDb);
		const filteredPaymentInfo = valuesInDb.paymentInfo.filter((payment) => {
			return !(
				payment.from === paymentToDelete.from &&
				payment.to === paymentToDelete.to &&
				payment.amount === paymentToDelete.amount &&
				payment.addedAt === paymentToDelete.addedAt
			);
		});

		console.log(valuesInDb.paymentInfo);
		console.log(filteredPaymentInfo);

		const updatedValues = {
			...valuesInDb,
			paymentInfo: filteredPaymentInfo,
		};

		const confirmDelete = window.confirm(
			`Are you sure you want to delete the following payment?\n\n` +
				`Name: ${name}\n` +
				`Program: ${slotName[programName]}\n` +
				`From: ${dayjs(paymentToDelete.from).format("YYYY-MMM-DD")}\n` +
				`To: ${dayjs(paymentToDelete.to).format("YYYY-MMM-DD")}\n` +
				`Amount: Rs. ${paymentToDelete.amount}\n`,
		);
		if (confirmDelete) {
			try {
				console.log(db, programName, phoneNumber);
				setDoc(doc(db, programName, phoneNumber), updatedValues)
					.then(() => {
						console.log("deleted ", paymentToDelete);
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (err) {
				console.log(err);
			}
		}
	}

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
							<li
								key={index}
								className={`${textColor} text-sm my-2 flex justify-between items-center`}
							>
								<span className="inline-block">
									{dayjs(payment.from).format("YY-MMM-D")}
								</span>
								<span className="inline-block">
									{dayjs(payment.to).format("YY-MMM-D")}
								</span>

								<span className="inline-block">- Rs. {payment.amount}</span>
								<button onClick={() => handleDeletePayment(payment)}>
									<MdDelete className="inline-block text-red-700 text-3xl" />
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default PaymentInfo;
