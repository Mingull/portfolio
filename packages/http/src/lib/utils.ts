export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type AutoComplete<T extends string> = T | (string & {});

export type Branded<T, B> = T & { __brand: B };

export type TypeError<Message extends string> = string & { __error__: Message };
