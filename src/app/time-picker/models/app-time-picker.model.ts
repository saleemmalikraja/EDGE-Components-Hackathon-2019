export interface Config {
    hourLable: string;
    minuteLable: string;
    format: string;
    minHour: string;
    maxHour: string;
    minMinute: string;
    maxMinute: string;
}
export interface Time {
    hour: number;
    minute: number;
    meridiem: string;
}
