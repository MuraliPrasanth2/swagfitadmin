export default function UserDetail({ label, value }) {
	if (value === "" || (Array.isArray(value) && value.length === 0)) {
		return null;
	}

	return (
		<div className="mb-1">
			<span className="font-semibold block">{label}</span>
			<span className="ml-4 block mt-1">
				{Array.isArray(value) ? value.join(", ") : value}
			</span>
		</div>
	);
}
