import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

// Function to check if today is between 'from' and 'to' dates
const isCurrent = (from, to) =>
	dayjs().isBetween(dayjs(from), dayjs(to), "day", "[]");

// Function to determine if the record is paid
const isPaid = (paymentInfo) => {
	if (!paymentInfo || paymentInfo.length === 0) return false;
	return paymentInfo.some((payment) => isCurrent(payment.from, payment.to));
};

// Function to check if the phoneNumber is partially present in the id
const isPhoneNumberMatch = (id, phoneNumber) => {
	return id.includes(phoneNumber);
};

// Function to check if the name is partially present in the record's name
const isNameMatch = (recordName, name) => {
	return recordName.toLowerCase().includes(name.toLowerCase());
};

// Function to filter records based on name, phoneNumber, and paymentStatus
const filterDocuments = (records, name, phoneNumber, paymentStatus) => {
	return records.filter((record) => {
		const matchesName = name === "" || isNameMatch(record.name, name);
		const matchesPhoneNumber =
			phoneNumber === "" || isPhoneNumberMatch(record.id, phoneNumber);
		const matchesPaymentStatus =
			(paymentStatus === "paid" && isPaid(record.paymentInfo)) ||
			(paymentStatus === "notpaid" && !isPaid(record.paymentInfo)) ||
			paymentStatus === "all";
		return matchesName && matchesPhoneNumber && matchesPaymentStatus;
	});
};

export default filterDocuments;
