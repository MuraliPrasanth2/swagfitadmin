import dayjs from "dayjs";

// Function to generate a random date in the past or future
const getRandomDate = (start, end) => {
    const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
    return dayjs(date).format("YYYY-MM-DD");
};

// Function to generate random payment info
const generateRandomPaymentInfo = (minLength = 1, maxLength = 5) => {
    const paymentInfo = [];
    const length =
        Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    for (let i = 0; i < length; i++) {
        const from = getRandomDate(new Date(2023, 0, 1), new Date(2025, 0, 1)); // Random date between Jan 1, 2023, and Jan 1, 2025
        const to = dayjs(from)
            .add(Math.floor(Math.random() * 30) + 1, "day")
            .format("YYYY-MM-DD"); // Random date 1 to 30 days after 'from'
        const amount = Math.floor(Math.random() * 301) + 200; // Random amount between 200 and 500

        paymentInfo.push({ from, to, amount });
    }

    return paymentInfo;
};

// Example usage
export default generateRandomPaymentInfo;
