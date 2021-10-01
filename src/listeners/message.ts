import client from '../client';
import handlers from '../handlers';
import BOT_PREFIX from '../shared/consts/botPrefix';

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (!message.content.startsWith(BOT_PREFIX)) {
        return;
    }

    const commandBody = message.content.slice(BOT_PREFIX.length);
    const args = commandBody.split(' ');

    // remove empty string at array's first position
    args.shift();

    handlers.forEach(handler => {
        if (handler.command === args[0]) {
            handler.handle(message, args);
        }
    });
});
