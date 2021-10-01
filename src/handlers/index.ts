import Handler from '../shared/logic/Handler';
import getGuildAndChannel from '../useCases/getGuildAndChannel';
import HelpHandler from './help';
import ActiveHandler from './start';
import StopHandler from './stop';
import TimeHandler from './time';

const handlers: Array<Handler> = [
    new HelpHandler(),
    new ActiveHandler(),
    new StopHandler(getGuildAndChannel),
    new TimeHandler(getGuildAndChannel),
];

export default handlers;
