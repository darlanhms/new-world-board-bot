import { Message } from 'discord.js';
import Handler from '../shared/logic/Handler';
import getMinutesAndSeconds from '../shared/utils/time';
import GetGuildAndChannel from '../useCases/getGuildAndChannel/getGuildAndChannel';

export default class TimeHandler implements Handler {
    command = 'time';

    constructor(private getChannel: GetGuildAndChannel) {}

    public async handle(message: Message): Promise<Message> {
        const channelOrError = this.getChannel.execute({
            guildId: message.guildId as string,
            channelId: message.channelId,
        });

        if (channelOrError.isLeft()) {
            return message.reply(channelOrError.value);
        }

        const { channel } = channelOrError.value;

        if (!channel.active) {
            return message.reply('O bot não está ativo nesse canal :face_with_raised_eyebrow:');
        }

        return message.channel.send(
            `Tempo para o reset dos quadros: ${getMinutesAndSeconds(channel.currentTime)}`,
        );
    }
}
