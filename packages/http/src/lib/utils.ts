export type TypeError<Message extends string> = string & { __error__: Message };
