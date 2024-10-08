import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { doc, setDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase/config";
import PaymentInfo from "../Components/PaymentInfo";
import { FaWhatsapp, FaHome } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import RemainingDetails from "../Components/RemainigDetails";
import { remainingDetailsArray } from "../Data/remainingDetailsArrays";
import { GiReceiveMoney } from "react-icons/gi";
import { slotName } from "../Helpers/slotNames";
import AddPaymentPopover from "../Components/AddPaymentPopover"; // Import AddPaymentPopover

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const SlotDetails = () => {
	const query = useQuery();
	const program = query.get("program");
	const id = "+" + query.get("id").trim();
	const [document, setDocument] = useState(null);

	const [value, loading, error] = useDocument(doc(db, program, id), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const [isPopOpen, setIsPopOpen] = useState(false); // State for popover

	useEffect(() => {
		if (value && value.exists()) {
			const document = {
				...value.data(),
				id: value.id,
				phoneNumber: value.id,
				program: program,
				programName: slotName[program],
				programNameInDb: program,
				valuesInDb: value.data(),
			};
			setDocument(document);
		}
	}, [value, program]);

	const handleAddMoney = () => {
		setIsPopOpen(true); // Open the popover
	};

	const handlePopOverCloseButtonClick = () => {
		setIsPopOpen(false); // Close the popover
	};

	const AddMoney = (phoneNumber, from, to, amount, addedAt) => {
		let paymentInfo = document.paymentInfo || [];
		paymentInfo.push({ from, to, amount, addedAt });
		const updatedValues = { ...document.valuesInDb, paymentInfo };
		try {
			setDoc(doc(db, program, phoneNumber), updatedValues)
				.then(() => {
					setIsPopOpen(false); // Close the popover after adding payment
				})
				.catch((err) => {
					// console.log(err);
				});
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<div>
			<p>
				{error && <strong>Error loading data for this slot.</strong>}
				{loading && <span>Loading...</span>}
				{document && UserProfile({ user: document, handleAddMoney })}
			</p>

			{isPopOpen && (
				<AddPaymentPopover
					phoneNumber={document.phoneNumber}
					programName={document.programName}
					name={document.name}
					valuesInDb={document.valuesInDb}
					onClose={handlePopOverCloseButtonClick}
					onAddPayment={AddMoney}
				/>
			)}
		</div>
	);
};

export default SlotDetails;

function UserProfile({ user, handleAddMoney }) {
	return (
		<>
			<Link to="/">
				<FaHome className="text-3xl text-gray-700 fixed right-4 bottom-2" />
			</Link>
			<h1 className="text-center text-4xl font-bold text-gray-500 pt-4">
				Slot Details
			</h1>
			<div className="text-center text-gray-600 font-semibold">
				({user.programName})
			</div>
			<div className="bg-black rounded-lg shadow-xl max-w-8xl mx-auto mt-6 flex flex-wrap justify-stretch md:justify-evenly">
				{/* Personal Info Section */}
				<div className="mb-5 w-full md:w-auto">
					<h2 className="text-xl font-bold text-gray-300">Personal Info</h2>
					<div className="space-y-2 text-sm text-gray-400 p-4 font-semibold">
						<div>{user.name}</div>
						<div>{user.gender}</div>
						<div>{dayjs(user.dob).format("YYYY-MM-DD")}</div>
						<div>
							{user.phoneNumber}

							<a
								href={`https://wa.me/${user.phoneNumber.slice(1)}`}
								target="_blank"
								rel="noreferrer"
							>
								<FaWhatsapp className="ml-4 text-2xl text-violet-950 inline-block" />
							</a>
							<a
								href={`tel:${user.phoneNumber.slice(1)}`}
								target="_blank"
								rel="noreferrer"
							>
								<IoMdCall className="ml-2 text-2xl text-violet-950 inline-block" />
							</a>
						</div>
						<div>{user.email}</div>
					</div>
				</div>

				{/* Payment Info Section */}
				<div className="mb-8 w-full md:w-auto">
					<h2 className="text-xl font-bold text-gray-300">Payment Info</h2>
					<div className="p-4">
						<PaymentInfo
							paymentInfo={user.paymentInfo || []}
							valuesInDb={user.valuesInDb}
							documentId={user.id}
							collectionName={user.program}
							phoneNumber={user.phoneNumber}
							programName={user.program}
							name={user.name}
						/>
					</div>

					<button
						className="block w-full text-center px-6 py-2 bg-gray-900 text-white rounded-sm mt-4 flex justify-center"
						onClick={handleAddMoney} // Open popover on click
					>
						<GiReceiveMoney className="text-2xl text-green-400" />
					</button>
				</div>

				{/* Remaining Details Section */}
				<RemainingDetails
					user={user}
					remainingDetailsArray={remainingDetailsArray[user.programNameInDb]}
				/>
			</div>
		</>
	);
}
