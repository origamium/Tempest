export type UndefinedablePairOfObject<T> = {
    [key: string]: T | undefined;
};

export type PairOfObject<T> = {
    [key: string]: T;
};
