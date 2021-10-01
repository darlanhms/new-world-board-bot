import { Message } from 'discord.js';
import { DEFAULT_BOARD_TIMEOUT } from '../shared/consts/boardTiming';
import Handler from '../shared/logic/Handler';

export default class HelpHandler implements Handler {
    command = 'help';

    public async handle(message: Message): Promise<Message> {
        let m = '**Utlização**: !boards <command> <arguments (opcional)>\n\n';

        m += '**Comandos**\n';

        m += '`start <time (opcional)>` - ';
        m += `inicializa os alertas do quadro para o canal, <time> (deve ser no formato MM:SS ou MM) é o tempo atual em que está o quadro ativo, se um tempo atual não for informado, é considerado o valor padrão (${DEFAULT_BOARD_TIMEOUT} minutos).\n`;

        m += '`stop` - desativa os alertas do quadro para o canal.\n';

        m += '`time` - mostra o tempo que falta para a próxima atualização do quadro';
        return message.channel.send(m);
    }
}
