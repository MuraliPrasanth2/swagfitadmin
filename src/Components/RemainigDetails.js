import UserDetail from "./UserDetail";

export default function RemainingDetails({ user, remainingDetailsArray }) {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-300">Remaining Details</h2>
            <div className="p-4 text-gray-400 space-y-8 text-sm">
                {remainingDetailsArray.map((info) => (
                    <UserDetail
                        key={info.dbName}
                        label={info.questionText}
                        value={user[info.dbName]}
                    />
                ))}
            </div>
        </div>
    );
}
