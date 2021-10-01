import client from '../client';

client.on('ready', () => {
    // eslint-disable-next-line no-unused-expressions
    client.user?.setActivity({
        name: '!boards help',
        type: 'WATCHING',
    });
});
