import React from "react";

export default function Filter({
	name,
	setName,
	phoneNumber,
	setPhoneNumber,
	program,
	setProgram,
	paymentStatus,
	setPaymentStatus,
}) {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-5 pt-5">
			<div className="w-full md:w-1/4">
				<label className="block text-sm font-medium mb-2">Name</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-black sm:text-sm"
					placeholder="Enter name"
				/>
			</div>
			<div className="w-full md:w-1/3">
				<label className="block text-sm font-medium mb-2">Phone Number</label>
				<input
					type="number"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
					className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-black sm:text-sm"
					placeholder="Enter phone number"
				/>
			</div>

			<div className="w-full md:w-1/3">
				<label className="block text-sm font-medium mb-2">Program</label>
				<select
					value={program}
					onChange={(e) => setProgram(e.target.value)}
					className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black"
				>
					<option value="groupFitness">Group Fitness</option>
					<option value="personalFitness">Personal Fitness</option>
					<option value="personalDanceTraining">Personal Dance Fitness</option>
					<option value="psysioFitness">Physio Fitness</option>
				</select>
			</div>

			<div className="w-full md:w-1/3">
				<label className="block text-sm font-medium mb-2">Payment Status</label>
				<select
					value={paymentStatus}
					onChange={(e) => setPaymentStatus(e.target.value)}
					className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black"
				>
					<option value="all">All</option>
					<option value="paid">Paid</option>
					<option value="notpaid">Not Paid</option>
				</select>
			</div>
		</div>
	);
}

// groupFitness
// personalDanceTraining
// personalFitness
// psysioFitness
