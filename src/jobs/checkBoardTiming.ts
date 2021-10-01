import client from 'client';
import cron from 'node-cron';
import { DEFAULT_BORDER_TIMEOUT, DELAY_BETWEEN_CHECKING } from 'shared/consts/boardTiming';
import { DEFAULT_RESETED_BOARD_MESSAGE } from 'shared/consts/messages';
import inMemoryBoardTimming from 'shared/core/inMemoryBoardTimming';
import getMinutesAndSeconds from 'shared/utils/time';

cron.schedule(
    '0,15,30,45 * * * * *',
    async () => {
        if (!inMemoryBoardTimming.length) {
            return;
        }

        for (const guild of inMemoryBoardTimming) {
            const discGuild = client.guilds.cache.get(guild.id);

            if (discGuild) {
                if (guild.channels.length) {
                    for (const channel of guild.channels) {
                        const discChannel = discGuild.channels.cache.get(channel.id);

                        if (channel.active && discChannel?.isText()) {
                            channel.currentTime -= DELAY_BETWEEN_CHECKING;

                            if (channel.currentTime <= 0) {
                                discChannel.send({ content: DEFAULT_RESETED_BOARD_MESSAGE, tts: true });
                                channel.currentTime = DEFAULT_BORDER_TIMEOUT * 60;
                            }

                            console.log(
                                `Current time for ${discGuild.name}#${
                                    discChannel.name
                                } is ${getMinutesAndSeconds(channel.currentTime)}`,
                            );
                        }
                    }
                }
            }
        }
    },
    {
        scheduled: true,
        timezone: 'America/Sao_Paulo',
    },
);
