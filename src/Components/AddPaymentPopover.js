import React, { useState } from "react";
import dayjs from "dayjs";
import { GiReceiveMoney } from "react-icons/gi";
import { slotName } from "../Helpers/slotNames";

export default function AddPaymentPopover({
	phoneNumber,
	programName,
	name,
	onClose,
	onAddPayment,
}) {
	const today = dayjs().format("YYYY-MM-DD");
	const [fromDate, setFromDate] = useState(today);
	const [toDate, setToDate] = useState(today);
	const [amount, setAmount] = useState(0);
	const [popOverError, setPopOverError] = useState([]);

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
			onAddPayment(
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

	return (
		<div className="fixed z-20 bg-black/70 w-screen h-screen top-0 left-0">
			<div className="absolute z-40 bg-slate-800 text-white p-4 shadow-lg rounded-lg w-80 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 mt-2">
				<button className="absolute right-2 top-1" onClick={onClose}>
					x
				</button>
				<div className="font-semibold text-gray-500 text-center">
					{slotName[programName]}
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
							onChange={(e) => setAmount(e.target.value)}
							className="bg-black mt-1 p-2 rounded w-full text-slate-300"
							min="0"
							required
						/>
					</div>
					{popOverError.length > 0 && (
						<div className="text-red-500 font-semibold mt-4">
							{popOverError.map((error, index) => (
								<div key={index} className="mt-2">
									{error}
								</div>
							))}
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
	);
}
