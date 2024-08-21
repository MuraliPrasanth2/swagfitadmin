import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import PaymentInfo from "./PaymentInfo";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
// import { CgDetailsMore } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
	console.log(valuesInDb);
	// Function to check if today is between the 'from' and 'to' dates
	const isCurrent = (from, to) =>
		dayjs().isBetween(dayjs(from), dayjs(to), "day", "[]");

	// Determine the overall background color based on paymentInfo
	const hasCurrentPayment = paymentInfo.some((payment) =>
		isCurrent(payment.from, payment.to),
	);

	// handling popover logic for add payment
	const [isPopOpen, setIsPopOpen] = useState(false);

	const today = dayjs().format("YYYY-MM-DD");
	const [fromDate, setFromDate] = useState(today);
	const [toDate, setToDate] = useState(today);
	const [amount, setAmount] = useState(0);
	const [popOverError, setPopOverError] = useState([]);

	const handleAddMoney = () => {
		setIsPopOpen(true);
	};

	const handlePopOverCloseButtonClick = () => {
		setIsPopOpen(false);
	};

	function AddMoney(phoneNumber, from, to, amount, addedAt) {
		console.log({ phoneNumber, from, to, amount, addedAt });
		let paymentInfo = valuesInDb.paymentInfo || [];
		paymentInfo.push({ from, to, amount, addedAt });
		const updatedValues = { ...valuesInDb, paymentInfo };
		console.log(valuesInDb);
		console.log(updatedValues);
		try {
			// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
			setDoc(doc(db, programName, phoneNumber), updatedValues)
				.then(() => {
					setIsPopOpen(false);
				})
				.catch((err) => {
					// console.log(err);
					// setUplaodError(
					// 	"Your slot is not booked yet, please try again after sometime,",
					// );
				});
		} catch (err) {
			// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
			// setUplaodError(
			// 	"Your slot is not booked yet, please try again after sometime,",
			// );
		}
	}

	const handleAddMoneyClick = (e) => {
		e.preventDefault();
		const fromDateDayJs = dayjs(fromDate);
		const toDateDayJs = dayjs(toDate);
		const errors = [];

		if (!toDateDayJs.isAfter(fromDateDayJs)) {
			errors.push("The 'to' date should be after the 'from' date.");
		}

		if (amount === 0 || amount === "") {
			errors.push("Amount should be greater than 0");
		}

		if (errors.length === 0) {
			setPopOverError([]);
			console.log(fromDate, toDate, amount);
			AddMoney(
				phoneNumber,
				fromDate,
				toDate,
				amount,
				dayjs().format("YYYY-MM-DD"),
			);
		} else {
			setPopOverError(errors);
		}
	};

	const cardBgColor = hasCurrentPayment ? "bg-green-950" : "bg-neutral-800";

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
				<PaymentInfo paymentInfo={paymentInfo} />
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
				<div className="fixed z-20 bg-black/70 w-screen h-screen top-0 left-0">
					<div className="absolute z-40 bg-slate-800 text-white p-4 shadow-lg rounded-lg w-80 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 mt-2">
						<button
							className="absolute right-2 top-1"
							onClick={handlePopOverCloseButtonClick}
						>
							x
						</button>
						<div className="font-semibold text-gray-500 text-center">
							{programName}
						</div>
						<div className="font-bold text-gray-300 text-center">{name}</div>
						<form className="flex-col" onSubmit={handleAddMoneyClick}>
							<div className="mt-4">
								<label className="block text-sm font-medium text-slate-300">
									From
								</label>
								<input
									type="date"
									value={fromDate}
									onChange={(e) => setFromDate(e.target.value)}
									className="bg-black mt-1 p-2 rounded w-full text-slate-300"
									required
								/>
							</div>

							<div className="mt-4">
								<label className="block text-sm font-medium text-slate-300">
									To
								</label>
								<input
									type="date"
									value={toDate}
									onChange={(e) => setToDate(e.target.value)}
									className="bg-black mt-1 p-2 rounded w-full text-slate-300"
									required
								/>
							</div>

							<div className="mt-4">
								<label className="block text-sm font-medium text-slate-300">
									Amount
								</label>
								<input
									type="number"
									value={amount}
									onChange={(e) => {
										setAmount(e.target.value);
									}}
									className="bg-black mt-1 p-2 rounded w-full text-slate-300"
									min="0"
									required
								/>
							</div>
							{popOverError.length > 0 && (
								<div className="text-red-500 font-semibold mt-4">
									{popOverError.map((error) => {
										return <div className="mt-2">{error}</div>;
									})}
								</div>
							)}
							<button
								type="submit"
								className="px-4 py-2 bg-gray-900 text-white rounded flex justify-center mt-8 w-full"
							>
								<GiReceiveMoney className="text-2xl text-green-400" />
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
