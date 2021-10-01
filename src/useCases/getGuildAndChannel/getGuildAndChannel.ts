import { DEFAULT_WAS_NOT_ACTIVATED_MESSAGE } from '../../shared/consts/messages';
import inMemoryBoardTimming, { IChannel, IGuild } from '../../shared/core/inMemoryBoardTimming';
import { Either, left, right } from '../../shared/logic/Either';
import UseCase from '../../shared/logic/UseCase';

interface Request {
    guildId: string;
    channelId: string;
}

type Response = Either<
    string,
    {
        guild: IGuild;
        channel: IChannel;
    }
>;

export default class GetGuildAndChannel implements UseCase<Request, Response> {
    public execute({ channelId, guildId }: Request): Response {
        const guild = inMemoryBoardTimming.find(guildInMemory => guildInMemory.id === guildId);

        if (!guild) {
            return left(DEFAULT_WAS_NOT_ACTIVATED_MESSAGE);
        }

        const channel = guild.channels.find(channelInMemory => channelInMemory.id === channelId);

        if (!channel) {
            return left(DEFAULT_WAS_NOT_ACTIVATED_MESSAGE);
        }

        return right({
            guild,
            channel,
        });
    }
}
