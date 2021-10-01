import { Message } from 'discord.js';
import Handler from '../shared/logic/Handler';
import { DEFAULT_WAS_NOT_ACTIVATED_MESSAGE } from '../shared/consts/messages';
import GetGuildAndChannel from '../useCases/getGuildAndChannel/getGuildAndChannel';

export default class StopHandler implements Handler {
    command = 'stop';

    constructor(private getGuildAndChannel: GetGuildAndChannel) {}

    public async handle(message: Message): Promise<Message> {
        const guildAndChannelOrError = await this.getGuildAndChannel.execute({
            guildId: message.guildId as string,
            channelId: message.channelId as string,
        });

        if (guildAndChannelOrError.isLeft()) {
            return message.reply(guildAndChannelOrError.value);
        }

        const { channel } = guildAndChannelOrError.value;

        if (!channel.active) {
            return message.reply(DEFAULT_WAS_NOT_ACTIVATED_MESSAGE);
        }

        channel.active = false;

        return message.channel.send('OK, alertas desativado nesse canal.');
    }
}
