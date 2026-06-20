export declare function to<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]>;
