import client from 'client';
import cron from 'node-cron';
import { DEFAULT_BORDER_TIMEOUT, DELAY_BETWEEN_CHECKING } from 'shared/consts/boardTiming';
import { DEFAULT_RESETED_BOARD_MESSAGE } from 'shared/consts/messages';
import inMemoryBoardTimming from 'shared/core/inMemoryBoardTimming';

cron.schedule(
    // '0,15,30,45 * * * * *',
    '* * * * * *',
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

                        channel.currentTime -= DELAY_BETWEEN_CHECKING;

                        if (channel.active && discChannel?.isText()) {
                            if (channel.currentTime <= 0) {
                                discChannel.send({ content: DEFAULT_RESETED_BOARD_MESSAGE, tts: true });
                                channel.currentTime = DEFAULT_BORDER_TIMEOUT * 60;

                                console.log(`Boards reseted in ${discGuild.name}#${discChannel.name} `);
                            }
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
