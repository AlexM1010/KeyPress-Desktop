// Simple helper functions to replace the removed dayjs-dependent helpers

export const useTitle = (title: string, suffix: string): string => {
	return `${title} | ${suffix}`;
};

export const countMonths = (from: Date, to: Date = new Date()): number => {
	const fromYear = from.getFullYear();
	const fromMonth = from.getMonth();
	const toYear = to.getFullYear();
	const toMonth = to.getMonth();
	
	return (toYear - fromYear) * 12 + (toMonth - fromMonth);
};

export const getMonthName = (monthIndex: number): string => {
	const months = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	return months[monthIndex] || 'Unknown';
};

export const computeExactDuration = (from: Date, to: Date = new Date()): string => {
	const months = countMonths(from, to);
	
	if (months === 0) {
		return 'Less than a month';
	} else if (months === 1) {
		return '1 month';
	} else if (months < 12) {
		return `${months} months`;
	} else {
		const years = Math.floor(months / 12);
		const remainingMonths = months % 12;
		
		if (remainingMonths === 0) {
			return years === 1 ? '1 year' : `${years} years`;
		} else {
			const yearText = years === 1 ? '1 year' : `${years} years`;
			const monthText = remainingMonths === 1 ? '1 month' : `${remainingMonths} months`;
			return `${yearText}, ${monthText}`;
		}
	}
};