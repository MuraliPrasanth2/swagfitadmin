import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase/config";
import PaymentInfo from "../Components/PaymentInfo"; // Assuming PaymentInfo is imported
import dayjs from "dayjs";
import generateRandomPaymentInfo from "../Helpers/randomPaymentInfoGenerator";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { FaHome } from "react-icons/fa";

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

    const slotName = {
        groupFitness: "Group Fitness",
        personalDanceTraining: "Dance PT",
        personalFitness: "Personal Training",
        psysioFitness: "Physio PT",
    };

    useEffect(() => {
        if (value && value.exists()) {
            const document = {
                ...value.data(),
                id: value.id,
                phoneNumber: value.id,
                programName: slotName[program],
            };
            setDocument(document);
        }
    }, [value]);

    console.log(program);
    console.log(id);
    console.log(value, loading, error);
    if (value) {
        if (value.exists()) {
            console.log(value.data());
        }
    }

    return (
        <div>
            <p>
                {error && <strong>Error loading data for this slot.</strong>}
                {loading && <span>Loading...</span>}
                {document && UserProfile({ user: document })}
            </p>
        </div>
    );
};

export default SlotDetails;

function UserProfile({ user }) {
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
                            paymentInfo={user.paymentInfo || generateRandomPaymentInfo()}
                        />
                    </div>
                    <button className="mt-4 bg-cyan-950 hover:bg-cyan-800 text-white font-semibold py-2 px-4 rounded transition duration-300 w-full md:w-auto">
                        Add Payment
                    </button>
                </div>

                {/* Remaining Details Section */}
                <div className="mt-4">
                    <h2 className="text-xl font-bold text-gray-300">Remaining Details</h2>
                    <div className="p-4 text-gray-400 space-y-2 text-sm">
                        <div className="">
                            <span className="font-semibold block">Occupation</span>
                            <span className="pl-4 block">{user.occupation}</span>
                        </div>
                        <div className="">
                            <span className="font-semibold block">Address</span>
                            <span className="ml-4 block">{user.address}</span>
                        </div>
                        <div className="">
                            <span className="font-semibold block">Timing</span>
                            <span className="ml-4 block">{user.timing}</span>
                        </div>
                        <div className="mb-1">
                            <span className="font-semibold block">Fitness Program Names</span>
                            <span className="ml-4 block">{user.fitnessProgramNames}</span>
                        </div>
                        <div className="mb-1">
                            <span className="font-semibold block">Fitness Goals</span>
                            <span className="ml-4 block">{user.fitnessGoals.join(", ")}</span>
                        </div>
                        <div className="mb-1">
                            <span className="font-semibold block">
                                Prior Fitness Experience
                            </span>
                            <span className="ml-4 block">{user.priorFitnessExperience}</span>
                        </div>
                        <div className="mb-1">
                            <span className="font-semibold block">Medical Conditions</span>
                            <span className="ml-4 block">{user.medicalConditions}</span>
                        </div>
                        <div className="mb-1">
                            <span className="font-semibold block">Basic Equipment</span>
                            <span className="ml-4 block">{user.basicEquipment}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
