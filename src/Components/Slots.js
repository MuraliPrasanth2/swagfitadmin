import Slot from "./Slot";

const Slots = ({
    documents,
    error,
    loading,
    highlightPhoneNumber,
    programName,
}) => {
    console.log("highlightPhoneNumber", highlightPhoneNumber);
    return (
        <>
            {error && <strong>Error loading data...</strong>}
            {loading && <span>Loading...</span>}

            {!loading && (
                <div>
                    {!documents.length && (
                        <div className="text-center text-gray-500">No records to show</div>
                    )}
                    {documents.length !== 0 && (
                        <div className="flex gap-4 flex-wrap justify-center items-stretch mt-7">
                            {documents.map((doc, index) => (
                                <Slot
                                    key={index}
                                    phoneNumber={doc.id}
                                    name={doc.name}
                                    email={doc.email}
                                    paymentInfo={doc.paymentInfo}
                                    highlightPhoneNumber={highlightPhoneNumber}
                                    programName={programName}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Slots;
