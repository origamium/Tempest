export const removeArrayItem = <T>(source: T[], index: number): T[] => {
    return [...source.slice(0, index), ...source.slice(index + 1, source.length)];
};

export const removeArrayItemByLength = <T>(source: T[], from: number, length: number): T[] => {
    return [...source.slice(0, from), ...source.slice(from + length, source.length)];
};
