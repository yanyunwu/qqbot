/// <reference types="node" />

import * as oicq from 'oicq';
import { Config } from 'oicq'
import { PrivateMessageEvent, GroupMessageEvent, DiscussMessageEvent } from 'oicq'
import { EventEmitter } from 'events';
import { Command } from 'commander';

export type Context = {
    event: PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent
};
export type Middleware = (ctx: Context, next: Function) => void;
class MessageRouter extends Command {

}
class Application extends EventEmitter {
    static MessageRouter = MessageRouter;
    use(fn: Middleware): void
    listen(num: number, config: Config): void;
}

// declare const KoaOicq: Application;
export = Application;