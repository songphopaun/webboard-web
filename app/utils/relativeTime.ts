import { formatDistanceToNow, differenceInMonths } from 'date-fns';

export const formatRelativeTime = (date: string | Date): string => {
    const targetDate = new Date(date);

    const months = differenceInMonths(new Date(), targetDate);

    if (months >= 1) {
        return `${months}mo. ago`;
    }

    return formatDistanceToNow(targetDate, { addSuffix: true });
};
