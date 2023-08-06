import * as dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import { EDateFormat, EDuration, ETimeFormat } from "@shared/enum/dayjs-format";
import { getObjectKeys } from "@shared/helpers/obj.helper";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Checks if the input values are valid.
 * @param value - The value to check.
 * @param dateFormat - The date format to check.
 * @param timeFormat - The time format to check.
 * @returns True if the input is valid, false otherwise.
 */
function isValidInput(
        value: string | number | undefined,
        dateFormat: EDateFormat | null,
        timeFormat: ETimeFormat | null
) {
    return (
            !value &&
            dateFormat &&
            Object.values(EDateFormat).includes(dateFormat) &&
            timeFormat &&
            Object.values(ETimeFormat).includes(timeFormat)
    );
}

/**
 * Formats the date and time.
 * @param milliseconds - The milliseconds to format.
 * @param dateStr - The date string to format.
 * @param dateFormat - The date format to use.
 * @param timeFormat - The time format to use.
 * @returns The formatted date and time.
 */
export function formatDateTime(
        milliseconds?: number,
        dateStr?: string,
        dateFormat: EDateFormat = EDateFormat.DEFAULT,
        timeFormat: ETimeFormat = ETimeFormat.DEFAULT
) {
    const value = milliseconds || dateStr;
    if (isValidInput(value, dateFormat, timeFormat)) {
        return "";
    }
    return dayjs(value).format(dateFormat + " " + timeFormat);
}

/**
 * Formats the date.
 * @param milliseconds - The milliseconds to format.
 * @param dateStr - The date string to format.
 * @param dateFormat - The date format to use.
 * @returns The formatted date.
 */
export function formatDate(
        milliseconds?: number,
        dateStr?: string,
        dateFormat: EDateFormat = EDateFormat.DEFAULT
) {
    const value = milliseconds || dateStr;
    if (isValidInput(value, dateFormat, null)) {
        return "";
    }
    return dayjs(value).format(dateFormat);
}

/**
 * Formats the time.
 * @param milliseconds - The milliseconds to format.
 * @param dateStr - The date string to format.
 * @param timeFormat - The time format to use.
 * @returns The formatted time.
 */
export function formatTime(
        milliseconds?: number,
        dateStr?: string,
        timeFormat: ETimeFormat = ETimeFormat.DEFAULT
) {
    const value = milliseconds || dateStr;
    if (isValidInput(value, null, timeFormat)) {
        return "";
    }
    return dayjs(value).format(timeFormat);
}

/**
 * Gets the time range.
 * @param duration - The duration to use.
 * @param numberOfYearsAgo - The number of years ago.
 * @returns The time range.
 * @throws Error if numberOfYearsAgo is negative.
 */
export function getTimeRange(duration: EDuration, numberOfYearsAgo: number = 0): {
    startDate: Date;
    endDate: Date;
} {
    const today = dayjs();
    let firstDayOfTargetMonth: Date, lastDayOfTargetMonth: Date;
    if (numberOfYearsAgo < 0) {
        throw new Error("Number of years ago should be a positive number. If it's equal to 0, then return the range for this month.");
    } else if (numberOfYearsAgo===0) {
        firstDayOfTargetMonth = today.startOf(duration).toDate();
        lastDayOfTargetMonth = today.endOf(duration).toDate();
    } else {
        if (numberOfYearsAgo===1) {
            firstDayOfTargetMonth = today.subtract(numberOfYearsAgo, duration).startOf(duration).toDate();
            lastDayOfTargetMonth = today.subtract(numberOfYearsAgo, duration).endOf(duration).toDate();
        } else {
            firstDayOfTargetMonth = today.subtract(numberOfYearsAgo - 1, duration).startOf(duration).toDate();
            lastDayOfTargetMonth = today.endOf(duration).toDate();
        }
    }
    return {
        startDate: firstDayOfTargetMonth,
        endDate: lastDayOfTargetMonth
    };
}

/**
 * Gets the time range for today.
 * @returns The time range for today.
 */
export function getTodayTimeRange(): { startTime: Date; endTime: Date } {
    const today = dayjs();
    const startTime = today.startOf("day").toDate();
    const endTime = today.endOf("day").toDate();
    return {
        startTime,
        endTime
    };
}

/**
 * Returns an array of dates that are `dayAgo` days before the given `day`.
 * @param day - The day to calculate days ago from.
 * @param dayAgo - The number of days ago.
 * @returns An array of dates.
 */
export function getDaysAgo(day: string, dayAgo: number): Date[] {
    const currentDate = dayjs(day);
    return Array.from({ length: dayAgo }, (_, index) =>
            currentDate.subtract(dayAgo - index, "day").toDate()
    );
}

/**
 * Returns an array of dates that are `dayAfter` days after the given `day`.
 * @param day - The day to calculate days after from.
 * @param dayAfter - The number of days after.
 * @returns An array of dates.
 */
export function getDaysAfter(day: any, dayAfter: number): Date[] {
    const currentDate = dayjs(day);
    return Array.from({ length: dayAfter }, (_, index) =>
            currentDate.add(index + 1, "day").toDate()
    );
}

/**
 * Sorts an object by its keys, assuming the keys are in date format.
 * @param obj - The object to be sorted.
 * @returns The sorted object.
 */
export function sortObjectByKeyIsDate(obj: any): any {
    // Sort the keys of the object
    const sortedKeys = Object.keys(obj).sort((a, b) => {
        // Convert the keys to Date objects
        const dateA = new Date(a);
        const dateB = new Date(b);
        // Compare the Date objects
        return dateA.getTime() - dateB.getTime();
    });
    // Create a new object with the sorted keys
    const sortedObj: any = {};
    sortedKeys.forEach(key => {
        sortedObj[key] = obj[key];
    });
    return sortedObj;
}
