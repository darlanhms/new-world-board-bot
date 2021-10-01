import { Message } from 'discord.js';
import BOT_PREFIX from '../consts/botPrefix';

export default abstract class BaseHandler {
    public abstract command: string;

    public getCommandPayload(message: Message, parentCommand?: string): string {
        return message.content
            .replace(`${BOT_PREFIX} ${parentCommand ? `${parentCommand} ` : ''}${this.command}`, '')
            .trim();
    }
}
