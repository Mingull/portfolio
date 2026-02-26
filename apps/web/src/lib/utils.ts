import { useFormatter } from "next-intl";

export function useFormatDate() {
	const format = useFormatter();
	return (date: string | Date) =>
		format.dateTime(new Date(date), {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
}
