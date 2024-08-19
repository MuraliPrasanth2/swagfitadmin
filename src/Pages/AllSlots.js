import { useEffect, useState } from "react";
import Filter from "../Components/Filter";
import { db } from "../firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import Slots from "../Components/Slots";
import filterDocuments from "../Helpers/filterDocuments";
import generateRandomPaymentInfo from "../Helpers/randomPaymentInfoGenerator";

function AllSlots() {
	// filter states
	const [phoneNumber, setPhoneNumber] = useState("");
	const [program, setProgram] = useState("groupFitness");
	const [paymentStatus, setPaymentStatus] = useState("all");

	// firestore collection
	const [value, loading, error] = useCollection(collection(db, program), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});
	const [documents, setDocuments] = useState([]);

	// setting documents from values in firestore and adding dummypayment details
	useEffect(() => {
		if (value) {
			setDocuments(
				value.docs.map((doc) => {
					const data = doc.data();
					const paymentInfo = data.paymentInfo
						? data.paymentInfo
						: generateRandomPaymentInfo();
					return { id: doc.id, ...doc.data(), paymentInfo };
				}),
			);
		}
	}, [value]);

	console.log("filters values", phoneNumber, program, paymentStatus);
	const filteredDocuments = filterDocuments(
		documents,
		phoneNumber,
		paymentStatus,
	);
	console.log("documents", documents);
	console.log("filteredDocuments", filteredDocuments);

	return (
		<div className="font-Montserrat min-h-screen bg-black max-w-6xl mx-auto text-white px-8 pb-4">
			<Filter
				{...{
					phoneNumber,
					setPhoneNumber,
					program,
					setProgram,
					paymentStatus,
					setPaymentStatus,
				}}
			/>
			<Slots
				documents={filteredDocuments}
				loading={loading}
				error={error}
				highlightPhoneNumber={phoneNumber}
			/>
		</div>
	);
}

export default AllSlots;
