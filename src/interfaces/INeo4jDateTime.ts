export default interface INeo4jDateTime {
    year?: number
    month?: number
    day?: number
    hour?: number
    minute?: number
    second?: number
    millisecond?: number
    microsecond?: number
    nanosecond?: number
    timezone?: string
    formatted: string
};
