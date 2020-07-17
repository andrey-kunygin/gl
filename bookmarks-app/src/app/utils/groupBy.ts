export const groupBy = <T extends object, K extends keyof T>(arr: T[], prop: K): {[key: string]: T[]} => {
    return arr.reduce((acc, cur) => {
        (acc[`${cur[prop]}`] = acc[`${cur[prop]}`] || []).push(cur);
        return acc;
    }, {});
};
