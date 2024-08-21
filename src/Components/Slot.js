import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import PaymentInfo from "./PaymentInfo";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import AddPaymentPopover from "./AddPaymentPopover"; // Import the new component

dayjs.extend(isBetween);

export default function Slot({
	phoneNumber,
	name,
	email,
	paymentInfo,
	highlightPhoneNumber,
	programName,
	valuesInDb,
}) {
	const isCurrent = (from, to) =>
		dayjs().isBetween(dayjs(from), dayjs(to), "day", "[]");

	const hasCurrentPayment = paymentInfo.some((payment) =>
		isCurrent(payment.from, payment.to),
	);

	const [isPopOpen, setIsPopOpen] = useState(false);

	const handleAddMoney = () => {
		setIsPopOpen(true);
	};

	const handlePopOverCloseButtonClick = () => {
		setIsPopOpen(false);
	};

	const AddMoney = (phoneNumber, from, to, amount, addedAt) => {
		let paymentInfo = valuesInDb.paymentInfo || [];
		paymentInfo.push({ from, to, amount, addedAt });
		const updatedValues = { ...valuesInDb, paymentInfo };
		try {
			setDoc(doc(db, programName, phoneNumber), updatedValues)
				.then(() => {
					setIsPopOpen(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const cardBgColor = hasCurrentPayment ? "bg-gray-800" : "bg-neutral-800";

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
		<>
			<div
				className={`p-6 rounded-md ${cardBgColor} text-white shadow-xl transition-transform transform duration-300 w-full md:w-auto`}
			>
				<div className="mb-1 text-normal font-bold text-gray-100">{name}</div>
				<div className="mb-1 text-gray-500 text-sm">
					{highlightText(phoneNumber, highlightPhoneNumber)}

					<a
						href={`https://wa.me/${phoneNumber.slice(1)}`}
						target="_blank"
						rel="noreferrer"
					>
						<FaWhatsapp className="ml-4 text-2xl text-neutral-500 inline-block" />
					</a>
					<a
						href={`tel:${phoneNumber.slice(1)}`}
						target="_blank"
						rel="noreferrer"
					>
						<IoMdCall className="ml-2 text-2xl text-neutral-500 inline-block" />
					</a>
				</div>
				<div className="mb-3 text-gray-500 text-sm">{email}</div>
				<span className="text-normal text-gray-300 font-semibold">
					Payment Info:
				</span>
				<PaymentInfo
					paymentInfo={paymentInfo}
					valuesInDb={valuesInDb}
					phoneNumber={phoneNumber}
					programName={programName}
					name={name}
				/>
				<div className="flex space-x-2">
					<button
						className="block w-full text-center px-6 py-2 bg-gray-900 text-white rounded-sm mt-4 flex justify-center"
						onClick={handleAddMoney}
					>
						<GiReceiveMoney className="text-2xl text-green-400" />
					</button>
					<Link
						className="block w-full text-center px-4 py-2 bg-black text-white rounded-sm mt-4 flex justify-center"
						to={"/slotdetails?program=" + programName + "&id=" + phoneNumber}
					>
						<TbListDetails className="text-2xl text-violet-500" />
					</Link>
				</div>
			</div>

			{isPopOpen && (
				<AddPaymentPopover
					phoneNumber={phoneNumber}
					programName={programName}
					name={name}
					valuesInDb={valuesInDb}
					onClose={handlePopOverCloseButtonClick}
					onAddPayment={AddMoney}
				/>
			)}
		</>
	);
}
