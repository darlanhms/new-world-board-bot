import { Message } from 'discord.js';
import { DEFAULT_BOARD_TIMEOUT } from '../shared/consts/boardTiming';
import inMemoryBoardTimming, { IChannel, IGuild } from '../shared/core/inMemoryBoardTimming';
import BaseHandler from '../shared/logic/BaseHandler';
import { Either, left, right } from '../shared/logic/Either';
import Handler from '../shared/logic/Handler';

export default class ActiveHandler extends BaseHandler implements Handler {
    command = 'start';

    constructor() {
        super();
    }

    private wrongTimeFormatMessage = 'Formato de tempo incorreto, você deve informar em MM:SS ou MM';

    public handle(message: Message): Promise<Message> {
        const currentTime = this.getCommandPayload(message);
        let timeInSeconds: number;

        if (currentTime) {
            const timeInSecondsOrError = this.getTimeInSeconds(currentTime);

            if (timeInSecondsOrError.isLeft()) {
                return message.reply(timeInSecondsOrError.value);
            }

            timeInSeconds = timeInSecondsOrError.value;
        } else {
            timeInSeconds = DEFAULT_BOARD_TIMEOUT * 60;
        }

        const guild = this.pushGuildIfNotExists(message.guildId as string);
        const channel = this.pushChannelInGuildIfNotExists(guild, message.channelId as string);

        channel.currentTime = timeInSeconds;
        channel.active = true;

        return message.channel.send(
            `Alerta de quadros ativo nesse canal, tempo definido para ${
                currentTime || `${DEFAULT_BOARD_TIMEOUT}:00`
            }`,
        );
    }

    private isValidTwoDigitNumber(number: string): boolean {
        return Boolean(number.match(/^\d{1,2}$/) && number.length === 2);
    }

    private getTimeInSeconds(time: string): Either<string, number> {
        if (time.match(/:/g)) {
            const [minutes, seconds] = time.split(':');

            if (!this.isValidTwoDigitNumber(minutes) || !this.isValidTwoDigitNumber(seconds)) {
                return left(this.wrongTimeFormatMessage);
            }

            return right(Number(minutes) * 60 + Number(seconds));
        }

        if (!this.isValidTwoDigitNumber(time)) {
            return left(this.wrongTimeFormatMessage);
        }

        return right(Number(time) * 60);
    }

    private pushGuildIfNotExists(guildId: string): IGuild {
        const alreadyPushedGuild = inMemoryBoardTimming.find(guildInMemory => guildInMemory.id === guildId);

        if (!alreadyPushedGuild) {
            const guild = {
                id: guildId,
                channels: [],
            };

            inMemoryBoardTimming.push(guild);
            return guild;
        }

        return alreadyPushedGuild;
    }

    private pushChannelInGuildIfNotExists(guild: IGuild, channelId: string): IChannel {
        const alreadyPushedChannel = guild.channels.find(channelInMemory => channelInMemory.id === channelId);

        if (!alreadyPushedChannel) {
            const channel = {
                id: channelId,
                active: true,
                currentTime: DEFAULT_BOARD_TIMEOUT,
            };

            guild.channels.push(channel);

            return channel;
        }

        return alreadyPushedChannel;
    }
}
