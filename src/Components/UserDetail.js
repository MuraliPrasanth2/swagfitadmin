export default function UserDetail({ label, value }) {
    return (
        <div className="mb-1">
            <span className="font-semibold block">{label}</span>
            <span className="ml-4 block mt-1">
                {Array.isArray(value) ? value.join(", ") : value}
            </span>
        </div>
    );
}
