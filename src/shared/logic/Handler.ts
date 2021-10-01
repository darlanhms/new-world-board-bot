import { Message } from 'discord.js';

interface HandlerFunction {
    (message: Message, args: string[]): void;
}

export default interface Handler {
    command: string;
    handle: HandlerFunction;
}
